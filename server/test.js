import { v2 as cloudinary } from "cloudinary";
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.uploader.upload("C:/Users/jashu/temp-clean-repo/server/uploads/rooms/test.jpg")

  .then(res => console.log("✅ Upload success:", res.secure_url))
  .catch(err => console.error("❌ Upload failed:", err));
