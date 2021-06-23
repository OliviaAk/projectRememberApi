const express = require("express");
const passport = require("passport");
const { loginWithFacebook, loginWithGoogle } = require("./controller");

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
	loginWithFacebook,
); 

route.get(
	"/google",
	passport.authenticate("google", { scope: "email", session: false }),
);

route.get(
	"/google/callback",
	passport.authenticate("google", {
		session: false,
	}),
	loginWithGoogle,
);
module.exports = route;
