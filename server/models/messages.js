const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    Message: {
        type: String,
        required: true,
        trim: true,
    }
})

const message = mongoose.model("Message", messageSchema);

module.exports = message;