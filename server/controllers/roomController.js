// //API to create a new room for a hotel

// import connectCloudinary from "../configs/cloudinary.js";
// import Hotel from "../models/Hotel.js";
// import {v2 as cloudinary} from "cloudinary";
// import Room from "../models/Room.js";

// export const createRoom=async(req,res)=>{
//     try{
//         const {roomType,pricePerNight,amenities}=req.body;
//         const hotel=await Hotel.findOne({owner:req.auth.userId})
//         if(!hotel){
//             return res.json({success:false,message:"No Hotel found"})
//         }

//         //upload images to cloduianry
//         const uploadImages = req.files.map(async(file)=>{
//             const response = await cloudinary.uploader.upload(file.path);
//             return response.secure_url;
//         })
//         //waitt for all uploadzs to complete
//         const images=await Promise.all(uploadImages);
//         await Room.create({
//             hotel:hotel._id,
//             roomType,
//             pricePerNight:+pricePerNight,
//             amenities:JSON.parse(amenities),
//             images
//         })
//         res.json({success:true,message:"Room created successfully"})
//     }catch(error){
//          res.json({success:false,message:error.message})
//     }
// }


// //api to get all rooms
// export const getRooms=async(req,res)=>{
//     try{
//         const rooms =await  Room.find({isAvailable:true}).populate({
//             path:'hotel',
//             populate:{
//                 path:'owner',
//                 Selection:'image'
//             }
//         }).sort({createdAt:-1})
//         res.json({success:true,rooms});

//     }catch(error){
//         res.json({success:false,message:error.message});
//     }



// }


// //api to get all rooms for a specific hotel
// export const getOwnerRooms=async(req,res)=>{
//     try{
//         const hotelData = await Hotel({owner:req.auth.userId})
//         const rooms = await Room.find({hotel:hotelData._id.toString()}).populate("hotel");
//          res.json({success:true,rooms});
//     }catch(error){
//         res.json({success:false,message:error.message});
//     }
    
// }




// //api to toggle availability of a room
// export const toggleRoomAvailability=async(req,res)=>{
//     try{
//         const {roomId}=req.body;
//         const roomData=await Room.findById(roomId);
//         roomData.isAvailable=!roomData.isAvailable;
//         await roomData.save();
//     }catch(error){
//         res.json({success:false,message:error.message});
//     }
    
// }  







// // controllers/roomController.js (minimal fixes: async map, findOne)
// import connectCloudinary from "../configs/cloudinary.js";
// import Hotel from "../models/Hotel.js";
// import {v2 as cloudinary} from "cloudinary";
// import Room from "../models/Room.js";

// export const createRoom=async(req,res)=>{
//     try{
//         const {roomType,pricePerNight,amenities}=req.body;
//         const hotel=await Hotel.findOne({owner:req.auth.userId})
//         if(!hotel){
//             return res.json({success:false,message:"No Hotel found"})
//         }

//         //upload images to cloduianry
//         const uploadImages = req.files.map(file => cloudinary.uploader.upload(file.path));
//         //waitt for all uploadzs to complete
//         const images=await Promise.all(uploadImages);
//         await Room.create({
//             hotel:hotel._id,
//             roomType,
//             pricePerNight:+pricePerNight,
//             amenities:JSON.parse(amenities),
//             images: images.map(img => img.secure_url)
//         })
//         res.json({success:true,message:"Room created successfully"})
//     }catch(error){
//          res.json({success:false,message:error.message})
//     }
// }

// //api to get all rooms
// export const getRooms=async(req,res)=>{
//     try{
//         const rooms =await  Room.find({isAvailable:true}).populate({
//             path:'hotel',
//             populate:{
//                 path:'owner',
//                 select:'image'
//             }
//         }).sort({createdAt:-1})
//         res.json({success:true,rooms});

//     }catch(error){
//         res.json({success:false,message:error.message});
//     }
// }

// //api to get all rooms for a specific hotel
// export const getOwnerRooms=async(req,res)=>{
//     try{
//         const hotelData = await Hotel.findOne({owner:req.auth.userId})
//         const rooms = await Room.find({hotel:hotelData._id}).populate("hotel");
//          res.json({success:true,rooms});
//     }catch(error){
//         res.json({success:false,message:error.message});
//     }
// }

// //api to toggle availability of a room
// export const toggleRoomAvailability=async(req,res)=>{
//     try{
//         const {roomId}=req.body;
//         const roomData=await Room.findById(roomId);
//         roomData.isAvailable=!roomData.isAvailable;
//         await roomData.save();
//     }catch(error){
//         res.json({success:false,message:error.message});
//     }
// }








// controllers/roomController.js (fix: req.files.images instead of req.files)
// import connectCloudinary from "../configs/cloudinary.js";
// import Hotel from "../models/Hotel.js";
// import {v2 as cloudinary} from "cloudinary";
// import Room from "../models/Room.js";

// export const createRoom=async(req,res)=>{
//     try{
//         const {roomType,pricePerNight,amenities}=req.body;
//         const hotel=await Hotel.findOne({owner:req.auth.userId})
//         if(!hotel){
//             return res.json({success:false,message:"No Hotel found"})
//         }

//         //upload images to cloduianry
//         const uploadImages = req.files.images.map(file => cloudinary.uploader.upload(file.path));
//         //waitt for all uploadzs to complete
//         const images=await Promise.all(uploadImages);
//         await Room.create({
//             hotel:hotel._id,
//             roomType,
//             pricePerNight:+pricePerNight,
//             amenities:JSON.parse(amenities),
//             images: images.map(img => img.secure_url)
//         })
//         res.json({success:true,message:"Room created successfully"})
//     }catch(error){
//          res.json({success:false,message:error.message})
//     }
// }

// //api to get all rooms
// export const getRooms=async(req,res)=>{
//     try{
//         const rooms =await  Room.find({isAvailable:true}).populate({
//             path:'hotel',
//             populate:{
//                 path:'owner',
//                 select:'image'
//             }
//         }).sort({createdAt:-1})
//         res.json({success:true,rooms});

//     }catch(error){
//         res.json({success:false,message:error.message});
//     }
// }

// //api to get all rooms for a specific hotel
// export const getOwnerRooms=async(req,res)=>{
//     try{
//         const hotelData = await Hotel.findOne({owner:req.auth.userId})
//         const rooms = await Room.find({hotel:hotelData._id}).populate("hotel");
//          res.json({success:true,rooms});
//     }catch(error){
//         res.json({success:false,message:error.message});
//     }
// }

// //api to toggle availability of a room
// export const toggleRoomAvailability=async(req,res)=>{
//     try{
//         const {roomId}=req.body;
//         const roomData=await Room.findById(roomId);
//         roomData.isAvailable=!roomData.isAvailable;
//         await roomData.save();
//     }catch(error){
//         res.json({success:false,message:error.message});
//     }
// }















// controllers/roomController.js
// import connectCloudinary from "../configs/cloudinary.js";
// import Hotel from "../models/Hotel.js";
// import {v2 as cloudinary} from "cloudinary";
// import Room from "../models/Room.js";

// export const createRoom = async (req, res) => {
//     try {
//         const { roomType, pricePerNight, amenities } = req.body;
//         const hotel = await Hotel.findOne({ owner: req.auth.userId });
//         if (!hotel) {
//             return res.json({ success: false, message: "No Hotel found" });
//         }

//         // Debug: Log req.files to check structure
//         console.log('req.files:', req.files);

//         // Handle images upload - assuming multer configured as array('images'), so req.files is array
//         // If using fields: { name: 'images', maxCount: X }, then req.files.images
//         let imageUrls = [];
//         if (req.files && req.files.length > 0) {
//             // For req.files as array (multer.array('images'))
//             const uploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path));
//             const uploadResults = await Promise.all(uploadPromises);
//             imageUrls = uploadResults.map(result => result.secure_url);
//         } else if (req.files && req.files.images && req.files.images.length > 0) {
//             // For req.files.images as array (multer.fields([{ name: 'images', maxCount: X }]))
//             const uploadPromises = req.files.images.map(file => cloudinary.uploader.upload(file.path));
//             const uploadResults = await Promise.all(uploadPromises);
//             imageUrls = uploadResults.map(result => result.secure_url);
//         } else {
//             console.log('No files received');
//             // Optionally, allow creation without images or return error
//             // return res.json({ success: false, message: "No images provided" });
//         }

//         // Debug: Log imageUrls
//         console.log('Uploaded image URLs:', imageUrls);

//         const room = await Room.create({
//             hotel: hotel._id,
//             roomType,
//             pricePerNight: +pricePerNight,
//             amenities: JSON.parse(amenities),
//             images: imageUrls
//         });

//         // Debug: Log created room
//         console.log('Created room:', room);

//         res.json({ success: true, message: "Room created successfully" });
//     } catch (error) {
//         console.error('Error in createRoom:', error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // api to get all rooms
// export const getRooms = async (req, res) => {
//     try {
//         const rooms = await Room.find({ isAvailable: true }).populate({
//             path: 'hotel',
//             populate: {
//                 path: 'owner',
//                 select: 'image'
//             }
//         }).sort({ createdAt: -1 });
//         res.json({ success: true, rooms });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// // api to get all rooms for a specific hotel
// export const getOwnerRooms = async (req, res) => {
//     try {
//         const hotelData = await Hotel.findOne({ owner: req.auth.userId });
//         if (!hotelData) {
//             return res.json({ success: false, message: "No Hotel found" });
//         }
//         const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");
//         res.json({ success: true, rooms });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// // api to toggle availability of a room
// export const toggleRoomAvailability = async (req, res) => {
//     try {
//         const { roomId } = req.body;
//         if (!roomId) {
//             return res.json({ success: false, message: "Room ID is required" });
//         }
//         const roomData = await Room.findById(roomId);
//         if (!roomData) {
//             return res.json({ success: false, message: "Room not found" });
//         }
//         roomData.isAvailable = !roomData.isAvailable;
//         await roomData.save();
//         res.json({ success: true, message: "Room availability toggled successfully", isAvailable: roomData.isAvailable });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };































// controllers/roomController.js
// import connectCloudinary from "../configs/cloudinary.js";
// import Hotel from "../models/Hotel.js";
// import { v2 as cloudinary } from "cloudinary";
// import Room from "../models/Room.js";

// export const createRoom = async (req, res) => {
//     try {
//         const { roomType, pricePerNight, amenities } = req.body;
//         const hotel = await Hotel.findOne({ owner: req.auth.userId });
//         if (!hotel) {
//             return res.json({ success: false, message: "No Hotel found" });
//         }

//         // Handle images upload to Cloudinary
//         let imageUrls = [];
//         if (req.files && req.files.length > 0) {
//             // For multer.array('images') - req.files is array
//             const uploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path));
//             const uploadResults = await Promise.all(uploadPromises);
//             imageUrls = uploadResults.map(result => result.secure_url);
//         } else if (req.files && req.files.images && req.files.images.length > 0) {
//             // For multer.fields([{ name: 'images', maxCount: X }]) - req.files.images is array
//             const uploadPromises = req.files.images.map(file => cloudinary.uploader.upload(file.path));
//             const uploadResults = await Promise.all(uploadPromises);
//             imageUrls = uploadResults.map(result => result.secure_url);
//         }

//         const room = await Room.create({
//             hotel: hotel._id,
//             roomType,
//             pricePerNight: +pricePerNight,
//             amenities: JSON.parse(amenities),
//             images: imageUrls
//         });

//         res.json({ success: true, message: "Room created successfully" });
//     } catch (error) {
//         console.error('Error in createRoom:', error);
//         res.json({ success: false, message: error.message });
//     }
// };

// // api to get all rooms
// export const getRooms = async (req, res) => {
//     try {
//         const rooms = await Room.find({ isAvailable: true }).populate({
//             path: 'hotel',
//             populate: {
//                 path: 'owner',
//                 select: 'image'
//             }
//         }).sort({ createdAt: -1 });
//         res.json({ success: true, rooms });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// // api to get all rooms for a specific hotel
// export const getOwnerRooms = async (req, res) => {
//     try {
//         const hotelData = await Hotel.findOne({ owner: req.auth.userId });
//         if (!hotelData) {
//             return res.json({ success: false, message: "No Hotel found" });
//         }
//         const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");
//         res.json({ success: true, rooms });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// // api to toggle availability of a room
// export const toggleRoomAvailability = async (req, res) => {
//     try {
//         const { roomId } = req.body;
//         if (!roomId) {
//             return res.json({ success: false, message: "Room ID is required" });
//         }
//         const roomData = await Room.findById(roomId);
//         if (!roomData) {
//             return res.json({ success: false, message: "Room not found" });
//         }
//         roomData.isAvailable = !roomData.isAvailable;
//         await roomData.save();
//         res.json({ success: true, message: "Room availability toggled successfully", isAvailable: roomData.isAvailable });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };




















// // controllers/roomController.js
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import Hotel from "../models/Hotel.js";
// import Room from "../models/Room.js";

// export const createRoom = async (req, res) => {
//   try {
//     const { roomType, pricePerNight, amenities } = req.body;

//     // Find hotel for the authenticated owner
//     const hotel = await Hotel.findOne({ owner: req.auth.userId });
//     if (!hotel) {
//       return res.json({ success: false, message: "No Hotel found" });
//     }

//     console.log("🧩 Files received:", req.files);

//     let imageUrls = [];

//     // Handle multiple image uploads (multer.array or multer.fields)
//     if (req.files && req.files.length > 0) {
//       const uploadPromises = req.files.map(async (file) => {
//         try {
//           console.log("Uploading file:", file.path);
//           const result = await cloudinary.uploader.upload(file.path);
//           console.log("✅ Uploaded to Cloudinary:", result.secure_url);

//           // remove local file after upload
//           fs.unlinkSync(file.path);
//           return result.secure_url;
//         } catch (err) {
//           console.error("❌ Cloudinary upload failed:", err.message);
//           return null;
//         }
//       });

//       imageUrls = (await Promise.all(uploadPromises)).filter(Boolean);
//     } else if (req.files && req.files.images && req.files.images.length > 0) {
//       const uploadPromises = req.files.images.map(async (file) => {
//         try {
//           const result = await cloudinary.uploader.upload(file.path);
//           console.log("✅ Uploaded to Cloudinary:", result.secure_url);
//           fs.unlinkSync(file.path);
//           return result.secure_url;
//         } catch (err) {
//           console.error("❌ Cloudinary upload failed:", err.message);
//           return null;
//         }
//       });

//       imageUrls = (await Promise.all(uploadPromises)).filter(Boolean);
//     }

//     // Safely parse amenities
//     let parsedAmenities = [];
//     try {
//       parsedAmenities = JSON.parse(amenities);
//     } catch (err) {
//       console.warn("⚠️ Invalid amenities JSON:", amenities);
//     }

//     // Create new room document
//     const room = await Room.create({
//       hotel: hotel._id,
//       roomType,
//       pricePerNight: +pricePerNight,
//       amenities: parsedAmenities,
//       image: imageUrls,
//     });

//     console.log("🏨 Room created:", room._id);

//     res.json({ success: true, message: "Room created successfully", room });
//   } catch (error) {
//     console.error("Error in createRoom:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ======================
// // Get all available rooms
// // ======================
// export const getRooms = async (req, res) => {
//   try {
//     const rooms = await Room.find({ isAvailable: true })
//       .populate({
//         path: "hotel",
//         populate: {
//           path: "owner",
//           select: "image",
//         },
//       })
//       .sort({ createdAt: -1 });

//     res.json({ success: true, rooms });
//   } catch (error) {
//     console.error("Error in getRooms:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ============================
// // Get all rooms of current owner
// // ============================
// export const getOwnerRooms = async (req, res) => {
//   try {
//     const hotelData = await Hotel.findOne({ owner: req.auth.userId });
//     if (!hotelData) {
//       return res.json({ success: false, message: "No Hotel found" });
//     }

//     const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");
//     res.json({ success: true, rooms });
//   } catch (error) {
//     console.error("Error in getOwnerRooms:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ============================
// // Toggle room availability
// // ============================
// export const toggleRoomAvailability = async (req, res) => {
//   try {
//     const { roomId } = req.body;
//     if (!roomId) {
//       return res.json({ success: false, message: "Room ID is required" });
//     }

//     const roomData = await Room.findById(roomId);
//     if (!roomData) {
//       return res.json({ success: false, message: "Room not found" });
//     }

//     roomData.isAvailable = !roomData.isAvailable;
//     await roomData.save();

//     res.json({
//       success: true,
//       message: "Room availability toggled successfully",
//       isAvailable: roomData.isAvailable,
//     });
//   } catch (error) {
//     console.error("Error in toggleRoomAvailability:", error);
//     res.json({ success: false, message: error.message });
//   }
// };































// // controllers/roomController.js
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import connectCloudinary from "../configs/cloudinary.js"; // Assuming this exists and sets config
// import Hotel from "../models/Hotel.js";
// import Room from "../models/Room.js";

// // Ensure Cloudinary is configured (call once globally, but safe to call here)
// connectCloudinary();

// export const createRoom = async (req, res) => {
//   try {
//     const { roomType, pricePerNight, amenities } = req.body;

//     // Find hotel for the authenticated owner
//     const hotel = await Hotel.findOne({ owner: req.auth.userId });
//     if (!hotel) {
//       return res.json({ success: false, message: "No Hotel found" });
//     }

//     console.log("🧩 Files received:", req.files);

//     let imageUrls = [];

//     // Handle multiple image uploads (multer.array or multer.fields)
//     const getFiles = () => {
//       if (req.files && Array.isArray(req.files) && req.files.length > 0) {
//         return req.files; // multer.array('images')
//       } else if (req.files && req.files.images && Array.isArray(req.files.images) && req.files.images.length > 0) {
//         return req.files.images; // multer.fields([{ name: 'images', maxCount: 10 }])
//       }
//       console.log("⚠️ No files found - check Multer config and form field name ('images')");
//       return [];
//     };

//     const files = getFiles();
//     if (files.length > 0) {
//       const uploadPromises = files.map(async (file) => {
//         try {
//           console.log("Uploading file:", file.originalname, file.path);
//           const result = await cloudinary.uploader.upload(file.path, {
//             folder: "hotel_rooms", // Optional: Organize in Cloudinary folder
//             resource_type: "image" // Ensure it's treated as image
//           });
//           console.log("✅ Uploaded to Cloudinary:", result.secure_url);

//           // Remove local file after upload
//           if (fs.existsSync(file.path)) {
//             fs.unlinkSync(file.path);
//           }
//           return result.secure_url;
//         } catch (err) {
//           console.error("❌ Cloudinary upload failed for", file.originalname, ":", err.message);
//           // Clean up on error
//           if (fs.existsSync(file.path)) {
//             fs.unlinkSync(file.path);
//           }
//           return null;
//         }
//       });

//       const results = await Promise.all(uploadPromises);
//       imageUrls = results.filter(url => url !== null);
//     }

//     if (imageUrls.length === 0 && files.length > 0) {
//       console.warn("⚠️ All uploads failed - room created without images");
//       // Optionally: return res.json({ success: false, message: "Image uploads failed" });
//     }

//     console.log("📸 Final image URLs:", imageUrls);

//     // Safely parse amenities
//     let parsedAmenities = [];
//     try {
//       parsedAmenities = amenities ? JSON.parse(amenities) : [];
//     } catch (err) {
//       console.warn("⚠️ Invalid amenities JSON:", amenities);
//       parsedAmenities = amenities ? [amenities] : []; // Fallback to string array
//     }

//     // Create new room document - FIXED: Use 'images' (plural) assuming schema has array field 'images'
//     const room = await Room.create({
//       hotel: hotel._id,
//       roomType,
//       pricePerNight: +pricePerNight,
//       amenities: parsedAmenities,
//       image: imageUrls, // Changed from 'image' to 'images' for array storage
//     });

//     console.log("🏨 Room created with images:", { _id: room._id, images: room.images });

//     res.json({ success: true, message: "Room created successfully", room });
//   } catch (error) {
//     console.error("Error in createRoom:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ======================
// // Get all available rooms
// // ======================
// export const getRooms = async (req, res) => {
//   try {
//     const rooms = await Room.find({ isAvailable: true })
//       .populate({
//         path: "hotel",
//         populate: {
//           path: "owner",
//           select: "image",
//         },
//       })
//       .sort({ createdAt: -1 });

//     res.json({ success: true, rooms });
//   } catch (error) {
//     console.error("Error in getRooms:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ============================
// // Get all rooms of current owner
// // ============================
// export const getOwnerRooms = async (req, res) => {
//   try {
//     const hotelData = await Hotel.findOne({ owner: req.auth.userId });
//     if (!hotelData) {
//       return res.json({ success: false, message: "No Hotel found" });
//     }

//     const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");
//     res.json({ success: true, rooms });
//   } catch (error) {
//     console.error("Error in getOwnerRooms:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // ============================
// // Toggle room availability
// // ============================
// export const toggleRoomAvailability = async (req, res) => {
//   try {
//     const { roomId } = req.body;
//     if (!roomId) {
//       return res.json({ success: false, message: "Room ID is required" });
//     }

//     const roomData = await Room.findById(roomId);
//     if (!roomData) {
//       return res.json({ success: false, message: "Room not found" });
//     }

//     roomData.isAvailable = !roomData.isAvailable;
//     await roomData.save();

//     res.json({
//       success: true,
//       message: "Room availability toggled successfully",
//       isAvailable: roomData.isAvailable,
//     });
//   } catch (error) {
//     console.error("Error in toggleRoomAvailability:", error);
//     res.json({ success: false, message: error.message });
//   }
// };

































// controllers/roomController.js
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import connectCloudinary from "../configs/cloudinary.js"; // Assuming this exists and sets config
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// Ensure Cloudinary is configured (call once globally, but safe to call here)
connectCloudinary();

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    // Find hotel for the authenticated owner
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel) {
      return res.json({ success: false, message: "No Hotel found" });
    }

    console.log("🧩 Files received:", req.files);

    let imageUrls = [];

    // Handle multiple image uploads (multer.array or multer.fields)
    const getFiles = () => {
      if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        return req.files; // multer.array('images')
      } else if (req.files && req.files.images && Array.isArray(req.files.images) && req.files.images.length > 0) {
        return req.files.images; // multer.fields([{ name: 'images', maxCount: 10 }])
      }
      console.log("⚠️ No files found - check Multer config and form field name ('images')");
      return [];
    };

    const files = getFiles();
    if (files.length > 0) {
      const uploadPromises = files.map(async (file) => {
        try {
          console.log("Uploading file:", file.originalname, file.path);
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "hotel_rooms", // Optional: Organize in Cloudinary folder
            resource_type: "image" // Ensure it's treated as image
          });
          console.log("✅ Uploaded to Cloudinary:", result.secure_url);

          // Remove local file after upload
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          return result.secure_url;
        } catch (err) {
          console.error("❌ Cloudinary upload failed for", file.originalname, ":", err.message);
          // Clean up on error
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          return null;
        }
      });

      const results = await Promise.all(uploadPromises);
      imageUrls = results.filter(url => url !== null);
    }

    if (imageUrls.length === 0 && files.length > 0) {
      console.warn("⚠️ All uploads failed - room created without images");
      // Optionally: return res.json({ success: false, message: "Image uploads failed" });
    }

    console.log("📸 Final image URLs:", imageUrls);

    // Safely parse amenities
    let parsedAmenities = [];
    try {
      parsedAmenities = amenities ? JSON.parse(amenities) : [];
    } catch (err) {
      console.warn("⚠️ Invalid amenities JSON:", amenities);
      parsedAmenities = amenities ? [amenities] : []; // Fallback to string array
    }

    // Create new room document - FIXED: Use 'image' (singular) to match schema
    const room = await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: parsedAmenities,
      image: imageUrls, // Matches schema field 'image: [{ type: String }]'
    });

    console.log("🏨 Room created with images:", { _id: room._id, image: room.image });

    res.json({ success: true, message: "Room created successfully", room });
  } catch (error) {
    console.error("Error in createRoom:", error);
    res.json({ success: false, message: error.message });
  }
};

// ======================
// Get all available rooms
// ======================
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    console.error("Error in getRooms:", error);
    res.json({ success: false, message: error.message });
  }
};

// ============================
// Get all rooms of current owner
// ============================
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotelData) {
      return res.json({ success: false, message: "No Hotel found" });
    }

    const rooms = await Room.find({ hotel: hotelData._id }).populate("hotel");
    res.json({ success: true, rooms });
  } catch (error) {
    console.error("Error in getOwnerRooms:", error);
    res.json({ success: false, message: error.message });
  }
};

// ============================
// Toggle room availability
// ============================
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    if (!roomId) {
      return res.json({ success: false, message: "Room ID is required" });
    }

    const roomData = await Room.findById(roomId);
    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.json({
      success: true,
      message: "Room availability toggled successfully",
      isAvailable: roomData.isAvailable,
    });
  } catch (error) {
    console.error("Error in toggleRoomAvailability:", error);
    res.json({ success: false, message: error.message });
  }
};