const mongoose = require("mongoose");
const Customer = require('../models/customerModel');

exports.createCustomer = async (body) => {
    try {
      const data = {
        c_id: body.c_id,
        name: body.name.toUpperCase(),
        phone: body.phone,
        phone2: body.phone2 === null || body.phone2 === undefined ? "" : body.phone2,
        address: body.address.toUpperCase(),
      }

      var resp = await Customer.create(data);
      console.log(resp)
      return{success:true,message:'Customer Created Successfully',data:data.c_id}
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

exports.editCustomer = async (body) => {
    try {
      const data = {
        c_id: body.c_id,
        name: body.name.toUpperCase(),
        phone: body.phone,
        phone2: body.phone2 === null || body.phone2 === undefined ? "" : body.phone2,
        address: body.address.toUpperCase(),
      }

      var resp = await Customer.updateOne({ c_id: body.c_id }, {
        $set: data
      })
      console.log(resp)
      return {
        success: true, message: 'Customer Data Updated'
      }
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

exports.deleteCustomer = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

exports.getCustomer = async (body) => {
    try {
      var query = { c_id: body.c_id }
      var resp = await Customer.findOne(query);
      console.log(resp);
      if (resp != null) {
        return {
          success: true,
          message: "Data Fetched Successfully",
          data: resp
        };
      } else {
        return {
          success: false,
          message: "Customer Doesnot exist in Database"
        }
      }
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

exports.getAllCustomers = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

exports.getCustomerNameList = async () => {
    try {
      var resp = await Customer.find({}, { name: 1, c_id: 1, _id: 0, job_ids: { $reverseArray: "$job_ids" } }).sort({ name: 1 });

      // names.map((doc) => console.log(doc.name));
      return { success: true, message: "Data Fetched Successfully", data: resp }
    }
    catch (err) {
      return { success: false, message: err.message };
    }
  }

exports.getCustomerByID = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

exports.getCustomerID = async (body) => {
    try {
      var resp = await Customer.findOne({}, { c_id: 1, _id: 0 }).sort({ c_id: -1 });
      return {
        success: true,
        message: (resp.c_id || 0) + 1
      }
    }
    catch (err) {
      return { success: false, message: err.message };
    }
}
