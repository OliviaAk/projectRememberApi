const express = require("express");
const { getHeroes, createHero, uploadImages } = require("./controller");

const route = express.Router();

route.get("/", getHeroes);
route.post("/", uploadImages);
route.post("/info", createHero);

module.exports = route;
