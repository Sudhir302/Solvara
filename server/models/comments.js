const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: true,
    },
})

const comment = mongoose.model("Comment", commentSchema);

module.exports = comment;