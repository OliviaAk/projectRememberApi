const express = require("express");
const {
	getHeroes,
	createHero,
	uploadImages,
	getHero,
} = require("./controller");

const route = express.Router();

route.get("/", getHeroes);
route.post("/", uploadImages);
route.post("/info", createHero);
route.get("/:id", getHero);

module.exports = route;
