const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user.model");

passport.use(
	"jwt",
	new JWTstrategy(
		{
			secretOrKey: process.env.SECRET,
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		},
		async (jwtPayload, done) => {
			try {
				const user = await User.findById({ _id: jwtPayload.id }).lean(true);

				if (!user) {
					return done(null, false, { message: "User not found" });
				}

				done(null, user);
			} catch (err) {
				done(err);
			}
		},
	),
);

passport.use(
	"facebook",
	new FacebookStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.FACEBOOK_CALLBACK_URL,
			profileFields: ["id", "email", "name"],
		},
		async (token, refreshToken, profile, done) => {
			const user = await User.findOne({ email: profile.emails[0].value });
			if (!user) {
				return done(null, false, { message: "User not found" });
			}
		

			return done(null, user);
		},
	),
);