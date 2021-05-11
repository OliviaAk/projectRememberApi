const express = require("express");
const { getQuiz , createQuiz,createQuestion, getQuestions} = require("./controller");

const route = express.Router();

route.get("/", getQuiz);
route.post('/',createQuiz);
route.post('/questions', createQuestion)
route.get('/questions', getQuestions)

module.exports = route;
