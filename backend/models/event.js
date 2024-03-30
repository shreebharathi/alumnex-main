const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
	eventTitle: {
		type: String,
		required: true,
		trim: true,
	},
	eventDescription: {
		type: String,
		required: true,
		trim: true,
	},
	eventVenue: {
		type: String,
		required: true,
		trim: true,
	},
	eventTimestamp: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	modifiedAt: {
		type: Date,
		default: Date.now,
	},
	// Additional suitable fields
	organizer: {
		type: String,
		required: true,
		trim: true,
	},

	isVirtual: {
		type: Boolean,
		default: false,
	},
	registrationDeadline: {
		type: Date,
		default: Date.now,
	},
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
