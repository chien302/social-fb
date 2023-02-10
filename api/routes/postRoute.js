const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getAPost,
  getAllPostFollowing,
  getAllProfilePost,
} = require("../controllers/postController");
const { verifyToken } = require("../middleware.js/verifyToken");

const Router = express.Router();

Router.route("/").post(verifyToken, createPost);

Router.route("/:id").put(verifyToken, updatePost);
Router.route("/:id").delete(verifyToken, deletePost);
Router.route("/:id/like").put(verifyToken, likePost);
Router.route("/:id").get(getAPost);
Router.route("/timeline/all").get(verifyToken, getAllPostFollowing);
Router.route("/profile/:username").get(verifyToken, getAllProfilePost);

module.exports = Router;
