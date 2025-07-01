require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieparser = require("cookie-parser")
const port = 5050;

const app = express();

// ----------------------requiring models---------------------------------
const userModel = require('./models/users');

// ----------------------requiring routes----------------------------------
const userRoute = require("./routes/user");
const profileRoute = require("./routes/profile");
const postRoute = require("./routes/post")

// ----------------------initializing mongoose-----------------------------
const main = async()=>{
    await mongoose.connect(`${process.env.DATABASEURI}`);
}

main().then(()=>{
    console.log("Connected to database:");
})
.catch((err)=>{
    console.error(err);
})

// -----------------------using middlewares---------------------------------

app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(cookieparser());

// ----------------------handling routes-----------------------------------

app.use("/api", userRoute);
app.use("/api", profileRoute);
app.use("/api", postRoute);


app.listen(port, '0.0.0.0', ()=>{
    console.log(`Listining on port: ${port}`);
});