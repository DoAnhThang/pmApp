const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.session.token;

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
  } catch (error) {
    next(error);
  }

  if (!decodedToken) {
    return res.status(401).json({
      isAuth: false,
      msg: "Not Authenticated",
    });
  }
  req.userId = decodedToken.userId;
  next();
};
