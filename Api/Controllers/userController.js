const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};
exports.Register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameValid = await User.findOne({ username });
    if (usernameValid) {
      return res.json({ msg: "Username Already exists", status: false });
    }
    const emailValid = await User.findOne({ email });
    if (emailValid) {
      return res.json({ msg: "Email Already exists", status: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedpass,
    });

    const token = createToken(newUser._id);
    newUser.password = undefined;
    res.cookie("jwt", token, {
      secure:true,
      sameSite:'None',
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
      domain: 'https://master--talkify1.netlify.app/'
    });
    res.json({ status: true, newUser });
  } catch (err) {
    next(err);
  }
};
exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorrect username ", status: false });
    }
    const isvalidPassword = await bcrypt.compare(password, user.password);
    if (!isvalidPassword) {
      return res.json({ msg: "Incorrect  Password", status: false });
    }
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      secure:true,
      sameSite:'None',
      httpOnly: false,
      maxAge: maxAge * 1000,
      domain: 'https://master--talkify1.netlify.app/'
    });
    res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};
exports.updatePP = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        // profilePic:req
        $set: req.body,
      },
      { new: true }
    );
    res.json({ status: true, updatedUser });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.getAlluser = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "username",
      "email",
      "profilePic",
      "_id",
    ]);
    res.json(users);
  } catch (err) {
    next(err);
  }
};
exports.getSingleuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
