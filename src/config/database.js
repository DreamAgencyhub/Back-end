import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dream-agency";
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};
