const User = require("../models/User");

exports.updateUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    if (userId == req.params.id || req.body.isAdmin) {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({
        status: "success",
        data: { user },
      });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    if (userId == req.params.id || req.body.isAdmin) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "delete user success",
      });
    }
  } catch (error) {
    res.json({ error: error });
  }
};
exports.getAUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.json({ error: error });
  }
};

// get all accounts user
exports.getAllAccountUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.find({ _id: { $ne: userId } }).select([
      "username",
      "profilePicture",
      "_id",
      "followings",
    ]);

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.json({ error: error });
  }
};

//get friends
exports.getFollowingUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });

    res.status(200).json({
      status: "success",
      data: friendList,
    });
  } catch (error) {
    res.json({ error: error });
  }
};
exports.getProfileUser = async (req, res, next) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username });
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    res.json({ error: error });
  }
};
exports.followAUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    if (userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(userId);
        if (!user.followers.includes(userId)) {
          await user.updateOne({ $push: { followers: userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json({
            status: "success",
            data: { currentUser },
          });
        } else {
          res.status(403).json("you already follow this user");
        }
      } catch (error) {}
    } else {
      res.status(403).json("you can not follow myself");
    }
  } catch (error) {
    res.json({ error: error });
  }
};
exports.unfollowAUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    if (userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(userId);
        if (user.followers.includes(userId)) {
          await user.updateOne({ $pull: { followers: userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json({
            status: "success",
            data: { currentUser },
          });
        } else {
          res.status(403).json("you do not follow this user");
        }
      } catch (error) {}
    } else {
      res.status(403).json("you can not follow myself");
    }
  } catch (error) {
    res.json({ error: error });
  }
};

exports.searchUser = async (req, res, next) => {
  try {
    const searchText = req.query.name;

    const searchUser = await User.find({
      username: { $regex: searchText, $options: "$i" },
    });
    if (searchUser && searchUser.length > 0) {
      res.status(200).json({
        status: "success",
        data: { searchUser },
      });
    } else {
      res.status(404).json({
        status: "notfound",
        data: { text: "Not found user" },
      });
    }
  } catch (error) {
    res.json({ error: error });
  }
};
