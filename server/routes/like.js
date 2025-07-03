const express = require("express");
const likeModel = require("../models/likes");
const router = express.Router();


// --------------------------------specific post like---------------------------

router.post("/post/:postId/like", async(req,res)=>{
    try {
        const {postId} = req.params;
        const {userId} =req.body;
        let like = await likeModel.findOne({userId, postId});

        if(!like){
            let newLike = new likeModel({
                userId: userId,
                postId: postId
            })
            await newLike.save();
        }
        else{
            await likeModel.findByIdAndDelete(like._id);
        }
        
        let totalLike = (await likeModel.find({postId})).length;
        return res.status(200).json({
            message: like ? "Like removed" : "Post Liked",
            totalLike,
            success: true,
        })
 
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "internal server error", success: false});
    }
})


// ----------------------all posts like------------------------------

router.get("/post/like/all-post", async (req, res) => {
    try {
        const likes = await likeModel.find({}); // get all likes

        const likesMap = {};

        likes.forEach(like => {
            const postId = like.postId.toString();
            likesMap[postId] = (likesMap[postId] || 0) + 1;
        });

        res.status(200).json({
            message: "Likes fetched",
            likes: likesMap, 
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
});


module.exports = router; 
