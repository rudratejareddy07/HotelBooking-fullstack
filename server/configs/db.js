import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/hotelbooking-fullstack`);  // Added closing backtick here
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1);  // Optional: Exit if DB fails (prevents hanging server)
  }
};

export default connectDB;