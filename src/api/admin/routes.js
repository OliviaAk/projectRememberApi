const express = require("express");
const { loginAdmin } = require("./controller");

const route = express.Router();
route.post("/", loginAdmin);
module.exports = route;
