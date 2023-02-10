const express = require("express");
const {
  updateUser,
  deleteUser,
  getAUser,
  getAllAccountUser,
  getFollowingUser,
  getProfileUser,
  followAUser,
  unfollowAUser,
  searchUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware.js/verifyToken");
const Router = express.Router();

Router.route("/search").get(verifyToken, searchUser);
Router.route("/:id").put(verifyToken, updateUser);
Router.route("/:id").delete(verifyToken, deleteUser);
Router.route("/:username").get(verifyToken, getProfileUser);
Router.route("/:id").get(verifyToken, getAUser);
Router.route("/").get(verifyToken, getAllAccountUser);
Router.route("/friends/:userId").get(verifyToken, getFollowingUser);
Router.route("/:id/follow").put(verifyToken, followAUser);
Router.route("/:id/unfollow").put(verifyToken, unfollowAUser);

module.exports = Router;
