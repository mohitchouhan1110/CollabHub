const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        
        await mongoose.connect("your_mongodb_uri");
        // console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err)
    }
}; //monu1011
module.exports = connectDB;


