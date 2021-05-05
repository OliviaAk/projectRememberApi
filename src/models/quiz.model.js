const mongoose = require("mongoose");

const { Schema } = mongoose;
const quizSchema = new Schema({
	quizTitle: { type: String },
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
