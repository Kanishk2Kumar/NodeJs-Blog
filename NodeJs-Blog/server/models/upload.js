const express = require("express");
const multer = require("multer");
const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Define the route
router.post("/", upload.single("image"), (req, res) => {
  try {
    const postImage = req.file;
    res.status(200).send({
      status: true,
      message: 'Image uploaded successfully',
      data: postImage
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: 'Error uploading image',
      error: err.message
    });
  }
  next();
});

module.exports = upload;


// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// module.exports = { upload };