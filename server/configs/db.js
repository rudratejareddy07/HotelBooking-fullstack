import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/hotelbooking-fullstack`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Database Connected");
  } catch (error) {
    console.error(" Database Connection Error:", error.message);
  }
};

export default connectDB;
