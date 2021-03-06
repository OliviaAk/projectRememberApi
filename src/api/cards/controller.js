const Card = require("../../models/card.model");
const { cloudinary } = require("../../../utils/cloudinary");

const getCards = async (req, res) => {
	try {
		const { resources } = await cloudinary.search
			.expression("folder:dev_setups")
			.sort_by("public_id", "desc")
			.max_results(30)
			.execute();
		const publicIds = resources.map((file) => file.public_id);
		res.send(publicIds);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getPublishCards = async (req, res) => {
	try {
		const cards = await Card.find({ isPublish: true });
		return res.status(200).json(cards);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getCardsInfo = async (req, res) => {
	try {
		const cards = await Card.find();
		return res.status(200).json(cards);
	} catch (err) {
		return res.status(500).json(err);
	}
};
const getCard = async (req, res) => {
	const cardId = req.params.id;
	try {
		if (cardId) {
			const selectedHero = await Card.findById({ _id: cardId });
			return res.status(200).json(selectedHero);
		}
	} catch (err) {
		res.send(err);
	}
};

const editCards = async (req, res) => {
	try {
		const _id = req.params.id;
		const { description, name, dateBirth, image, isPublish } = req.body;
		if (_id) {
			const formatId = String(_id);
			const updatedEvent = await Card.updateOne(
				{ _id: formatId },
				{ $set: { description, name, dateBirth, image, isPublish } },
			);
			if (updatedEvent) {
				const event = await Card.findById({ _id: formatId });
				return res.status(200).json(event);
			}
		}
		res.sendStatus(404);
	} catch (err) {
		res.status(500).json(err);
	}
};

const createCard = async (req, res) => {
	try {
		const { name, dateBirth, description, image } = req.body;
		const userId = req.user._id;
		const newCard = new Card({
			name,
			dateBirth,
			description,
			image,
			isPublish: false,
			userId,
		});
		const card = await newCard.save();
		return res.status(201).json(card);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const uploadImages = async (req, res) => {
	try {
		const fileStr = req.body.data;
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: "dev_setups",
		});
		res.send({ imageId: uploadResponse.public_id });
	} catch (err) {
		console.error(err);
		res.status(500).json({ err: "Something went wrong" });
	}
};
const updateCard = async (req, res) => {
	const eventId = req.params.id;
	const { isPublish } = req.body;
	try {
		if (eventId) {
			const formatId = String(eventId);
			const updatedEvent = await Card.updateOne(
				{ _id: formatId },
				{ $set: { isPublish } },
			);
			if (updatedEvent) {
				const event = await Card.findById({ _id: formatId });
				return res.status(200).json(event);
			}
		}
		res.sendStatus(404);
	} catch (err) {
		res.status(500).json(err);
	}
};
const deleteCard = async (req, res) => {
	try {
		const _id = req.params.id;
		if (_id) {
			const formatId = String(_id);
			await Card.deleteOne({ _id: formatId });

			return res.status(200).json(formatId);
		}
		res.sendStatus(404);
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports = {
	editCards,
	createCard,
	uploadImages,
	getCards,
	getPublishCards,
	getCardsInfo,
	updateCard,
	deleteCard,
	getCard,
};
