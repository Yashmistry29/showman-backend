const mongoose = require("mongoose");
const config = require('../config');

var db = mongoose.connection;

mongoose.connect(config.server, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("Connecting to TEST DATABASE....");

db.on("error", console.error.bind(console, "DB connection error:"));

db.once("open", function () {
  console.log("DB TEST connection successful");
});
