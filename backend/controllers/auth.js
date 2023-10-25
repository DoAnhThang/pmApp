const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.getAuth = async (req, res, next) => {
  if (!req.session.isAuthenticated || !req.session.user) {
    return res.status(401).json({
      isAuth: false,
      msg: "Phiên cũ đã kết thúc, vui lòng đăng nhập lại",
    });
  }
  try {
    const user = await User.findById(req.session.user._id);
    if (!user) {
      return res.status(404).json({
        email: { msg: "Tài khoản không tồn tại hoặc đã bị thay đổi" },
      });
    }
    return res.status(200).json({
      isAuth: true,
      username: user.username,
    });
  } catch (error) {
    next(error);
  }
};

exports.postSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

  const username = req.body.username
    .toLowerCase()
    .replace(/./, (str) => str.toUpperCase());
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  const agreement = req.body.agreement;

  if (passwordConfirm !== password)
    return res.status(400).json({
      passwordConfirm: { msg: "Mật khẩu xác nhận không khớp" },
    });
  if (agreement === false)
    return res.status(400).json({
      agreement: { msg: "Vui lòng đồng ý với các điều khoản và điều kiện" },
    });

  try {
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      username: username,
      email: email,
      password: hashedPw,
    });
    await user.save();
    res.status(201).json({
      success: true,
      msg: "Đăng ký tài khoản thành công",
    });
  } catch (error) {
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        email: { msg: "E-mail không chính xác hoặc chưa được đăng ký" },
      });
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res
        .status(401)
        .json({ password: { msg: "Mật khẩu không chính xác" } });
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );
    req.session.token = token;
    req.session.isAuthenticated = true;
    req.session.user = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };

    return req.session.save((err) => {
      console.log("login err: ", err);
      res.status(200).json({
        msg: "Đăng nhập thành công",
        isAuth: req.session.isAuthenticated,
        username: req.session.user.username,
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log("logout err: ", err);
    res.status(200).json({ success: true, msg: "Đăng xuất thành công" });
  });
};
