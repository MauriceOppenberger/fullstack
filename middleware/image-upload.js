const multer = require("multer");

const IMAGE_MIME_TYPE = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};
const FILE_MIME_TYPE = {
  "application/pdf": "pdf",
};
const imageUpload = multer({
  limits: 1000000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === "image") {
        cb(null, "uploads/images");
      }
      if (file.fieldname === "file") {
        cb(null, "uploads/files");
      }
    },
    filename: (req, file, cb) => {
      if (file.fieldname === "image") {
        const ext = IMAGE_MIME_TYPE[file.mimetype];
        cb(
          null,
          `${req.user.firstName}_${req.user.lastName}-profile-image.${ext}`
        );
      }
      if (file.fieldname === "file") {
        cb(null, file.originalname);
      }
    },
  }),
  fileFilter: (req, file, cb) => {
    //convert undefind to false with !!
    const isValid =
      !!IMAGE_MIME_TYPE[file.mimetype] || !!FILE_MIME_TYPE[file.mimetype];

    let error = isValid ? null : new Error("Invalid file extension");
    cb(error, isValid);
  },
});

module.exports = imageUpload;