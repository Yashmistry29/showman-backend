const employeeService = require('../services/employeeService');

const createEmployee = async (req, res, next) => {
  try {
    const resp = await employeeService.createEmployee(req.body);
    if (resp.success) {
      res.send({ success: true, message: resp.message,data: resp.data });
    } else {
      res.send({ success: false, message: resp.message });
    }
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const updateEmployee = async (req, res, next) => {
  try {
    const resp = await employeeService.updateEmployee(req.body);
    if (resp.success) {
      res.send({ success: true, message: resp.message });
    } else {
      res.send({ success: false, message: resp.message });
    }
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const getEmployee = async (req, res, next) => {
  try {
    const resp = await employeeService.getEmployee(req.body);
    if (resp.success) {
      res.send({ success: true, message: resp.message, data: resp.data });
    } else {
      res.send({ success: false, message: resp.message });
    }
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const getEmployeeNameList = async (req, res, next) => {
  try {
    const resp = await employeeService.getEmployeeNameList();
    if (resp.success) {
      res.send({ success: true, message: resp.message, data: resp.data });
    } else {
      res.send({ success: false, message: resp.message });
    }
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

const getEmployeeId = async (req, res, next) => {
  try {
    const resp = await employeeService.getEmployeeId(req.body);
    if (resp.success) {
      res.send({ success: true, message: resp.message, data: resp.data });
    } else {
      res.send({ success: false, message: resp.message });
    }
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}

module.exports = {
  createEmployee,
  updateEmployee,
  getEmployee,
  getEmployeeNameList,
  getEmployeeId
};