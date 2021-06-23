const dotenv = require("dotenv");
const path = require('path')
dotenv.config();
if (process.env.NODE_ENV === 'development') {
	dotenv.config({ path: path.join(__dirname,  '.env.development') })
}


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
const passport = require("passport");
const router = require("./src/routes");
require("./src/middleware/authPassport");

const PORT = process.env.PORT || 80;
const url =
	"mongodb+srv://dbData:1q2w3e4r5t6y@clusterproject.q8eml.mongodb.net/Remember";
app.use(express.urlencoded({ extended: true, limit: "250mb" }));
app.use(express.json({ limit: "250mb" }));
app.use(router);
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(passport.session());
app.set("view engine", "ejs");

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));
app.listen(PORT, () => {
	console.log(`server started on port:${PORT}`);
});
