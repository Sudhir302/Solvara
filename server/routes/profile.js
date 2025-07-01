const express = require("express");
const router = express.Router();
const isLogged = require("../middlewares/isLogged");
const userModel = require("../models/users");
const {uploadCoverImg, uploadProfileImg} = require("../uploads/cloudStorage");


router.get("/user", isLogged, async(req, res)=>{
    try {
        return res.status(200).json({message: "User is Authenticated", success: true})
    } catch (error) {
        return res.status(500).json({message: "internal server error", success: false});
    }
})



router.get("/profile/me", isLogged, async(req,res)=>{
    try {
        const currentId = req.user.userId;
        if(!currentId){
            return res.status(400).json({message: "Invalid user", success: false});
        }
        const user = await userModel.findById(currentId);
        if(!user){
            return res.status(404).json({message: "user not found", success: false});
        }
        return res.status(200).json({message: "Got Current user Profile image", profileImg: user.profilePicture, success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "internal server error", success: false});
    }
})

router.get("/profileImage/:userId", isLogged, async(req,res)=>{
    try {
        const {userId} = req.params;
        const currentId = req.user.userId;

        if(!userId){
            return res.status(400).json(
                {
                    message: "Invalid User Id",
                    success: false,
                });
        }

        const user = await userModel.findById(userId);

        if(!user){
            return res.status(404).json(
                {
                    message: "no user found",
                    success: false,
                });
        }
        if(currentId === userId){
            return res.status(200).json( 
            {
                message: "Got the ProfileImage",
                profileImg: user.profilePicture,
                currentId,
                success: true
            });

        }
        return res.status(400).json({message: "you are not the owner", success: false});
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "internal server error",
            success: false,
        });
    }
})

router.get("/profile/:userId/details",isLogged, async(req,res)=>{
    try {
        const {userId} = req.params;
        const currentId = req.user.userId;
        if(!userId){
            return res.status(400).json({
                message: "invalid userId",
                success: false,
            })
        }
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({message:"user not found", success: false});
        }
        return res.status(200).json({message: "Got user details", user, currentId, success: true})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "internal server error", success: false})
    }
})


// --------------------------------coverImg--------------------------------------------

router.get("/profile/:userId/coverImg", async(req,res)=>{
    try {
        const {userId} = req.params;
        if(!userId){
            return res.status(400).json({message: "Invalid userId", success: false});
        }
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({message: "user not found", success: false});
        }
        return res.status(200).json({message: "Got coverImg", coverImg: user.coverImg, success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error", success: false});
    }
})

router.put("/profile/:userId/coverImg", uploadCoverImg.single("coverImg"), async(req,res)=>{
    try {
        const {userId} = req.params;
        const coverImg = req.file;
        if(!coverImg){
            return res.status(404).json({message: "No image found", success: false});
        }
        if(!userId){
            return res.status(400).json({message: "invalid userId", success: false});
        }
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({message: "user not found", success: false});
        }
        await userModel.findByIdAndUpdate(userId, {coverImg: coverImg.path}, {new: true});
        return res.status(200).json({message: "CoverImg Updated Successfully", success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error", success: false});
    }
})

// -----------------------profile and username update---------------------


router.put("/profile/:userId/update/profile", uploadProfileImg.single("profileImg"),async(req,res)=>{
    try {
        const {userId} = req.params;
        const {username} = req.body;
        const profileImg = req.file;
        if(!userId || !username){
            return res.status(400).json({message: "invalid userId or username", success: false});
        }
        if(!profileImg){
            return res.status(404).json({message: "no profile found", success: false});
        }
        await userModel.findByIdAndUpdate(userId, {profilePicture: profileImg.path, userName: username}, {new: true})
        return res.status(200).json({message: "Profile Details Updated", success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "internal server error", success: false})
    }
})

// ------------------------------------show all solvara users--------------------------------

router.get("/profile/:userId/show/people", async(req, res)=>{
    const {userId} = req.params;
    if(!userId){
        return res.status(400).json({message: "Invalid userId", success: false});
    }
    try {
        const people = await userModel.find({_id: {$ne: userId}});
        return res.status(200).json({message: "Total Solvara users", people, success: true});
    } catch (error) {
        return res.status(500).json({message: "internal server error", success: false});
    }
})


module.exports = router;