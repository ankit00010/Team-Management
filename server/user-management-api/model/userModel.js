const mongoose = require("mongoose");




const userSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    domain: {
        type: String,
        required: true,
    },
    available: {
        type: Boolean,
        default: false,
        required: true,
    },
});


module.exports = mongoose.model("User", userSchema, "User");