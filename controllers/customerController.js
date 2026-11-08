const customerServices = require('../services/customerServices');

const getRequestData = (req) => ({
  ...req.body,
  ...req.query,
  ...req.params
});

const createCustomer = async (req, res, next) => {
  try {
    const resp = await customerServices.createCustomer(getRequestData(req));
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
    const requestData = getRequestData(req);
    const resp = await customerServices.editCustomer(requestData.id, requestData);
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
    const requestData = getRequestData(req);
    const resp = await customerServices.deleteCustomer(requestData.id);
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
    const requestData = getRequestData(req);
    const resp = await customerServices.getCustomer(requestData.id);
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
    const resp = await customerServices.getAllCustomers(getRequestData(req));
    if (resp.success == true) {
      res.send({ success: true, message: resp.message, data: resp.data });
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
    const resp = await customerServices.getCustomerNameList(getRequestData(req));
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
    const requestData = getRequestData(req);
    const resp = await customerServices.getCustomerByID(requestData.id);
    if (resp.success == true) {
      res.send({ success: true, message: resp.message, data: resp.data });
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
    const resp = await customerServices.getCustomerID(getRequestData(req));
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