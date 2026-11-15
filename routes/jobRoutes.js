const router = require("express").Router();

const {
  createJob,
  getJob,
  updateJob,
  deleteJob,
  getAllJobs,
  getAllJobDataByName,
  getAllJobDataByMobile,
  getJobsBetweenDates,
  getJobID,
  getCurrentJobPrice } = require("../controllers/jobController");

// Legacy route: POST /job/createJob
// router.post("/createJob", createJob);
// Suggested new route: POST /job
router.post("/", createJob);

// Legacy route: POST /job/updateJob
// router.post("/updateJob", updateJob);
// Suggested new route: POST /job/customer/:c_id/jobs
router.post("/customer/:c_id/jobs", updateJob);

// Legacy route: POST /job/deleteJob
// router.post("/deleteJob", deleteJob);
// Suggested new route: DELETE /job/customer/:c_id/jobs/:job_id
router.delete("/customer/:c_id/jobs/:job_id", deleteJob);

// Legacy route: POST /job/getAllJobs
// router.post("/getAllJobs", getAllJobs);
// Suggested new route: GET /job
router.get("/", getAllJobs);

// Legacy route: POST /job/getid
// router.post("/getid", getJobID);
// Suggested new route: GET /job/id
router.get("/id", getJobID);

// Legacy route: POST /job/getAllJobDataByName
// router.post("/getAllJobDataByName", getAllJobDataByName);
// Suggested new route: GET /job/customer/:c_id/jobs
router.get("/customer/:c_id/jobs", getAllJobDataByName);

// Legacy route: POST /job/getAllJobDataByMobile
// router.post("/getAllJobDataByMobile", getAllJobDataByMobile);
// Suggested new route: GET /job/mobile/:mobile
router.get("/mobile/:mobile", getAllJobDataByMobile);

// Legacy route: POST /job/getJobsBetweenDates
// router.post("/getJobsBetweenDates", getJobsBetweenDates);
// Suggested new route: GET /job/dates?startDate=...&endDate=...
router.get("/dates", getJobsBetweenDates);

// Legacy route: POST /job/getCurrentJobPrice
// router.post("/getCurrentJobPrice", getCurrentJobPrice);
// Suggested new route: GET /job/:id/price
router.get("/:id/price", getCurrentJobPrice);

// Legacy route: POST /job/getJob
// router.post("/getJob", getJob);
// Suggested new route: GET /job/:id
router.get("/:id", getJob);


module.exports = router;