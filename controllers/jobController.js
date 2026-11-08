const jobServices = require('../services/jobServices');

const getRequestData = (req) => ({
  ...req.body,
  ...req.query,
  ...req.params
});

const createJob = async (req, res, next) => {
  try {
    const resp = await jobServices.createJob(getRequestData(req));
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

const getJob = async (req, res, next) => {
  try {
    const resp = await jobServices.getJob(getRequestData(req).id);
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

const updateJob = async (req, res, next) => {
  try {
    const requestData = getRequestData(req);
    const resp = await jobServices.updateJob(requestData.c_id, requestData);
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

const deleteJob = async (req, res, next) => {
  try {
    const requestData = getRequestData(req);
    const resp = await jobServices.deleteJob(requestData.c_id, requestData.job_id);
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

const getAllJobs = async (req, res, next) => {
  try {
    const resp = await jobServices.getAllJobs(getRequestData(req));
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

const getAllJobDataByName = async (req, res, next) => {
  try {
    const resp = await jobServices.getAllJobDataByName(getRequestData(req).c_id);
    if (resp.success == true) {
      res.send({ success: true, message: resp.message, customerData: resp.customerData, data: resp.data });
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const getAllJobDataByMobile = async (req, res, next) => {
  try {
    const resp = await jobServices.getAllJobDataByMobile(getRequestData(req).mobile);
    if (resp.success == true) {
      res.send({ success: true, message: resp.message, customerData: resp.customerData, data: resp.data });
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const getJobsBetweenDates = async (req, res, next) => {
  try {
    const resp = await jobServices.getJobsBetweenDates(getRequestData(req));
    if (resp.success == true) {
      res.send({ success: true, message: resp.message, customerData: resp.customerData, data: resp.data });
    }
    else {
      res.send({ success: false, message: resp.message });
    }

  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const getJobID = async (req, res, next) => {
  try {
    const resp = await jobServices.getJobID(getRequestData(req));
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

const getCurrentJobPrice = async (req, res, next) => {
  try {
    const resp = await jobServices.getCurrentJobPrice(getRequestData(req).id);
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
  createJob,
  getJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getAllJobDataByName,
  getAllJobDataByMobile,
  getJobsBetweenDates,
  getJobID,
  getCurrentJobPrice
}