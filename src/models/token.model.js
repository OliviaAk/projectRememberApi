const mongoose = require("mongoose");

const { Schema } = mongoose;
const JWTokenSchema = new Schema({
	token: { type: String },
	userId: { type: String },
});

const JWToken = mongoose.model("JWToken", JWTokenSchema);

module.exports = JWToken;