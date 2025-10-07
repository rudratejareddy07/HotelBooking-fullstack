//get /api/user

// export const getUserData=async(req,res)=>{
//     try{
//             const role=req.user.role;
//             const recentSearchedCities = req.user.recentSearchedCities;
//             res.json({sucess:true,role,recentSearchedCities})
//     }catch(error){
//         res.json({success:false,message:error.message})

//     }
// }

// //store user recent searchded cities
// export const storeRecentSearchedCities=async(req,res)=>{
//     try{
//         const {recentSearchedCity}=req.body;
//         const user=await req.user;
//         if(user.recentSearchedCities.length<3){
//             user.recentSearchedCities.push(recentSearchedCity)

//         }else{
//             user.recentSearchedCities.shift();
//             user.recentSearchedCities.push(recentSearchedCity)
            
            
//         }
//         await user.save();
//         res.json({success:true,message:"city added"});
//     }catch(error){
//         res.json({success:false,message:error.message})
//     }
// };







// import User from "../models/User.js";

// // GET /api/user
// export const getUserData = async (req, res) => {
//   try {
//     // Get userId from Clerk auth
//     const authData = req.auth(); // req.auth() is the new syntax
//     const userId = authData.userId;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     const { role, recentSearchedCities } = user;

//     res.status(200).json({ success: true, role, recentSearchedCities });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // POST /api/user/recent
// export const storeRecentSearchedCities = async (req, res) => {
//   try {
//     const authData = req.auth();
//     const userId = authData.userId;

//     const { recentSearchedCity } = req.body;

//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // Initialize array if undefined
//     if (!user.recentSearchedCities) user.recentSearchedCities = [];

//     // Keep only last 3 cities
//     if (user.recentSearchedCities.length < 3) {
//       user.recentSearchedCities.push(recentSearchedCity);
//     } else {
//       user.recentSearchedCities.shift();
//       user.recentSearchedCities.push(recentSearchedCity);
//     }

//     await user.save();

//     res.status(200).json({ success: true, message: "City added" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };














import User from "../models/User.js";

// GET /api/user
export const getUserData = async (req, res) => {
  try {
    const user = req.user; // comes from protect middleware

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { role, recentSearchedCities, username, email, image } = user;
    res.status(200).json({
      success: true,
      role,
      recentSearchedCities,
      username,
      email,
      image,
    });
  } catch (error) {
    console.error("getUserData error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/user/recent
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const user = req.user;
    const { recentSearchedCity } = req.body;

    if (!recentSearchedCity) {
      return res.status(400).json({ success: false, message: "City is required" });
    }

    // Maintain only last 3 recent cities
    if (user.recentSearchedCities.length >= 3) {
      user.recentSearchedCities.shift();
    }
    user.recentSearchedCities.push(recentSearchedCity);

    await user.save();
    res.status(200).json({ success: true, message: "City added successfully" });
  } catch (error) {
    console.error("storeRecentSearchedCities error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
