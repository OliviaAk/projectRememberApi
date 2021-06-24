const express = require("express");
const { login } = require("./controller");

const route = express.Router();

route.post("/login", login);

module.exports = route;
