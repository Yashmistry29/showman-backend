const router = require("express").Router();

const {
  createCustomer,
  editCustomer,
  deleteCustomer,
  getCustomer,
  getAllCustomers,
  getCustomerNameList,
  getCustomerByID,
  getCustomerID
} = require("../controllers/customerController");

// Legacy route: POST /customer/create
// router.post("/create", createCustomer);
// Suggested new route: POST /customer
router.post("/", createCustomer);

// Legacy route: POST /customer/edit
// router.post("/edit", editCustomer);
// Suggested new route: PUT /customer/:id
router.put("/:id", editCustomer);

// Legacy route: POST /customer/delete
// router.post("/delete", deleteCustomer);
// Suggested new route: DELETE /customer/:id
router.delete("/:id", deleteCustomer);

// Legacy route: POST /customer/getcustomer
// router.post("/getcustomer", getCustomer);
// Suggested new route: GET /customer/:id/details
router.get("/:id/details", getCustomer);

// Legacy route: POST /customer/getid
// router.post("/getid", getCustomerID);
// Suggested new route: GET /customer/id
router.get("/id", getCustomerID);

// Legacy route: POST /customer/getall
// router.post("/getall", getAllCustomers);
// Suggested new route: GET /customer
router.get("/", getAllCustomers);

// Legacy route: POST /customer/getnamelist
// router.post("/getnamelist", getCustomerNameList);
// Suggested new route: GET /customer/names
router.get("/names", getCustomerNameList);

// Legacy route: POST /customer/getbyid
// router.post("/getbyid", getCustomerByID);
// Suggested new route: GET /customer/:id
router.get("/:id", getCustomerByID);

module.exports = router;