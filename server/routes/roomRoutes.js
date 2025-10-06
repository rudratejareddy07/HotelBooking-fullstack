// import express from "express";
// import upload from "../middleware/uploadMIddleware.js";
// import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/roomController.js";
// import protect from "../middleware/authMiddleware.js";

// const roomRouter = express.Router();



// roomRouter.post('/',upload.array("images,4",protect,createRoom))
// roomRouter.get('/',getRooms)

// roomRouter.get('/owner',protect,getOwnerRooms)

// roomRouter.post('/toggle-availability',protect,toggleRoomAvailability)

// export default roomRouter;
// routes/roomRoutes.js (minimal fix: syntax, middleware order, use fields for text+files)
import express from "express";
import upload from "../middleware/uploadMIddleware.js";
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/roomController.js";
import protect from "../middleware/authMiddleware.js";

const roomRouter = express.Router();

roomRouter.post('/', protect, upload.fields([{ name: 'images', maxCount: 4 }]), createRoom)
roomRouter.get('/',getRooms)

roomRouter.get('/owner',protect,getOwnerRooms)

roomRouter.post('/toggle-availability',protect,toggleRoomAvailability)

export default roomRouter;