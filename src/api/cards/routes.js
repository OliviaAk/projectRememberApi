const express = require("express");
const passport = require("passport");
const {
	getCards,
	createCard,
	editCards,
	uploadImages,
	getCardsInfo,
	getPublishCards,
	updateCard,
} = require("./controller");

const route = express.Router();

route.get("/", getCards);
route.post("/", uploadImages);
route.post(
	"/info",
	passport.authenticate("jwt", { session: false }),
	createCard,
);
route.get("/info", getCardsInfo);
route.get("/publish", getPublishCards);
route.patch("/info/:id", updateCard);
module.exports = route;
