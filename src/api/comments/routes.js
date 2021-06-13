const express = require("express");
const {
	getComments,
	editComments,
	deleteComments,
	createComment,
	uploadImages
} = require("./controller");

const route = express.Router();

route.get("/", getComments);
route.post("/", createComment);
route.patch("/:id", editComments);
route.delete("/:id", deleteComments);
route.post('/images',uploadImages)

module.exports = route;
