const express = require("express");

//Database
require("./database/database");

const config = require("./config");
const app = express();
const swaggerUi = require("swagger-ui-express");
const openApiSpec = require("./swagger");
const requestLogger = require("./middleware/requestLogger");

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
app.use(requestLogger);

// Swagger UI setup
app.get("/api-docs.json", (req, res) => res.json(openApiSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

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