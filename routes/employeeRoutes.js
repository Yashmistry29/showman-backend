const router = require("express").Router();
const {
  createEmployee,
  updateEmployee,
  getEmployee,
  getEmployeeNameList,
  getEmployeeId
} = require("../controllers/employeeController");

// Legacy route: POST /employee/create
// router.post("/create", createEmployee);
// Suggested new route: POST /employee
router.post("/", createEmployee);

// Legacy route: POST /employee/update
// router.post("/update", updateEmployee);
// Suggested new route: PUT /employee/:id
router.put("/:id", updateEmployee);

// Legacy route: POST /employee/getid
// router.post("/getid", getEmployeeId);
// Suggested new route: GET /employee/id
router.get("/id", getEmployeeId);

// Legacy route: POST /employee/getnamelist
// router.post("/getnamelist", getEmployeeNameList);
// Suggested new route: GET /employee/names
router.get("/names", getEmployeeNameList);

// Legacy route: POST /employee/getemployee
// router.post("/getemployee", getEmployee);
// Suggested new route: GET /employee/:id
router.get("/:id", getEmployee);

module.exports = router;