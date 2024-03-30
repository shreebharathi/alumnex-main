const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		immutable: true, // Ensures that this field doesn't change once set
	},
	modifiedAt: {
		type: Date,
		default: Date.now,
	},
	// Additional fields as necessary
	category: {
		type: String,
		required: false, // Make it required as per your need
		trim: true,
	},
});

// Middleware to update the modifiedAt field on save
newsletterSchema.pre("save", function (next) {
	if (this.isModified()) {
		this.modifiedAt = Date.now();
	}
	next();
});

const Newsletter = mongoose.model("Newsletter", newsletterSchema);

module.exports = Newsletter;
