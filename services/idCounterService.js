const Counter = require('../models/counterModel');
const Customer = require('../models/customerModel');
const JobData = require('../models/jobData');
const Employee = require('../models/employee');

const idSources = {
  customer: { model: Customer, field: 'c_id' },
  job: { model: JobData, field: 'job_id' },
  employee: { model: Employee, field: 'e_id' }
};

const getHighestExistingId = async (counterType) => {
  const { model, field } = idSources[counterType];
  const record = await model.findOne({ [field]: { $type: 'number' } })
    .sort({ [field]: -1 })
    .select({ [field]: 1 })
    .lean();

  return record ? record[field] : 0;
};

const synchronizeCounter = async (counterType) => {
  const highestId = await getHighestExistingId(counterType);
  try {
    await Counter.updateOne(
      { _id: counterType },
      { $max: { seq: highestId } },
      { upsert: true }
    );
  } catch (err) {
    if (err.code !== 11000) {
      throw err;
    }
  }
};

exports.getNextId = async (counterType, allocate = false) => {
  if (!Object.prototype.hasOwnProperty.call(idSources, counterType)) {
    throw new Error(`Unknown counter type: ${counterType}`);
  }

  await synchronizeCounter(counterType);

  if (allocate) {
    const counter = await Counter.findOneAndUpdate(
      { _id: counterType },
      { $inc: { seq: 1 } },
      { new: true }
    );
    if (!counter) {
      throw new Error(`Failed to allocate ${counterType} ID`);
    }
    return counter.seq;
  }

  const counter = await Counter.findById(counterType).select({ seq: 1 }).lean();
  if (!counter) {
    throw new Error(`Failed to read ${counterType} counter`);
  }
  return counter.seq + 1;
};
