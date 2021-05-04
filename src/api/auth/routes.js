const express = require("express");
const passport = require("passport");
const { loginWithOauth } = require("./controller");

const route = express.Router();

route.get(
	"/facebook",
	passport.authenticate("facebook", { scope: "email", session: false }),
);

route.get(
	"/facebook/callback",
	passport.authenticate("facebook", {
		session: false,
	}),
	loginWithOauth,
);
module.exports = route;
