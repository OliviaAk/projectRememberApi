const Quiz = require("../../models/quiz.model");
const Question = require("../../models/question.model");

const getQuiz = async (req, res) => {
	try {
		const heroes = await Quiz.find();
		return res.status(200).json(heroes);
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports = {
	getQuiz,
};
