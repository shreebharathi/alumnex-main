const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		default: "Student",
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
	},
	phone: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phone: 1 }, { unique: true });

// Pre-save hook to hash password before saving it to the database
userSchema.pre("save", async function (next) {
	// Only hash the password if it has been modified (or is new)
	if (!this.isModified("password")) return next();

	// Generate a salt
	const salt = await bcrypt.genSalt(10);
	// Hash the password using our new salt
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

// Method to compare the entered password with the stored hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
