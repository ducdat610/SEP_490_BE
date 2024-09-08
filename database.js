import mongoose from "mongoose";

// Connect to DB
const connectDB = () => {
    try {
        const db = mongoose.connect(process.env.URI_MONGODB)
        console.log("Connecting to MongoDB successfully");
        return db;
    } catch (error) {
        throw new Error(error.toString());
    }
}

export default connectDB