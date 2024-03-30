const Event = require("../models/event"); // Adjust the path as necessary

// Create an event
const createEvent = async (req, res) => {
	try {
		const event = new Event(req.body);
		await event.save();
		res.status(201).send(event);
	} catch (error) {
		res.status(400).send(error);
	}
};

// Get all events
const getAllEvents = async (req, res) => {
	try {
		const events = await Event.find({});
		res.status(200).send(events);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Get a single event by ID
const getEvent = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) {
			return res.status(404).send();
		}
		res.status(200).send(event);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Update an event
const updateEvent = async (req, res) => {
	try {
		const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!event) {
			return res.status(404).send();
		}
		res.status(200).send(event);
	} catch (error) {
		res.status(400).send(error);
	}
};

// Delete an event
const deleteEvent = async (req, res) => {
	try {
		const event = await Event.findByIdAndDelete(req.params.id);
		if (!event) {
			return res.status(404).send();
		}
		res.status(200).send(event);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	createEvent,
	getAllEvents,
	getEvent,
	updateEvent,
	deleteEvent,
};
