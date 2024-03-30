const Internship = require("../models/internship"); // Adjust the path as necessary

// Create an internship
const createInternship = async (req, res) => {
	try {
		const internship = new Internship(req.body);
		await internship.save();
		res.status(201).send(internship);
	} catch (error) {
		res.status(400).send(error);
	}
};

// Get all internships
const getAllInternships = async (req, res) => {
	try {
		const internships = await Internship.find({});
		res.status(200).send(internships);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Get a single internship by ID
const getInternship = async (req, res) => {
	try {
		const internship = await Internship.findById(req.params.id);
		if (!internship) {
			return res.status(404).send();
		}
		res.status(200).send(internship);
	} catch (error) {
		res.status(500).send(error);
	}
};

// Update an internship
const updateInternship = async (req, res) => {
	try {
		const internship = await Internship.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (!internship) {
			return res.status(404).send();
		}
		res.status(200).send(internship);
	} catch (error) {
		res.status(400).send(error);
	}
};

// Delete an internship
const deleteInternship = async (req, res) => {
	try {
		const internship = await Internship.findByIdAndDelete(req.params.id);
		if (!internship) {
			return res.status(404).send();
		}
		res.status(200).send(internship);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	createInternship,
	getAllInternships,
	getInternship,
	updateInternship,
	deleteInternship,
};
