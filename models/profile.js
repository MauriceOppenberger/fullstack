const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
  },
  summary: {
    type: String,
  },
  social: {
    github: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  file: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
