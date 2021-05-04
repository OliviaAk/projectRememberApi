const mongoose = require("mongoose");

const { Schema } = mongoose;
const heroSchema = new Schema({
	dateBirth: { type: String },
	name: { type: String, uppercase: false, lowercase: false },
	image: { type: String },
	url: { type: String },
	text: { type: String },
	isPublish: { type: Boolean },
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;
