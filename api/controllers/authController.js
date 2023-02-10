const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.register = async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    const filter = { email: req.body.email };
    const update = {
      desc: "",
      city: "",
      from: "",
      relationship: 0,
    };
    user = await User.findOneAndUpdate(filter, update, { new: true });
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);

    res.status(200).json({
      status: "success",
      data: { token, userName: user.username, user },
    });

    // const newUser = new User({
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: req.body.password,
    // });
    // const user = await newUser.save();
    // res.status(200).json({ user });
  } catch (error) {
    res.json(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      //email is not correct
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
      res.status(200).json({
        status: "success",
        data: { token, userName: user.username, followings: user.followings },
      });
    } else {
      //password is not correct
    }
  } catch (error) {}
};
