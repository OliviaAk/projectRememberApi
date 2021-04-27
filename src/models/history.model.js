const mongoose = require("mongoose");

const { Schema } = mongoose;
const historySchema = new Schema({
	date: { type: String },
	text: { type: String },
});

const History = mongoose.model("History", historySchema);

module.exports = History;
