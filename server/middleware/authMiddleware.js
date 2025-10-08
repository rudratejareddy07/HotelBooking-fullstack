// import User from "../models/User.js";
// //middleware to check if user is authenticated

// import { User } from "@clerk/express";

// export const protect=async(req,res,next)=>{
//     const {userId}=req.auth();
//     if(!userId){
//         res.json({success:false,message:"not authenticated"})

//     }else{
//         const user=await User.findById(userId);
//         req.user=user;
//         next()
//     }

// }
// export default protect;


// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const authData = req.auth();          // Call as a function
//     const userId = authData.userId;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Not authenticated" });
//     }

//     // Check if user exists in MongoDB
//     let user = await User.findById(userId);

//     // If not, create a new user document
//     if (!user) {
//       user = await User.create({
//         _id: userId,
//         role: "user",               // default role
//         recentSearchedCities: [],   // initialize
//       });
//       console.log("New MongoDB user created:", userId);
//     }

//     req.user = user;  // attach user to request
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ success: false, message: "Not authorized" });
//   }
// };

// export default protect;















// import { clerkClient } from "@clerk/express";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const { userId } = req.auth(); // Clerk user ID

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Not authenticated" });
//     }

//     // Check if user exists in MongoDB
//     let user = await User.findById(userId);

//     if (!user) {
//       // Fetch data from Clerk
//       const clerkUser = await clerkClient.users.getUser({ _id: userId });

//       const username = clerkUser.username || clerkUser.firstName || "User";
//       const email = clerkUser.emailAddresses?.[0]?.emailAddress || "unknown@example.com";
//       const image = clerkUser.imageUrl || "";

//       // Create new MongoDB user
//       user = await User.create({
//         _id: userId,
//         username,
//         email,
//         image,
//         role: "user",
//         recentSearchedCities: [],
//       });

//       console.log("✅ New MongoDB user created:", username);
//     }

//     req.user = user; // attach to request
//     next();
//   } catch (error) {
//     console.error("❌ protect error:", error);
//     res.status(401).json({ success: false, message: error.message });
//   }
// };

// export default protect;













// // protect.js
// export const protect = async (req, res, next) => {
//   try {
//     const userId = req.auth()?.userId; // ✅ updated for v5
//     console.log("🛡 Clerk userId:", userId);

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Not authenticated" });
//     }

//     let user = await User.findById(userId);
//     console.log("🔍 Found in MongoDB?", !!user);

//     if (!user) {
//       const clerkUser = await clerkClient.users.getUser(userId);

//       const username = clerkUser.username || clerkUser.firstName || "User";
//       const email = clerkUser.emailAddresses?.[0]?.emailAddress || "unknown@example.com";
//       const image = clerkUser.imageUrl || "";

//       user = await User.create({
//         _id: userId,
//         username,
//         email,
//         image,
//         role: "user",
//         recentSearchedCities: [],
//       });

//       console.log("✅ MongoDB user created:", username);
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("❌ protect error:", error);
//     res.status(401).json({ success: false, message: error.message });
//   }
// };
// export default protect;
















// import { clerkClient } from "@clerk/express";

// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   try {
//     const { userId } = req.auth; // Clerk middleware attaches this
//     console.log("🛡 Clerk userId:", userId);

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Not authenticated" });
//     }

//     // Find MongoDB user by Clerk ID
//     let user = await User.findOne({ clerkId: userId });
//     console.log("🔍 Found in MongoDB?", !!user);

//     // If user not found, create one using Clerk data
//     if (!user) {
//       const clerkUser = await clerkClient.users.getUser(userId);
//       const username = clerkUser.username || clerkUser.firstName || "User";
//       const email = clerkUser.emailAddresses?.[0]?.emailAddress || "unknown@example.com";
//       const image = clerkUser.imageUrl || "";

//       user = await User.create({
//         clerkId: userId,
//         username,
//         email,
//         image,
//         role: "user",
//         recentSearchedCities: [],
//       });

//       console.log("✅ MongoDB user created:", username);
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("❌ protect error:", error);
//     res.status(401).json({ success: false, message: error.message });
//   }
// };

// export default protect;
























import { clerkClient } from "@clerk/express";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // ✅ Clerk v5 syntax
    const { userId } = req.auth();
    console.log("🛡 Clerk userId:", userId);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    let user = await User.findById(userId);
    console.log("🔍 Found in MongoDB?", !!user);

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);

      const username = clerkUser.username || clerkUser.firstName || "User";
      const email = clerkUser.emailAddresses?.[0]?.emailAddress || "unknown@example.com";
      const image = clerkUser.imageUrl || "";

      // ✅ Assign _id properly
      user = await User.create({
        _id: userId,
        username,
        email,
        image,
        role: "user",
        recentSearchedCities: [],
      });

      console.log("✅ MongoDB user created:", username);
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("❌ protect error:", error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default protect;
