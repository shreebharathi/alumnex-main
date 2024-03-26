const express = require("express");

const { registerUser, loginUser, getUser,getAllUsers } = require("../controllers/users");

const router = express.Router();

router.get("/profile", getUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/all", getAllUsers);

module.exports = router;
