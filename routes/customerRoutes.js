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

router.post("/create", createCustomer);
router.post("/edit", editCustomer);
router.post("/delete", deleteCustomer);
router.post("/getcustomer", getCustomer);
router.post("/getid", getCustomerID);
router.post("/getall", getAllCustomers);
router.post("/getnamelist", getCustomerNameList);
router.post("/getbyid", getCustomerByID);

module.exports = router;