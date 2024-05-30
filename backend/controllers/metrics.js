const User = require("../models/user");
const Event = require("../models/event");
const Internship = require("../models/internship");
const Newsletter = require("../models/newsletter");

const getAllTotalCounts = async (req, res) => {
	try {
		const [totalUsers, totalEvents, totalInternships, totalNewsletters] =
			await Promise.all([
				User.countDocuments(),
				Event.countDocuments(),
				Internship.countDocuments(),
				Newsletter.countDocuments(),
			]);
		res
			.status(200)
			.json({ totalUsers, totalEvents, totalInternships, totalNewsletters });
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = { getAllTotalCounts };
