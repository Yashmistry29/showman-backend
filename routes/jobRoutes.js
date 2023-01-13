const router = require("express").Router();

const createJobController = require("../controllers/jobController").createJob;
const getJobController = require("../controllers/jobController").getJob;
const updateJobController = require("../controllers/jobController").updateJob;
const deleteJobController = require("../controllers/jobController").deleteJob;
const getAllJobsController = require("../controllers/jobController").getAllJobs;
const getAllJobDataByNameController = require("../controllers/jobController").getAllJobDataByName;
const getAllJobDataByMobileController = require("../controllers/jobController").getAllJobDataByMobile;
const getJobsBetweenDatesController = require("../controllers/jobController").getJobsBetweenDates;
const getJobID = require("../controllers/jobController").getJobID;
const insertDocuments = require('../controllers/jobController').insertDocuments;

router.post("/createJob", createJobController);
router.post("/getJob", getJobController);
router.post("/updateJob", updateJobController);
router.post("/deleteJob", deleteJobController);
router.post("/getAllJobs", getAllJobsController);
router.post("/getAllJobDataByName", getAllJobDataByNameController);
router.post("/getAllJobDataByMobile", getAllJobDataByMobileController);
router.post("/getJobsBetweenDates", getJobsBetweenDatesController);
router.post("/getid", getJobID);


module.exports = router;