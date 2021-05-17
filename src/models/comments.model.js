const mongoose = require("mongoose");

const { Schema } = mongoose;
const commentSchema = new Schema({
	text: { type: String },
	date: { type: Date },
	userId: { type: String },
	isPublish: { type: Boolean },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
