const router = require("express").Router();
const {
  createEmployee,
  updateEmployee,
  getEmployee,
  getEmployeeNameList,
  getEmployeeId
} = require("../controllers/employeeController");

router.post("/create", createEmployee);
router.post("/update", updateEmployee);
router.post("/getemployee", getEmployee);
router.post("/getid", getEmployeeId);
router.post("/getnamelist", getEmployeeNameList);

module.exports = router;