const express = require("express");

//Database
require("./database/database");

const config = require("./config");
const app = express();

// CORS
var cors = require("cors");
app.use(cors());

//Routes:
const homepage = require("./routes/index");
const userRoutes = require("./routes/userRoutes");
const customerRoutes = require("./routes/customerRoutes");
const jobRoutes = require("./routes/jobRoutes");
const priceRoutes = require("./routes/priceRoute");
const EmpRoutes = require("./routes/employeeRoutes");

const res = require("express/lib/response");

const PORT = config.port || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use("/", homepage);
app.use("/user", userRoutes);
app.use("/customer", customerRoutes);
app.use("/job", jobRoutes);
app.use("/price", priceRoutes);
app.use("/employee", EmpRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});