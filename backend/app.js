const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/users");
const internshipRoute = require("./routes/internships");
const eventRoute = require("./routes/events");
const newsletterRoute = require("./routes/newsletters");
const metricsRoutes = require("./routes/metrics");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/internship", internshipRoute);
app.use("/api/event", eventRoute);
app.use("/api/newsletter", newsletterRoute);
app.use("/api/metrics", metricsRoutes);

module.exports = app;
