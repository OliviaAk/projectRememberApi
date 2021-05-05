const express = require("express");
const { getQuiz } = require("./controller");

const route = express.Router();

route.get("/", getQuiz);

module.exports = route;
