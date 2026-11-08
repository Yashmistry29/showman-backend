const Customer = require('../models/customerModel');
const idCounterService = require('./idCounterService');

const parseCustomerId = (id) => {
  const customerId = Number(id);
  return Number.isSafeInteger(customerId) && customerId >= 0 ? customerId : null;
}

const duplicateCustomerResponse = (customer) => ({
  success: true,
  message: 'Customer already exists',
  data: customer.c_id
});

exports.createCustomer = async (body) => {
  try {
    if (!body || typeof body.name !== 'string' || !body.name.trim()
      || typeof body.address !== 'string' || !body.address.trim()) {
      return { success: false, message: 'name and address are required' };
    }

    const data = {
      name: body.name.trim().toUpperCase(),
      phone: body.phone == null ? '' : String(body.phone).trim(),
      phone2: body.phone2 == null ? "" : String(body.phone2).trim(),
      address: body.address.trim().toUpperCase(),
    }

    data.c_id = await idCounterService.getNextId('customer', true);

    try {
      const result = await Customer.findOneAndUpdate(
        { c_id: data.c_id },
        { $setOnInsert: data },
        { upsert: true, new: true, rawResult: true, setDefaultsOnInsert: true }
      );
      const customer = result.value;
      if (!customer) {
        throw new Error('Customer upsert returned no document');
      }

      return {
        success: true,
        message: result.lastErrorObject.updatedExisting
          ? 'Customer already exists'
          : 'Customer Created Successfully',
        data: customer.c_id
      };
    } catch (err) {
      if (err.code !== 11000) {
        throw err;
      }

      const duplicate = await Customer.findOne({ c_id: data.c_id }).select({ c_id: 1 });
      if (duplicate) {
        return duplicateCustomerResponse(duplicate);
      }

      throw err;
    }
  }
  catch(err){
    return { success: false, message: err.message };
  }
}

exports.editCustomer = async (id, body = {}) => {
    try {
      const c_id = parseCustomerId(id);
      if (c_id === null) {
        return { success: false, message: 'Invalid customer ID' };
      }

      const data = {};
      if (body.name !== undefined) data.name = body.name.toUpperCase();
      if (body.phone !== undefined) data.phone = body.phone;
      if (body.phone2 !== undefined) data.phone2 = body.phone2 == null ? "" : body.phone2;
      if (body.address !== undefined) data.address = body.address.toUpperCase();

      if (Object.keys(data).length === 0) {
        return { success: false, message: 'No customer fields provided for update' };
      }

      const resp = await Customer.updateOne({ c_id }, { $set: data });
      if (resp.matchedCount === 0) {
        return { success: false, message: 'Customer does not exist in database' };
      }
      return {
        success: true, message: 'Customer Data Updated'
      }
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

exports.deleteCustomer = async (id) => {
    try {
      const c_id = parseCustomerId(id);
      if (c_id === null) {
        return { success: false, message: 'Invalid customer ID' };
      }

      const resp = await Customer.deleteOne({ c_id });
      if (resp.deletedCount === 0) {
        return { success: false, message: 'Customer does not exist in database' };
      }

      return { success: true, message: 'Customer Deleted Successfully' };
    }
    catch(err){
      return { success: false, message: err.message };
    }
  }

exports.getCustomer = async (id) => {
    try {
      const c_id = parseCustomerId(id);
      if (c_id === null) {
        return { success: false, message: 'Invalid customer ID' };
      }

      const query = { c_id }
      var resp = await Customer.findOne(query);
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

exports.getAllCustomers = async () => {
    try {
      const data = await Customer.find({}).sort({ c_id: 1 });
      return { success: true, message: 'Customers Fetched Successfully', data };
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

exports.getCustomerByID = exports.getCustomer;

exports.getCustomerID = async () => {
    try {
      const customerId = await idCounterService.getNextId('customer');
      return {
        success: true,
        message: customerId
      };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
