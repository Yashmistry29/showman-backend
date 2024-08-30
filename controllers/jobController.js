const jobServices = require('../services/jobServices');
const JobServices = require('../services/jobServices');

const createJob = async (req, res, next) => {
  try {
    const resp = await JobServices.createJob(req.body);
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

const getJob = async (req, res, next) => {
  try {
    const resp = await JobServices.getJob(req.body);
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
    const resp = await JobServices.updateJob(req.body);
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

const deleteJob = async (req, res, next) => {
  try {
    const resp = await JobServices.deleteJob(req.body);
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
    const resp = await JobServices.getAllJobs(req.body);
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
    const resp = await JobServices.getAllJobDataByName(req.body);
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
    const resp = await JobServices.getAllJobDataByMobile(req.body);
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
    const resp = await JobServices.getJobsBetweenDates(req.body);
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
    const resp = await jobServices.getJobID();
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
    const resp = await jobServices.getCurrentJobPrice(req.body);
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