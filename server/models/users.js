const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true, 
    },
    userPassword:{
        type: String,
        required: true,
    },
    coverImg:{
        type: String,
        required: true,
        default: "https://images.unsplash.com/photo-1501536563292-5d56009a5942?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsdWUlMjBza3l8ZW58MHx8MHx8fDA%3D",
    },
    profilePicture:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
});


const User = mongoose.model('User', userSchema);

module.exports = User;