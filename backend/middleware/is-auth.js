const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.session.token;
  const verifyToken = jwt.decode(token, process.env.TOKEN_SECRET_KEY);

  if (!verifyToken) {
    return res.status(401).json({
      isAuth: false,
      msg: "Phiên cũ đã kết thúc, vui lòng đăng nhập lại",
    });
  }
  next();
};
