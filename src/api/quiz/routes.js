const express = require("express");
const {
	getQuiz,
	createQuiz,
	createQuestion,
	getQuestions,
	editQuiz,
	deleteQuiz,
	editQuestions,
	deleteQuestion,
} = require("./controller");

const route = express.Router();

route.get("/", getQuiz);
route.post("/", createQuiz);
route.patch("/:id", editQuiz);
route.delete("/:id", deleteQuiz);
route.post("/questions", createQuestion);
route.get("/questions", getQuestions);
route.patch("/questions/:id", editQuestions);
route.delete("/questions/:id", deleteQuestion);
module.exports = route;
