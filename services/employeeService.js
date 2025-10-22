const mongoose = require('mongoose');
const Employee = require('../models/employee');

exports.createEmployee = async (body) => {
  try {
    const data = { ...body };
    
    var resp = await Employee.findOne({ e_id: data.e_id });

    if (resp) {
      return { success: false, message: "Employee with this ID already exists" };
    } else {
      var create_employee = await Employee.create(data);
      console.log(create_employee);
      return { success: true, message: "Employee created successfully", data: create_employee.e_id };
    }
  }
  catch (err) {
    return { success: false, message: err.message };
  }
}

exports.updateEmployee = async (body) => {
  try {
    const data = { ...body };
    var resp = await Employee.updateOne({ e_id: data.e_id }, {
      $set:data
    })

    if (resp.modifiedCount > 0) {
      return { success: true, message: "Employee data updated successfully" };
    } else {
      return { success: false, message: "No changes made to employee data" };
    }
  }
  catch (err) {
    return { success: false, message: err.message };
  }
}

exports.getEmployee = async (body) => {
  try {
    console.log(body);
    var resp = await Employee.findOne({ e_id: body.e_id });

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

exports.getEmployeeId = async (body) => { 
  try {
    var resp = await Employee.findOne({}, { e_id: 1, _id: 0 }).sort({ e_id: -1 });
    console.log(resp);
    const e_id = resp ? resp.e_id + 1 : 1; // If no employee exists, start from 1
    return { success: true, message: "Employee ID fetched successfully", data: e_id };
  }
  catch (err) {
    return { success: false, message: err.message };
  }
}