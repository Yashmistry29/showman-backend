const JobData = require('../models/jobData');
const data = require("../data/convertedJobdata.json");
const { db} = require('../database/database');
const { query, orderBy, limit, collection, getDocs, doc, setDoc, getDoc, updateDoc } = require('firebase/firestore');
const { async } = require('@firebase/util');

class jobData{
  createJob = async (body) => {
    try {
      const id = body.c_id;
      const jobData = body.jobData;
      const _doc = await getDoc(doc(db, "JobData", "1"));
      var j_id;
      if (!_doc.exists()) {
        jobData["job_id"] = 1;
        j_id=jobData.job_id.toString();
        await setDoc(doc(db, "JobData", j_id), jobData);
      }
      else {

        var q = await query(collection(db, "JobData"), orderBy("job_id", 'desc'), limit(1));
        var jobDocs = await getDocs(q);

        jobDocs.forEach((data) => {
          jobData["job_id"] = data.data().job_id + 1;
        })

        j_id = jobData.job_id.toString();
        await setDoc(doc(db, "JobData", j_id), jobData);
      }
      console.log(id);
      await updateDoc(doc(db, "Customer", id), { latest_job_id: j_id, job_ids: [j_id] });
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
      var data;
      if (body.job_id === 0) {
        return { success: true, message: 'Create New Job'};
      }
      else {
        const _doc = await getDoc(doc(db, "JobData", body.job_id));
        if (_doc.exists()) {
          data = _doc.data();
        }
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
      const id = body.c_id;
      const jobData = body.jobData;
      var j_id;
      var q = await query(collection(db, "JobData"), orderBy("job_id", 'desc'), limit(1));
      var jobDocs = await getDocs(q);

      jobDocs.forEach((data) => {
        jobData["job_id"] = data.data().job_id + 1;
      })

      j_id = jobData.job_id.toString();
      await setDoc(doc(db, "JobData", j_id), jobData);

      q = await getDoc(doc(db, 'Customer', id));
      var j_ids
      if (q.exists()) {
        j_ids = q.data().job_ids;
        j_ids.push(j_id);
        await updateDoc(doc(db, "Customer", id), { latest_job_id: j_id, job_ids: j_ids });
      }
      return { success: true, message: 'Job Updated Successfully' };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }
  
  deleteJob = async (body) => {
    try {
      console.log(body);
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
      const data="";
      return { success: true, message: 'All Jobs Fetched Successfully', data: data };
    }
    catch (err) {
      console.log(err);
      return { success: false, message: err.message };
    }
  }

  getJobsBetweenDates = async (body) => {
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

  insertDocuments = async () => {
    try {
      data.map(async (doc1) => {
        await setDoc(doc(db, "JobData", doc1.job_id.toString()), doc1);
        console.log(doc1.job_id)
      })
      return { success: true, message: "DOC written SUCCESSFULLY" };
    }
    catch (err) {
      console.log(err)
      return { success: false, message: err.message };
    }
  }
}

module.exports = exports = new jobData();