import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();



console.log("MongoDB URI:", process.env.MONGODB_URI);  // Log to check if the URI is being loaded



export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};