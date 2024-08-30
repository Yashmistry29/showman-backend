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

router.post("/createJob", createJob);
router.post("/getJob", getJob);
router.post("/updateJob", updateJob);
router.post("/deleteJob", deleteJob);
router.post("/getAllJobs", getAllJobs);
router.post("/getAllJobDataByName", getAllJobDataByName);
router.post("/getAllJobDataByMobile", getAllJobDataByMobile);
router.post("/getJobsBetweenDates", getJobsBetweenDates);
router.post("/getCurrentJobPrice", getCurrentJobPrice);
router.post("/getid", getJobID);


module.exports = router;