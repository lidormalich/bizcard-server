const mongoose = require("mongoose");

const cardsSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        minlength: 2
    },
    companyEmail: {
        type: String,
        minlength: 2,
        unique: true,
        required: true
    },
    image: {
        type: String,
    }, imageBGC: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
    }, address: {
        type: String,
        required: true,
        minlength: 5,
    }, phone: {
        type: String,
        required: true,
        minlength: 7,
    }, userId: {
        type: String,
        required: true,
    },
});

const Card = mongoose.model("cards", cardsSchema);
module.exports = Card;