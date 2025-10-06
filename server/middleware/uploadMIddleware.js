// // import multer from "multer";
// // const upload = multer({storage:multer.diskStorage({})})

// // export default upload;





// // // middleware/uploadMiddleware.js (minimal fix: add basic storage)
// // import multer from "multer";
// // import path from "path";

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, 'uploads/rooms/');
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname));
// //   },
// // });

// // const upload = multer({ storage });

// // export default upload;


// // middleware/uploadMiddleware.js (add directory creation)
// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const uploadDir = 'uploads/rooms/';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// export default upload;






import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = 'uploads/rooms/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
