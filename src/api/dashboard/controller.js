const Hero = require("../../models/hero.model");
const { cloudinary } = require("../../../utils/cloudinary");

const getHeroes = async (req, res) => {
	try {
		const heroes = await Hero.find();
		return res.status(200).json(heroes);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getHero = async (req, res) => {
	const heroId = req.params.id;
	try {
		if (heroId) {
			const selectedHero = await Hero.findById({ _id: heroId });
			return res.status(200).json(selectedHero);
		}
	} catch (err) {
		res.send(err);
	}
};
const createHero = async (req, res) => {
	try {
		const {
			name,
			dateBirth,
			description,
			image,
			text,
			url,
			isPublish,
		} = req.body;
		const newHero = new Hero({
			name,
			dateBirth,
			description,
			image,
			text,
			url,
			isPublish,
		});
		const hero = await newHero.save();
		return res.status(201).json(hero);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const uploadImages = async (req, res) => {
	try {
		const fileStr = req.body.data;
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: "dashboard",
		});
		res.send({ imageId: uploadResponse.public_id });
	} catch (err) {
		res.status(500).json({ err: "Something went wrong" });
	}
};
module.exports = {
	uploadImages,
	getHeroes,
	createHero,
	getHero,
};
