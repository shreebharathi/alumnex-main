const express = require("express");

const {
	registerUser,
	loginUser,
	getUser,
	getAllUsers,
	updateUser,
} = require("../controllers/users");

const router = express.Router();

router.get("/profile/:id", getUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/all", getAllUsers);

router.patch("/:id", updateUser);

module.exports = router;
