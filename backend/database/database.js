import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI
        if (!mongoURI) throw new Error("MONGO_URI is not set")
        await mongoose.connect(mongoURI)
        console.log(`Connected to MongoDB!`);
    } catch (error) {
        console.log("Mongo connection error", error);
        process.exit(1)
    }
}

export default connectDB

