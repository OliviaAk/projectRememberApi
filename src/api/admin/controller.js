const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../../models/admin.model");
const JWToken = require("../../models/token.model");

const loginAdmin = async (req, res) => {
	try {
		const { login, password } = req.body;
		const admin = await Admin.findOne({ login });
		if (!admin) {
			return res.status(404).send("Admin not found");
		}
		if (password !== admin.password) {
			return res.status(404).send("Wrong Password");
		}

		res.status(200).send(admin);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const createAdmin = async (req, res) => {
	try {
		const { login, password } = req.body;
		const newCard = new Admin({ login, password });
		const card = await newCard.save();
		return res.status(201).json(card);
	} catch (err) {
		return res.status(500).json(err);
	}
};
module.exports = {
	loginAdmin,
};
