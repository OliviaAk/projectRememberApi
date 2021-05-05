const mongoose = require("mongoose");

const { Schema } = mongoose;
const questionSchema = new Schema({
	question: { type: String },
	answers: { type: Array },
	correct: { type: String },
	quizId: { type: String },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
