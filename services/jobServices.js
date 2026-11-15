const JobData = require('../models/jobData');
const Customer = require('../models/customerModel');
const idCounterService = require('./idCounterService');

exports.createJob = async (body) => {
    try {
      const c_id = Number(body.c_id);
      if (!Number.isSafeInteger(c_id) || c_id < 0 || !body.jobData) {
        return { success: false, message: 'Valid c_id and jobData are required' };
      }
      const customer = await Customer.findOne({ c_id });
      if (!customer) {
        return { success: false, message: 'Customer does not exist' };
      }

      const jobData = { ...body.jobData, job_id: await idCounterService.getNextId('job', true) };
      const result = await JobData.findOneAndUpdate(
        { job_id: jobData.job_id },
        { $setOnInsert: jobData },
        { upsert: true, new: true, rawResult: true, setDefaultsOnInsert: true }
      );
      const job = result.value;
      if (!job) {
        throw new Error('Job upsert returned no document');
      }

      if (!result.lastErrorObject.updatedExisting) {
        await Customer.updateOne({ c_id }, {
          $addToSet: { job_ids: job.job_id },
          $set: { latest_job_id: job.job_id }
        });
      }

      return {
        success: true,
        message: result.lastErrorObject.updatedExisting
          ? 'Job already exists'
          : 'Job created successfully',
        data: job
      };
    }
    catch (err) {
      if (err.code === 11000) {
        return { success: false, message: 'Job ID already exists' };
      }
      return { success: false, message: err.message };
    }
  }

exports.getJob = async (jobId) => {
    try {
      const job_id = Number(jobId);
      if (!Number.isSafeInteger(job_id) || job_id < 0) {
        return { success: false, message: 'Invalid job ID' };
      }
      const data = await JobData.findOne({ job_id });
      if (data === null) {
        return { success: false, message: 'Job doesnot exist' };
      }
      else {
        return { success: true, message: 'Job Fetched Successfull',data:data};
      }
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

exports.updateJob = async (customerId, body) => {
    try {
      const c_id = Number(customerId);
      if (!Number.isSafeInteger(c_id) || c_id < 0) {
        return { success: false, message: 'Invalid customer ID' };
      }
      const customerExists = await Customer.exists({ c_id });
      if (!customerExists) {
        return { success: false, message: 'Customer does not exist' };
      }

      const jobData = { ...body.jobData, job_id: await idCounterService.getNextId('job', true) };
      const job = await JobData.create(jobData);
      await Customer.updateOne({ c_id }, {
        $addToSet: { job_ids: job.job_id },
        $set: { latest_job_id: job.job_id }
      });
      return { success: true, message: 'Job created and added to customer', data: job };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }
  
exports.deleteJob = async (customerId, jobId) => {
    try {
      const c_id = Number(customerId);
      const job_id = Number(jobId);
      if (!Number.isSafeInteger(c_id) || c_id < 0 || !Number.isSafeInteger(job_id) || job_id < 0) {
        return { success: false, message: 'Invalid customer or job ID' };
      }
      const resp = await Customer.updateOne({ c_id, job_ids: job_id }, {
        $pull: {
          job_ids: job_id
        },
        $addToSet: {
          deleted_job_ids: job_id
        }
      });
      if (resp.matchedCount === 0) {
        return { success: false, message: 'Job is not associated with this customer' };
      }

      return { success: true, message: 'Job Deleted Successfully' };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

exports.getAllJobs = async () => {
    try {
      const data = await JobData.find({}).sort({ job_id: 1 });
      return { success: true, message: 'All Jobs Fetched Successfully', data };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

exports.getAllJobDataByName = async (customerId) => {
    try {
      const c_id = Number(customerId);
      if (!Number.isSafeInteger(c_id) || c_id < 0) {
        return { success: false, message: 'Invalid customer ID' };
      }
      const customer = await Customer.findOne({ c_id });
      if (!customer) {
        return { success: false, message: 'Customer does not exist' };
      }
      const data = await JobData.find({ job_id: { $in: customer.job_ids || [] } }).sort({ job_id: 1 });
      return { success: true, message: 'All Jobs Fetched Successfully', customerData: [customer], data };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

exports.getAllJobDataByMobile = async (mobile) => {
    try {
      if (!mobile) {
        return { success: false, message: 'Mobile number is required' };
      }
      const customerData = await Customer.find({ phone: String(mobile) });
      if (customerData.length === 0) {
        return { success: false, message: 'No Records Found' };
      }
      const jobIds = customerData.flatMap(customer => customer.job_ids || []);
      const data = await JobData.find({ job_id: { $in: jobIds } }).sort({ job_id: 1 });
      return { success: true, message: 'All Jobs Fetched Successfully', customerData, data };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

exports.getJobsBetweenDates = async (body) => {
    try {
      const start = new Date(body.startDate);
      const end = new Date(body.endDate);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
        return { success: false, message: 'Valid startDate and endDate are required' };
      }
      const startDate = start.toISOString();
      const endDate = end.toISOString();
      const data = await JobData.find({
        returnDate: { $gt: startDate, $lt: endDate }
      }).sort({ job_id: 1 });

      if (data.length == 0) {
        return { success: false, message: 'No Records Found' };
      }
      const jobIds = data.map(job => job.job_id);
      const customerData = await Customer.find({ job_ids: { $in: jobIds } });
      return { success: true, message: 'All Jobs Fetched Successfully', data, customerData };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

exports.getJobID = async () => {
    try {
      const job_id = await idCounterService.getNextId('job');
      return {
        success: true,
        message: job_id
      }
    }
    catch (err) {
      return { success: false, message: err.message };
    }
  }

exports.getCurrentJobPrice = async (jobId) => {
    try {
      const job_id = Number(jobId);
      if (!Number.isSafeInteger(job_id) || job_id < 0) {
        return { success: false, message: 'Invalid job ID' };
      }
      const resp = await JobData.findOne({ job_id });
      if (!resp) {
        return { success: false, message: 'Job does not exist' };
      }
      var data = {
        totalPrice: resp.totalPrice,
        shirt_price: resp.shirt_data.price,
        pant_price: resp.pant_data.price
      }
      return {
        success: true,
        message: data
      }
    }
    catch (err) {
      return { success: false, message: err.message };
    }
}