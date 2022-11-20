const router = require("express").Router();

const createCustomer = require("../controllers/customerController").createCustomer;
const editCustomer = require("../controllers/customerController").editCustomer;
const deleteCustomer = require("../controllers/customerController").deleteCustomer;
const getCustomer = require("../controllers/customerController").getCustomer;
const getAllCustomers = require("../controllers/customerController").getAllCustomers;
const getCustomerNameList = require("../controllers/customerController").getCustomerNameList;
const getCustomerMobileList = require("../controllers/customerController").getCustomerMobileList;
const getCustomerByID = require("../controllers/customerController").getCustomerByID;
const getCustomerByMobile = require("../controllers/customerController").getCustomerByMobile;
const getCustomerBetweenDates = require("../controllers/customerController").getCustomerBetweenDates;

router.post("/create", createCustomer);
router.post("/edit", editCustomer);
router.post("/delete", deleteCustomer);
router.post("/getcustomer", getCustomer);
router.post("/getall", getAllCustomers);
router.post("/getnamelist", getCustomerNameList);
router.post("/getbyid", getCustomerByID);
router.post("/getbymobile", getCustomerByMobile);
router.post("/getbetween", getCustomerBetweenDates);

module.exports = router;