const express = require("express");
const {
	getHeroes,
	createHero,
	uploadImages,
	getHero,
	editHero,
	deleteHero,
	updateHero,
	getPublishHeroes,
} = require("./controller");

const route = express.Router();

route.get("/", getHeroes);
route.get("/published", getPublishHeroes);
route.post("/", uploadImages);
route.post("/info", createHero);
route.get("/:id", getHero);
route.patch("/info/:id", editHero);
route.delete("/info/:id", deleteHero);
route.patch("/:id", updateHero);
module.exports = route;
