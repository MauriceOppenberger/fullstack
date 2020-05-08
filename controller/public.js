const Post = require("../models/post");
const Comment = require("../models/comment");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()

      .populate({ path: "creator", select: "firstName lastName" })
      .sort({ createdAt: -1 });
    if (!posts) {
      const error = new Error("No public posts found");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json({
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId).populate({
      path: "creator",
      select: "firstName lastName",
    });
    if (!post) {
      const error = new Error("no post found");
      error.statusCode = 400;
      throw error;
    }
    // if (post.creator._id.toString() !== req.user.id.toString()) {
    //   const error = new Error("no allowed to view this post");
    //   error.statusCode = 403;
    //   throw error;
    // }
    res.status(200).json({ post: post });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getCommentById = async (req, res, next) => {
  const commentId = req.params.id;
  try {
    const comment = await Comment.findById(commentId).populate({
      path: "creator",
      select: "firstName lastName",
    });
    if (!comment) {
      const error = new Error("No Comment found");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({ data: comment });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
