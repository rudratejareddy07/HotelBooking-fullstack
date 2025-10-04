import express from "express";
import { registerHotel } from "../controllers/hotelContoller.js";
import protect from "../middleware/authMiddleware.js";

const hotelRouter=express.Router();
hotelRouter.post('/',protect,registerHotel);
export default hotelRouter;
