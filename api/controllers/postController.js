const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res, next) => {
  // const newPost = new Post(req.body);
  // return newPost
  //   .save(newPost)
  //   .then((savePost) => {
  //     return res.status(201).json({
  //       status: "success",
  //       data: { savePost },
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ err: "can not create post" });
  //   });
  // try {
  //   const savePost = await newPost.save();
  //   res.status(200).json({
  //     status: "success",
  //     data: { savePost },
  //   });
  // } catch (error) {
  //   res.status(500).json(error);
  // }
  const { userId, desc, img } = req.body;
  const savePost = new Post({ userId, desc, img });
  const newPost = await savePost.save();
  res.status(200).json({
    status: "success",
    data: { newPost },
  });
};

exports.updatePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  const { userId } = req.user;
  try {
    if (post.userId == userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json({
        status: "update success",
        data: { post },
      });
    } else {
      res.status(403).json({
        status: "you can update your post",
      });
    }
  } catch (error) {}
};
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const { userId } = req.user;
    if (post.userId == userId) {
      await post.deleteOne();
      res.status(200).json("delete post success");
    } else {
      res.status(403).json({
        status: "you can not delete your post",
      });
    }
  } catch (error) {}
};
exports.likePost = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json({
        status: "like success",
        data: { post },
      });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json({
        status: "dislike success",
        data: { post },
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (error) {}
};
exports.getAllPostFollowing = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    const userPost = await Post.find({ userId: user._id }).populate("userId");

    const friendsPost = await Promise.all(
      user.followings.map((friendId) => {
        return Post.find({ userId: friendId }).populate("userId");
      })
    );
    res.status(200).json({
      status: "success",
      data: {
        posts: userPost.concat(...friendsPost),
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllProfilePost = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json({
      status: "success",
      data: { posts },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
