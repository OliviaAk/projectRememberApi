const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const JWToken = require("../../models/token.model");

const loginWithFacebook = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });

		if (!user) {
			return res.status(404).send("User not found");
		}
		await JWToken.findOneAndDelete({ userId: user._id });

		const token = jwt.sign({ id: user._id }, process.env.SECRET, {
			expiresIn: process.env.TOKEN_EXPIRATION_TIME,
		});
		await JWToken.create({ token, userId: user._id });
		res.cookie("token", token);
		res.redirect(process.env.CLIENT_FACEBOOK_URL);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const loginWithGoogle = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });
		if (!user) {
			return res.status(404).send("User not found");
		}
		await JWToken.findOneAndDelete({ userId: user._id });

		const token = jwt.sign({ id: user._id }, process.env.SECRET, {
			expiresIn: process.env.TOKEN_EXPIRATION_TIME,
		});
		await JWToken.create({ token, userId: user._id });
		res.cookie("token", token);
		res.redirect(process.env.CLIENT_GOOGLE_URL);
	} catch (err) {
		return res.status(500).json(err);
	}
};
module.exports = {
	loginWithFacebook,
	loginWithGoogle,
};
