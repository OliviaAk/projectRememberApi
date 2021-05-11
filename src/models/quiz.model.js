const mongoose = require("mongoose");

const { Schema } = mongoose;
const quizSchema = new Schema({
	quizName: { type: String },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
