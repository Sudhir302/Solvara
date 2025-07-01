const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
    followers: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    following: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }
})

const follower = mongoose.model("Follower", followerSchema);

module.exports = follower;