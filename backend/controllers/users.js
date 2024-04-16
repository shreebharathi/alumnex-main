const jwt = require("jsonwebtoken");
const User = require("../models/user");

const registerUser = async (req, res) => {
	const userData = new User({
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		password: req.body.password,
		role: req.body.role,
	});

	try {
		const newUser = await userData.save();
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const loginUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			const isMatch = await user.comparePassword(req.body.password);
			if (isMatch) {
				// Generate a JWT token that expires in 48 hours
				const token = jwt.sign(
					{ userId: user._id, role: user.role },
					process.env.JWT_SECRET,
					{
						expiresIn: "48h",
					}
				);

				// Send the token along with the successful login response
				res.status(200).json({
					message: "Login successful",
					user: { _id: user._id, username: user.username, email: user.email },
					token,
				});
			} else {
				res.status(401).json({ message: "Invalid email or password" });
			}
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getUser = async (req, res) => {
	try {
		const examples = await User.find({_id:req.params.id}).select("-password");
		res.json(examples);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const updateUser = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getAllUsers = async (req, res) => {
	try {
		// Fetch all users without the password field
		const users = await User.find({}).select("-password");
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: "Error fetching users", error: error });
	}
};

module.exports = {
	getUser,
	loginUser,
	registerUser,
	getAllUsers,
	updateUser,
};
