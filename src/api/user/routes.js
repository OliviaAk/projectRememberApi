const express = require("express");
const passport = require("passport");
const { getUser, getUsers } = require("./controller");

const route = express.Router();

route.get("/", passport.authenticate("jwt", { session: false }), getUser);
route.get("/all", getUsers);

module.exports = route;
