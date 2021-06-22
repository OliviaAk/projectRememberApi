const express = require("express");
const {
	getComments,
	editComments,
	deleteComments,
	createComment,
	uploadImages,
	updateComment
} = require("./controller");

const route = express.Router();

route.get("/", getComments);
route.post("/", createComment);
route.patch("/:id", editComments);
route.delete("/:id", deleteComments);
route.post("/info", updateComment);
route.post('/images', uploadImages)

module.exports = route;
