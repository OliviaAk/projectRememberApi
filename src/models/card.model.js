const mongoose = require("mongoose");

const { Schema } = mongoose;
const cardSchema = new Schema({
	name:{ type: String },
    dateBirth: { type: String },
    description: {type:String},
    image: {type:String},
    isPublish: {type:Boolean},
    userId: {type:String},
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
