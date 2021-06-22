const Comment = require("../../models/comments.model");
const { cloudinary } = require("../../../utils/cloudinary");

const getComments = async (req, res) => {
	try {
		const heroes = await Comment.find();
		return res.status(200).json(heroes);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const getImages = async (req, res) => {
	try {
		const { resources } = await cloudinary.search
			.expression("folder:comments")
			.sort_by("public_id", "desc")
			.max_results(30)
			.execute();
		const publicIds = resources.map((file) => file.public_id);
		res.send(publicIds);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const updateComment = async (req, res) => {
	try {
		const { link, comment, isPublish, _id } = req.body;
		if (_id) {
			const formatId = String(_id);
			const updatedEvent = await Comment.updateOne(
				{ _id: formatId },
				{ $set: { link, comment, isPublish } },
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
const editComments = async (req, res) => {
	try {
		const _id = req.params.id;
		const { isPublish } = req.body;
		if (_id) {
			const formatId = String(_id);
			const updatedEvent = await Comment.updateOne(
				{ _id: formatId },
				{ $set: { isPublish } },
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
		const { comment, date, image, link } = req.body;
		const newCard = new Comment({
			comment,
			date,
			image,
			isPublish: true,
			link,
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

const uploadImages = async (req, res) => {
	try {
		const fileStr = req.body.data;
		const uploadResponse = await cloudinary.uploader.upload(fileStr, {
			upload_preset: "comments",
		});
		res.send({ imageId: uploadResponse.public_id });
	} catch (err) {
		res.status(500).json({ err: "Something went wrong" });
	}
};

module.exports = {
 getComments,
 editComments,
 deleteComments, createComment , uploadImages, updateComment};
