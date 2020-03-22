const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const { validationResult } = require("express-validator");

exports.getPostsByUser = async (req, res, next) => {
  try {
    const posts = await Post.find({ creator: req.user.id })
      .populate("creator")
      .sort({ createdAt: -1 });
    res.status(200).json({ data: posts });
  } catch (err) {
    next(err);
  }
};

// exports.getPostById = async (req, res, next) => {
//   const postId = req.params.id;
//   try {
//     const post = await Post.findById(postId).populate("creator");
//     if (!post) {
//       const error = new Error("no post found");
//       error.statusCode = 400;
//       throw error;
//     }
//     if (post.creator._id.toString() !== req.user.id.toString()) {
//       const error = new Error("no allowed to view this post");
//       error.statusCode = 403;
//       throw error;
//     }
//     res.status(200).json({ post: post });
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
// };

exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { title, description, language, userId } = req.body;
    const post = new Post({
      title,
      description,
      language,
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

exports.editPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const post = await Post.findOne({
      creator: req.user.id,
      _id: req.params.id
    });

    const {
      updatedTitle,
      updatedDescription,
      updatedLanguage,
      userId
    } = req.body;

    post.title = updatedTitle;
    post.description = updatedDescription;
    post.language = updatedLanguage;
    post.userId = userId;
    const updatedPost = await post.save();

    res.status(200).json({ message: "Post updated", post: updatedPost });
    console.log(updatedPost);
  } catch (err) {
    // res.status(500).json({ message: "internal server error" });
    console.log(err);
    next(err);
  }
};

exports.removePostById = async (req, res, next) => {
  const postId = req.params.id;
  console.log(postId);
  try {
    const postToDelete = await Post.findById(postId);
    if (!postToDelete) {
      const error = new Error("No post found");
      error.statusCode = 400;
      throw error;
    }
    await Post.findByIdAndDelete(postId);
    const user = await User.findById(req.user.id);
    user.posts.pull(postId);
    await user.save();
    res.status(200).json({ message: "post successfull deleted" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    //Check if Post exists before creating comment
    const post = await Post.findById(req.params.id);
    if (!post) {
      const error = new Error("No Post found");
      error.statusCode = 400;
      throw error;
    }
    // Is getting the postId and UserId safer than
    // getting them from the req.body?
    const comment = new Comment({
      comment: req.body.comment,
      code: req.body.code,
      post: req.params.id,
      creator: req.user.id
    });
    const newComment = await comment.save();
    post.comments.push(newComment);
    await post.save();
    console.log(newComment);
    res.status(201).json({ message: "Comment created", data: newComment });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
