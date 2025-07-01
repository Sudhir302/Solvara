const express = require('express');
const router = express.Router();
const userModel = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const hashing = require('../resuablefunc/hashing');

// --------------signup----------------------
router.post("/signup", async(req, res)=>{
    try {
        let {userName, userEmail, userPassword} = req.body;
        if(!userPassword || !userEmail || !userName){
            return res.status(400).json({message: "Email, Username and Password cannot be null", success: false});
        }
        const isUser = await userModel.findOne({userEmail});
        if(isUser){
            return res.status(409).json({message: "User already exists", success: false});
        }
        if(userPassword.length <= 5){
            return res.status(400).json({message: " Password Must be greater than 5 digit", success: false});
        };
    
        const hashedPassword = await hashing(userPassword);
        const newUser = userModel({
            userName,
            userEmail,
            userPassword: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({message: "Account Created Succefully", success: true})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
})


// --------------signin----------------------

router.post("/signin", async(req,res)=>{
    try {
        const {userEmail, userPassword} = req.body;
        const isUser = await userModel.findOne({userEmail});
        if(!isUser){
            return res.status(400).json({message: "Check your email", success: false});
        }
        const isValidPassword = await bcrypt.compare(userPassword, isUser.userPassword)
        if(isUser && isValidPassword){

            const token = jwt.sign(
                {
                    userId: isUser._id,
                },
                process.env.JSONWEBTOKENSECRET,
                {
                    expiresIn: "1h"
                }
        );

            res.cookie("token", token,{
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 1000*60*60,
            })

            return res.status(200).json({ message: "Successfull logged in", userId: isUser._id, success: true });
        }
        else{
            return res.status(400).json({message: "Check your email or password", success: false});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error", status: false})
    }
})


// --------------update----------------------

router.put("/update/password", async(req,res)=>{
    try {
        const {userEmail, userPassword} = req.body;
        const isUser = await userModel.findOne({userEmail});
        if(!isUser){
            return res.status(400).json({message: "Check Your Email", success: false});
        }
        const hashedPassword = await hashing(userPassword);
        await userModel.findByIdAndUpdate(isUser._id, {userPassword: hashedPassword}, {new: true});
        return res.status(200).json({message: "Password Updated Successfully", success: true});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error", success: false});
    }
})

// --------------logout----------------------

router.post("/logout",(req,res)=>{
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000*60*60,
    });

    res.status(200).json({message: "Sucessfully logged out", success: true});
})


module.exports = router;