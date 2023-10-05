module.exports = (req, res, next) => {
  if (!req.session.isAuthenticated || !req.session.user) {
    return res
      .status(503)
      .json({
        isAuth: false,
        msg: "Phiên cũ đã kết thúc, vui lòng đăng nhập lại",
      });
  }
  next();
};
