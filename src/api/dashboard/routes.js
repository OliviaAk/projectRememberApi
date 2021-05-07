const express = require("express");
const {
	getHeroes,
	createHero,
	uploadImages,
	getHero,
	editHero,
	deleteHero,
} = require("./controller");

const route = express.Router();

route.get("/", getHeroes);
route.post("/", uploadImages);
route.post("/info", createHero);
route.get("/:id", getHero);
route.patch("/info/:id", editHero);
route.delete("/info/:id", deleteHero);

module.exports = route;
