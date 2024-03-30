const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI;

mongoose
	.connect(MONGO_URI)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB", err));

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
