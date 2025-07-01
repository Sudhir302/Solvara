require("dotenv").config();
const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// configuration
cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDINARYAPIKEY,
    api_secret: process.env.CLOUDINARYAPISECRET,
});

// ------------------coverImg------------------------

const storageCoverImg = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: (req,file)=> "coverImg",
        format: async(req, file) => file.mimetype.split("/")[1] ,
    },
});

// -------------------------profileImg--------------------------------

const storageProfileImg = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: (req, file)=> "profileImg",
        format: async(req, file)=> file.mimetype.split("/")[1],
    }
})

// ------------------------------posts--------------------------------

const storagePost = new CloudinaryStorage({
    cloudinary: cloudinary,
    params:{
        folder: (req, file) => "Post",
        format: async(req, file) => file.mimetype.split("/")[1],
    }
})


const uploadCoverImg = multer({storage:storageCoverImg});
const uploadProfileImg = multer({storage:storageProfileImg});
const uploadPost = multer({storage: storagePost});

module.exports = {cloudinary, uploadCoverImg, uploadProfileImg, uploadPost};