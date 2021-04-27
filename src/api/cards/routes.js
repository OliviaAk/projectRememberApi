const express = require("express");
const {getCards, createCard,editCards,uploadImages,getCardsInfo} = require("./controller");
const route = express.Router();
const passport = require("passport");

route.get("/", getCards);
route.post("/",uploadImages);
route.post("/info",	passport.authenticate("jwt", { session: false }),
createCard)
route.get('/info',getCardsInfo)

module.exports = route;
