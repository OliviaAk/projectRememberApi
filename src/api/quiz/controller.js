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
const getCurrentQuestions = async (req, res) => {
	try {
		const selectedQuiz = req.params.id;
		const heroes = await Question.find({ quizId: selectedQuiz });
		return res.status(200).json(heroes);
	} catch (err) {
		return res.status(500).json(err);
	}
};

const createQuiz = async (req, res) => {
	try {
		const { quizName } = req.body;

		const newCard = new Quiz({
			quizName,
		});
		const card = await newCard.save();
		return res.status(201).json(card);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const createQuestion = async (req, res) => {
	try {
		const { question, answers, correct, quizId } = req.body;

		const newCard = new Question({
			question,
			answers,
			correct,
			quizId,
		});
		const card = await newCard.save();
		return res.status(201).json(card);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const editQuiz = async (req, res) => {
	try {
		const _id = req.params.id;
		const { quizName } = req.body;
		if (_id) {
			const formatId = String(_id);
			const updatedEvent = await Quiz.updateOne(
				{ _id: formatId },
				{ $set: { quizName } },
			);
			if (updatedEvent) {
				const event = await Quiz.findById({ _id: formatId });
				return res.status(200).json(event);
			}
		}
		res.sendStatus(404);
	} catch (err) {
		res.status(500).json(err);
	}
};
const deleteQuiz = async (req, res) => {
	try {
		const _id = req.params.id;
		if (_id) {
			const formatId = String(_id);
			await Quiz.deleteOne({ _id: formatId });

			return res.status(200).json(formatId);
		}
		res.sendStatus(404);
	} catch (err) {
		res.status(500).json(err);
	}
};

const editQuestions = async (req, res) => {
	try {
		const _id = req.params.id;
		const { question, answers, correct } = req.body;
		if (_id) {
			const formatId = String(_id);
			const updatedEvent = await Question.updateOne(
				{ _id: formatId },
				{ $set: { question, answers, correct } },
			);
			if (updatedEvent) {
				const event = await Question.findById({ _id: formatId });
				return res.status(200).json(event);
			}
		}
		res.sendStatus(404);
	} catch (err) {
		res.status(500).json(err);
	}
};
const deleteQuestion = async (req, res) => {
	try {
		const _id = req.params.id;
		if (_id) {
			const formatId = String(_id);
			await Question.deleteOne({ _id: formatId });

			return res.status(200).json(formatId);
		}
		res.sendStatus(404);
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	getQuiz,
	createQuiz,
	createQuestion,
	getQuestions,
	editQuiz,
	deleteQuiz,
	editQuestions,
	deleteQuestion,
	getCurrentQuestions,
};
