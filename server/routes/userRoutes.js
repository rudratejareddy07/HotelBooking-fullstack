// import express from "express";

// import { getUserData, storeRecentSearchedCities } from "../controllers/userController.js";
// import protect from "../middleware/authMiddleware.js";

// const userRouter=express.Router();

// userRouter.get('/',protect,getUserData);
// userRouter.post('/store-recent-search',protect,storeRecentSearchedCities);
// export default userRouter;







import express from "express";
import { requireAuth } from "@clerk/express";
import { getUserData, storeRecentSearchedCities } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";


const router = express.Router();

// Get user data
router.get("/", requireAuth(), protect, getUserData);

// Store recently searched city
router.post("/recent", requireAuth(), protect, storeRecentSearchedCities);

export default router;
