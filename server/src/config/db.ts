import mongoose from "mongoose";
import 'dotenv/config'


const connectDB = async () => {
  console.log("mongo url", process.env.MONGO_URI)
  try {
    await mongoose.connect((process.env.MONGO_URI as string) || "");
    console.log(`🟢 Connected to MongoDB!`);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
export default connectDB;
