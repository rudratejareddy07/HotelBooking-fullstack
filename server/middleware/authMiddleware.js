// import User from "../models/User.js";
// //middleware to check if user is authenticated

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


import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authData = req.auth();          // Call as a function
    const userId = authData.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // Check if user exists in MongoDB
    let user = await User.findById(userId);

    // If not, create a new user document
    if (!user) {
      user = await User.create({
        _id: userId,
        role: "user",               // default role
        recentSearchedCities: [],   // initialize
      });
      console.log("New MongoDB user created:", userId);
    }

    req.user = user;  // attach user to request
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Not authorized" });
  }
};

export default protect;
