const customerServices = require('../services/customerServices');

const createCustomer = async (req, res, next) => {
  try {
    const resp = await customerServices.createCustomer(req.body);
    if (resp.success == true) {
      res.send({ success: true, message: resp.message, data:resp.data });
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const editCustomer = async (req, res, next) => {
  try {
    const resp = await customerServices.editCustomer(req.body);
    if (resp.success == true) {
      res.send({ success: true, message: resp.message });
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const deleteCustomer = async (req, res, next) => {
  try {
    const resp = await customerServices.deleteCustomer(req.body);
    if (resp.success == true) {
      res.send({ success: true, message: resp.message });
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const getCustomer = async (req, res, next) => {
  try {
    const resp = await customerServices.getCustomer(req.body);
    if (resp.success == true) {
      res.send({ success: true, message: resp.message, data: resp.data});
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const getAllCustomers = async (req, res, next) => {
  try {
    const resp = await customerServices.getAllCustomers(req.body);
    if (resp.success == true) {
      res.send({ success: true, message: resp.message });
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const getCustomerNameList = async (req, res, next) => {
  try {
    const resp = await customerServices.getCustomerNameList();
    if (resp.success == true) {
      res.send({ success: true, message: resp.message,data:resp.data });
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const getCustomerByID = async (req, res, next) => {
  try {
    const resp = await customerServices.getCustomerByID(req.body);
    if (resp.success == true) {
      res.send({ success: true, message: resp.message });
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const getCustomerID = async (req, res, next) => {
  try {
    const resp = await customerServices.getCustomerID(req.body);
    if (resp.success == true) {
      res.send({ success: true, message: resp.message });
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

module.exports = {
  createCustomer,
  editCustomer,
  deleteCustomer,
  getCustomer,
  getAllCustomers,
  getCustomerNameList,
  getCustomerByID,
  getCustomerID,
}