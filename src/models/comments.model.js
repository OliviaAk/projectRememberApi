const mongoose = require("mongoose");

const { Schema } = mongoose;
const commentSchema = new Schema({
	comment: { type: String },
	date: { type: Date },
	isPublish: { type: Boolean },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
