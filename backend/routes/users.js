const express = require("express");

const { registerUser, loginUser, getUser } = require("../controllers/users");

const router = express.Router();

router.get("/profile", getUser);

router.post("/register",registerUser);

router.post("/login", loginUser);

module.exports = router;
