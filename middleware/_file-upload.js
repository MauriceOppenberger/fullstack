const multer = require("multer");

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/files");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = file.mimetype === "application/pdf";
    let error = isValid ? null : new Error("Invalid file extension");
    cb(error, isValid);
  },
});

module.exports = fileUpload;
