const router = require("express").Router();

const createJobController = require("../controllers/jobController").createJob;
const getJobController = require("../controllers/jobController").getJob;
const updateJobController = require("../controllers/jobController").updateJob;
const deleteJobController = require("../controllers/jobController").deleteJob;
const getAllJobsController = require("../controllers/jobController").getAllJobs;
const getAllJobDataByNameController = require("../controllers/jobController").getAllJobDataByName;
const getJobsBetweenDatesController = require("../controllers/jobController").getJobsBetweenDates;

router.post("/createJob", createJobController);
router.post("/getJob", getJobController);
router.post("/updateJob", updateJobController);
router.post("/deleteJob", deleteJobController);
router.post("/getAllJobs", getAllJobsController);
router.post("/getAllJobDataByName", getAllJobDataByNameController);
router.post("/getJobsBetweenDates", getJobsBetweenDatesController);

module.exports = router;