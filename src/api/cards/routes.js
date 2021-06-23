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
	getCard,
	deleteCard,
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
route.get("/info/:id", getCard);

route.get("/publish", getPublishCards);
route.patch("/:id", updateCard);
route.patch("/info/:id", editCards);
route.delete("/info/:id", deleteCard);

module.exports = route;
