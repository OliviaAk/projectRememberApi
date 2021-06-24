const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
	name: { type: String },
	password: { type: String },
	email: { type: String, required: true, lowercase: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
