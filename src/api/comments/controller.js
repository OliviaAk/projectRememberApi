const Comment = require("../../models/comments.model");

const getComments = async (req, res) => {
	try {
		const heroes = await Comment.find();
		return res.status(200).json(heroes);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const editComments = async (req, res) => {
	try {
		const _id = req.params.id;
		const { text, date, isPublish } = req.body;
		if (_id) {
			const formatId = String(_id);
			const updatedEvent = await Comment.updateOne(
				{ _id: formatId },
				{ $set: { text, date, isPublish } },
			);
			if (updatedEvent) {
				const event = await Comment.findById({ _id: formatId });
				return res.status(200).json(event);
			}
		}
		res.sendStatus(404);
	} catch (err) {
		res.status(500).json(err);
	}
};

const createComment = async (req, res) => {
	try {
		const { comment, date } = req.body;
		const newCard = new Comment({
			comment,
			date,
			isPublish: true,
		});
		const card = await newCard.save();
		return res.status(201).json(card);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const deleteComments = async (req, res) => {
	try {
		const _id = req.params.id;
		if (_id) {
			const formatId = String(_id);
			await Comment.deleteOne({ _id: formatId });

			return res.status(200).json(formatId);
		}
		res.sendStatus(404);
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports = { getComments, editComments, deleteComments, createComment };
