const Employee = require('../models/employee');
const idCounterService = require('./idCounterService');

exports.createEmployee = async (body) => {
  try {
    const data = { ...body };
    delete data.e_id;
    data.e_id = await idCounterService.getNextId('employee', true);

    const result = await Employee.findOneAndUpdate(
      { e_id: data.e_id },
      { $setOnInsert: data },
      { upsert: true, new: true, rawResult: true, setDefaultsOnInsert: true }
    );
    const employee = result.value;
    if (!employee) {
      throw new Error('Employee upsert returned no document');
    }

    return {
      success: true,
      message: result.lastErrorObject.updatedExisting
        ? "Employee already exists"
        : "Employee created successfully",
      data: employee.e_id
    };
  }
  catch (err) {
    if (err.code === 11000) {
      return { success: false, message: "Employee ID already exists" };
    }
    return { success: false, message: err.message };
  }
}

exports.updateEmployee = async (id, body) => {
  try {
    const e_id = Number(id);
    if (!Number.isSafeInteger(e_id) || e_id < 0) {
      return { success: false, message: "Invalid employee ID" };
    }

    const data = { ...body };
    delete data.e_id;
    const resp = await Employee.updateOne({ e_id }, { $set: data });

    if (resp.matchedCount > 0) {
      return { success: true, message: "Employee data updated successfully" };
    } else {
      return { success: false, message: "Employee not found" };
    }
  }
  catch (err) {
    return { success: false, message: err.message };
  }
}

exports.getEmployee = async (id) => {
  try {
    const e_id = Number(id);
    if (!Number.isSafeInteger(e_id) || e_id < 0) {
      return { success: false, message: "Invalid employee ID" };
    }
    const resp = await Employee.findOne({ e_id });

    if (resp) {
      return { success: true, message: "Employee data fetched successfully", data: resp };
    } else {
      return { success: false, message: "Employee not found" };
    }

  }
  catch (err) {
    return { success: false, message: err.message };
  }
}

exports.getEmployeeNameList = async () => {
  try {
    var resp = await Employee.find().sort({ name: 1 });
    const employeeList = resp.map(emp => ({
      id: emp.e_id,
      name: emp.name
    }));
    return { success: true, message: "Employee names fetched successfully", data: employeeList };
  }
  catch (err) {
    return { success: false, message: err.message };
  }
}

exports.getEmployeeId = async () => {
  try {
    const e_id = await idCounterService.getNextId('employee');
    return { success: true, message: "Employee ID fetched successfully", data: e_id };
  }
  catch (err) {
    return { success: false, message: err.message };
  }
}