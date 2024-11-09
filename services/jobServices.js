const { default: mongoose } = require('mongoose');
const JobData = require('../models/jobData');
const Customer = require('../models/customerModel');

const db = mongoose.connection;

class jobData{
  createJob = async (body) => {
    try {
      const c_id = body.c_id;
      var jobData = body.jobData;

      var resp = await JobData.create(jobData);
      console.log(resp.job_id);

      const update_Customer = await Customer.updateOne({ c_id: c_id }, {
        $set: {
          latest_job_id: resp.job_id,
          job_ids: [resp.job_id]
        }
      })
      console.log(update_Customer);
      return { success: true, message: 'Job created successfully' };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  getJob = async (body) => {
    try {
      console.log(body);
      var data = await JobData.findOne({ job_id: body.job_id });
      if (data === null) {
        return { success: false, message: 'Job doesnot exist' };
      }
      else {
        return { success: true, message: 'Job Fetched Successfull',data:data};
      }
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  updateJob = async (body) => {
    try {
      const c_id = body.c_id;
      var jobData = body.jobData;

      var resp = await JobData.create(jobData);
      console.log(resp.job_id);

      const customer = await Customer.findOne({ c_id: c_id });
      var j_ids = customer.job_ids;
      j_ids.push(resp.job_id);


      const update_Customer = await Customer.updateOne({ c_id: c_id }, {
        $set: {
          latest_job_id: resp.job_id,
          job_ids: j_ids
        }
      })
      console.log(update_Customer);
      return { success: true, message: 'Job Created and Update successfully' };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }
  
  deleteJob = async (body) => {
    try {
      const { job_id, c_id } = body;
      var resp = await Customer.findOne({ c_id: c_id });
      var j_ids = resp.job_ids;
      var deleted_ids = resp.deleted_job_ids;
      j_ids.splice(j_ids.indexOf(job_id), 1);
      deleted_ids.push(job_id);

      resp = await Customer.updateOne({ c_id: c_id }, {
        $set: {
          job_ids: j_ids,
          deleted_job_ids: deleted_ids
        }
      })
      console.log(resp)

      return { success: true, message: 'Job Deleted Successfully' };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  getAllJobs = async (body) => {
    try {
      console.log(body);
      const data="";
      return { success: true, message: 'All Jobs Fetched Successfully', data: data };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  getAllJobDataByName = async (body) => {
    try {
      console.log(body);
      if (body.name != '-') {
        let data = [];
        var customerData = await Customer.find({ c_id: body.name });
        var job_ids = [...customerData[0].job_ids];
        for (let i = 0; i < job_ids.length; i++) {
          const resp = await JobData.findOne({ job_id: job_ids[i] });
          if (resp !== null) {
            data.push(resp);
          }
        }

        return { success: true, message: 'All Jobs Fetched Successfully', customerData: customerData, data: data };
      }
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  getAllJobDataByMobile = async (body) => {
    try {
      console.log(body);
      if (body.mobile != '' || body.mobile != undefined) {
        let data = [];
        var customerData = await Customer.find({ phone: body.mobile });
        if (customerData.length == 0) {
          return { success: false, message: 'No Records Found' };
        }
        else {
          var job_ids = [...customerData[0].job_ids];
          for (let i = 0; i < job_ids.length; i++) {
            const resp = await JobData.findOne({ job_id: job_ids[i] });
            if (resp !== null) {
              data.push(resp);
            }
          }
          return { success: true, message: 'All Jobs Fetched Successfully', customerData: customerData, data: data };
        }
      }
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  getJobsBetweenDates = async (body) => {
    try {
      const startDate = new Date(body.startDate).toISOString();
      const endDate = new Date(body.endDate).toISOString();
      var customerData = [];

      var data = await JobData.find({ $and: [{ returnDate: { $gt: startDate } }, { returnDate: { $lt: endDate } }] }).sort({ job_id: 1 })

      if (data.length == 0) {
        return { success: false, message: 'No Records Found' };
      }
      else {
        for (let i = 0; i < data.length; i++) {
          const resp = await Customer.findOne({ job_ids: data[i].job_id });
          if (resp !== null) {
            customerData.push(resp);
          }
        }
        return { success: true, message: 'All Jobs Fetched Successfully', data: data, customerData: customerData };
      }
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  getJobID = async () => {
    try {
      var resp = await JobData.findOne().sort({ job_id: -1 }).limit(1);
      const job_id = resp.job_id + 1;
      return {
        success: true,
        message: job_id
      }
    }
    catch (err) {
      return { success: false, message: err.message };
    }
  }

  getCurrentJobPrice = async (body) => {
    try {
      var resp = await JobData.findOne({ job_id: body.job_id });
      var data = {
        totalPrice: resp.totalPrice,
        shirt_price: resp.shirt_data.price,
        pant_price: resp.pant_data.price
      }
      return {
        success: true,
        message: data
      }
    }
    catch (err) {
      return { success: false, message: err.message };
    }
  }
}

module.exports = exports = new jobData();