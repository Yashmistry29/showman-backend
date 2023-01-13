const jobData = require('../models/jobData');
const Customer = require('../models/customerModel');
const Price = require('../models/price');
const User = require('../models/userModel');
const mongoose = require("mongoose");
const fs = require('fs');
const JSZip = require('jszip');

const router = require("express").Router();
const db = mongoose.connection;

router.get("/", async (req, res, next) => {
  var message = {
    success: true,
    message: "Welcome to the SHOWMAN Backend",
  };
  res.send(message);
});

router.post("/db/backup", async (req, res, next) => {
  var Price_Collection = await Price.find({});
  var Customer_Collection = await Customer.find({});
  var JobData_Collection = await jobData.find({});
  var Admin_Collection = await User.find({});
  var data = {
    priceCollection: Price_Collection,
    customerCollection: Customer_Collection,
    jobDataCollection: JobData_Collection,
    adminCollection: Admin_Collection,
  }

  var message = {
    success: true,
    message: "Data Backed up Successfully",
    data: data
  };
  res.send(message);
})

router.post("/db/restore", async (req, res, next) => {
  var { path } = req.body;
  const zip = new JSZip();
  const fileData = fs.readFileSync(path, 'binary');
  var zipData = await zip.loadAsync(fileData);
  const jsonString = await zipData.file('data.json').async('string');
  var {
    priceCollection,
    jobDataCollection,
    customerCollection,
    adminCollection
  } = JSON.parse(jsonString);

  await Price.deleteMany({})
  await jobData.deleteMany({})
  await Customer.deleteMany({})
  await User.deleteMany({})

  await Price.insertMany(priceCollection);
  await jobData.insertMany(jobDataCollection);
  await Customer.insertMany(customerCollection);
  await User.insertMany(adminCollection);

  console.log("Data Restored....")

  var message = {
    success: true,
    message: "Data Restored Successfully",
  };
  res.send(message);
})

module.exports = router;