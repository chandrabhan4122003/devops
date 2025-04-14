const mongoose = require("mongoose");
require("dotenv").config({path: "../.env"});

const connectDB = async() => {
    try{
        const conn = await mongoose.connect("mongodb://localhost:27017/");
        console.log("MongoDB Connected");
    }catch(err){
        console.error("Error: ", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;