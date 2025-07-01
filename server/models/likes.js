const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
    },
})

const likes = mongoose.model("Like", likeSchema);

module.exports = likes;