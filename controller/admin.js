const Post = require("../models/post");
const User = require("../models/user");
const { validationResult } = require("express-validator");

// exports.getPosts = async (req, res, next) => {
//   try {
//     const posts = await Post.find().populate("creator");
//     res
//       .status(200)
//       .json({ message: "Posts fetched successfully", data: posts });
//   } catch (err) {
//     console.log(err);
//     // res.status(500).json({ message: "internal server error" });
//     return next(err);
//   }
// };

exports.getPostsByUser = async (req, res, next) => {
  try {
    const posts = await Post.find({ creator: req.user.id })
      .populate("creator")
      .sort({ createdAt: -1 });
    res.status(200).json({ data: posts });
    return posts;
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  // const { title, description, userId } = req.body;
  // if (title === "" || description === "" || userId === "") {
  //   res.status(400).json({ message: "no data provided" });
  //   return;
  // }

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { title, description, userId } = req.body;
    const post = new Post({
      title,
      description,
      creator: userId
    });
    const newPost = await post.save();

    const user = await User.findById(userId);
    if (!user) {
      const error = new Error("no user found");
      error.statusCode = 400;
      throw error;
    }
    user.posts.push(newPost);
    await user.save();
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (err) {
    // res.status(500).json({ message: "internal server error" });
    console.log(err);
    next(err);
  }
};
