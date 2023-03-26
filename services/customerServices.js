const mongoose = require("mongoose");
const Customer = require('../models/customerModel');

const db = mongoose.connection;

class customer{
  createCustomer = async (body) => {
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

  editCustomer = async (body) => {
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

  deleteCustomer = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

  getCustomer = async (body) => {
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

  getAllCustomers = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

  getCustomerNameList = async () => {
    try {
      var resp = await Customer.find().sort({ name: 1 });
      const names = []

      resp.forEach((doc) => {
        names.push({
          name: doc.name,
          id: doc.c_id,
          job_ids: doc.job_ids,
        });
      })
      // names.map((doc) => console.log(doc.name));
      return {success: true,message:"Data Fetched Successfully",data:names}
    }
    catch (err) {
      return { success: false, message: err.message };
    }
  }

  getCustomerByID = async (body) => {
    try {
      console.log(body);
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

  getCustomerID = async (body) => {
    try {
      var resp = await Customer.findOne().sort({ c_id: -1 }).limit(1);
      const c_id = resp.c_id + 1;
      return {
        success: true,
        message: c_id
      }
    }
    catch (err) {
      return { success: false, message: err.message };
    }
  }
}

module.exports= exports = new customer();