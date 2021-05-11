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
const getQuestions = async (req, res) => {
	try {
		const heroes = await Question.find();
		return res.status(200).json(heroes);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const createQuiz = async (req, res) => {
	try {
		const { quizName } = req.body;
		
		const newCard = new Quiz({
			quizName
		});
		const card = await newCard.save();
		return res.status(201).json(card);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const createQuestion = async (req, res) => {
	try {
		const { question,answers,correct,quizId } = req.body;
		
		const newCard = new Question({
			question,answers,correct,quizId 
		});
		const card = await newCard.save();
		return res.status(201).json(card);
	} catch (error) {
		return res.status(500).json(error);
	}
};

module.exports = {
	getQuiz,
	createQuiz,
	createQuestion,
	getQuestions
};
