const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2
    },
    email: {
        type: String,
        minlength: 6,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }, isAdmin: {
        type: Boolean,

    }, isBusiness: {
        type: Boolean,

    },
    location: {
        type: String,
    },
    image: {
        type: String,
    }
});

const User = mongoose.model("users", Userschema);
module.exports = User;