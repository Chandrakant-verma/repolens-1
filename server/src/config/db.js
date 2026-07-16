import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(env.MONGODB_URI);

    console.log(
      `✅ MongoDB Connected : ${connection.connection.host}`
    );
  } catch (error) {
    console.log("❌ MongoDB Connection Failed");

    console.log(error.message);

    process.exit(1);
  }
};

export default connectDB;