const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postImg:{
        type: String,
        required: true,
    },
    caption:{
        type: String,
        required: true,
        trim: true,
    },
    userId:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
 })

 const Post = mongoose.model("Post", postSchema);

 module.exports = Post;