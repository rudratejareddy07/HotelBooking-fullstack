import express from "express";
import upload from "../middleware/uploadMIddleware";
import { createRoom, getOwnerRoomss, getRooms, toggleRoomAvailability } from "../controllers/roomController";
import protect from "../middleware/authMiddleware";

const roomRouter = express.Router();

roomRouter=express.Router();

roomRouter.post('/',upload.array("images,4",protect,createRoom))
roomRouter.get('/',getRooms)

roomRouter.get('/owner',protect,getOwnerRooms)

roomRouter.post('/toggle-availability',protect,toggleRoomAvailability)

export default roomRouter;