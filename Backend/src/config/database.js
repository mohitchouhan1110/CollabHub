const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        
        await mongoose.connect("mongodb+srv://mc3984925:monu1011@mohitnode.ilceiab.mongodb.net/?appName=MohitNode");
        // console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err)
    }
}; //monu1011
module.exports = connectDB;


