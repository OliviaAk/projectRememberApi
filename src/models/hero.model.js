const mongoose = require("mongoose");

const { Schema } = mongoose;
const heroSchema = new Schema({
	dateBirth: { type: String },
	name: { type: String, uppercase: false, lowercase: false },
	image: { type: String },
	fullTextOne: { type: String },
	fullTextTwo: { type: String },
	fullTextTree: { type: String },
});

const Hero = mongoose.model("Hero", heroSchema);

module.exports = Hero;
