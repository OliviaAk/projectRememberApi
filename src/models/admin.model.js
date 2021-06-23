const mongoose = require("mongoose");

const { Schema } = mongoose;
const adminSchema = new Schema({
	login: { type: String, required: true, lowercase: true },
	password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
