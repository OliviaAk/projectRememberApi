const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");
const JWToken = require("../../models/token.model");
const bcrypt = require("bcrypt");

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

const login = async (req,res)=>{
	try{
		const {email ,password, name }= req.body;

		const user = await User.findOne({ email });
		console.log(user)
		if (!user) {
			const hashedPwd = await bcrypt.hash(password, 10);
			const newUser = await User.create({email, password: hashedPwd, name});
			console.log(newUser, 'new')
			const token = jwt.sign({ id: newUser._id }, process.env.SECRET, {
				expiresIn: process.env.TOKEN_EXPIRATION_TIME,
			});
	
			await JWToken.create({ token, userId: newUser._id });
	
			return res.status(200).send(token);
		}
		else{
		await JWToken.findOneAndDelete({ userId: user._id });
		const isValidatePassword = await bcrypt.compare(password, user.password);
		if (!isValidatePassword) {
			return res.status(404).send("Wrong Password");
		}
		console.log(isValidatePassword)
		const token = jwt.sign({ id: user._id }, process.env.SECRET, {
			expiresIn: process.env.TOKEN_EXPIRATION_TIME,
		});
		await JWToken.create({ token, userId: user._id });
		res.status(200).send(token);
		}
	}
	catch (err){
		return res.status(500).json(err);
	}
}
module.exports = {
	login
};
