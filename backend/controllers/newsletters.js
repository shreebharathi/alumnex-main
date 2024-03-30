const Newsletter = require("../models/newsletter"); // Adjust the path as necessary

// Create a newsletter
const createNewsletter = async (req, res) => {
	try {
		const newsletter = new Newsletter(req.body);
		await newsletter.save();
		res.status(201).send(newsletter);
	} catch (error) {
		res.status(400).send(error.message);
	}
};

// Get all newsletters
const getAllNewsletters = async (req, res) => {
	try {
		const newsletters = await Newsletter.find({});
		res.status(200).send(newsletters);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Get a single newsletter by ID
const getNewsletter = async (req, res) => {
	try {
		const newsletter = await Newsletter.findById(req.params.id);
		if (!newsletter) {
			return res.status(404).send();
		}
		res.status(200).send(newsletter);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Update a newsletter
const updateNewsletter = async (req, res) => {
	try {
		const newsletter = await Newsletter.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!newsletter) {
			return res.status(404).send();
		}
		res.status(200).send(newsletter);
	} catch (error) {
		res.status(400).send(error);
	}
};

// Delete a newsletter
const deleteNewsletter = async (req, res) => {
	try {
		const newsletter = await Newsletter.findByIdAndDelete(req.params.id);
		if (!newsletter) {
			return res.status(404).send();
		}
		res.status(200).send(newsletter);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	createNewsletter,
	getAllNewsletters,
	getNewsletter,
	updateNewsletter,
	deleteNewsletter,
};
