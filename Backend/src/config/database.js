const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI environment variable is not defined");
        }
        await mongoose.connect(mongoUri);
        // console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err)
    }
}; //monu1011
module.exports = connectDB;


