const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String, required: true, lowercase: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;