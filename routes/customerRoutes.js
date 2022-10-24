const router = require("express").Router();

const createCustomer = require("../controllers/customerController").createCustomer;
const editCustomer = require("../controllers/customerController").editCustomer;
const deleteCustomer = require("../controllers/customerController").deleteCustomer;
const getCustomer = require("../controllers/customerController").getCustomer;
const getAllCustomers = require("../controllers/customerController").getAllCustomers;
const getCustomerByName = require("../controllers/customerController").getCustomerByName;
const getCustomerByID = require("../controllers/customerController").getCustomerByID;
const getCustomerByMobile = require("../controllers/customerController").getCustomerByMobile;
const getCustomerBetweenDates = require("../controllers/customerController").getCustomerBetweenDates;

router.post("/create", createCustomer);
router.post("/edit", editCustomer);
router.post("/delete", deleteCustomer);
router.post("/getcustomer", getCustomer);
router.post("/getall", getAllCustomers);
router.post("/getbyname", getCustomerByName);
router.post("/getbyid", getCustomerByID);
router.post("/getbymobile", getCustomerByMobile);
router.post("/getbetween", getCustomerBetweenDates);

module.exports = router;