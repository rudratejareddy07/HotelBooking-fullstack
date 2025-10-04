import express from "express";
import { registerHotel } from "../controllers/hotelContoller";
import protect from "../middleware/authMiddleware";

const hotelRouter=express.Router();
hotelRouter.post('/',protect,registerHotel);
export default hotelRouter;
