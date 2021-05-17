const express = require("express");
const {
	getComments,
	editComments,
	deleteComments,
	createComment,
} = require("./controller");

const route = express.Router();

route.get("/", getComments);
route.post("/", createComment);
route.patch("/:id", editComments);
route.delete("/:id", deleteComments);

module.exports = route;
