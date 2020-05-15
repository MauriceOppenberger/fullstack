const multer = require("multer");

const imageUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = file.mimetype === "image/jpg";
    cb(null, isValid);
  },
});

module.exports = imageUpload;
