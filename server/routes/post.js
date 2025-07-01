const express = require("express")
const postModel = require("../models/posts");
const router = express.Router();
const isLogged = require("../middlewares/isLogged");
const {uploadPost} = require("../uploads/cloudStorage");


// -----------------------upload post-------------------

router.post("/profile/:userId/upload/post", isLogged, uploadPost.single("postImg"), async(req, res)=>{
    const {userId} = req.params;
    const {postCaption} = req.body;
    const postImg = req.file;
    if(!userId){
        res.status(400).json({message: "Invalid userId", success: false});
    }
    try {
        const post = new postModel({
            postImg: postImg.path,
            caption: postCaption,
            userId: userId,
        })
        await post.save();
        return res.status(201).json({message: "Post uploaded", success: true})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error", success: false});
    }
});



// -----------------------------------Show all posts and its owner-------------------------------------

router.get("/profile/:userId/post", async(req, res)=>{
    const {userId} = req.params;
    if(!userId){
        return res.status(400).json({message: "Invalid User", success: false});
    }
    try {
        const posts = await postModel.find({}).populate("userId", "userName profilePicture");
        return res.status(200).json({message: "Fetched post sucessfully", posts, success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error", success: false})
    }
})

// --------------------------------Show specific users post-------------------------------------------------

router.get("/post/:userId/uploads", isLogged, async(req, res)=>{
    try {
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({message: "invalid userId", success: false})
        }
        const posts = await postModel.find({userId: userId}).populate("userId", "userName profilePicture");
        if(!posts){
            return res.status(404).json({message: "User has no post yet", success: false})
        }
        return res.status(200).json({message: "Your Post are here",posts, success: true})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error", success: false});
    }
})

module.exports = router;







