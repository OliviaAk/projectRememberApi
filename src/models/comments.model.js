const mongoose = require("mongoose");

const { Schema } = mongoose;
const commentSchema = new Schema({
	comment: { type: String },
	date: { type: Date },
	image: { type: String },
	link: { type: String },
	file: { type: Array },
	isPublish: { type: Boolean },
	userId: { type: String },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
