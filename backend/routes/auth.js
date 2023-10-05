const express = require("express");
const { body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/auth", authController.getAuth);

router.post(
  "/signup",
  [
    body("username", "Tên người dùng phải có ít nhất 3 kí tự")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 3 }),
    body("email")
      .isEmail()
      .withMessage("Vui lòng nhập địa chỉ email hợp lệ")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-mail đã tồn tại, vui lòng đăng ký bằng e-mail khác"
            );
          }
        });
      }),
    body(
      "password",
      "Mật khẩu phải có ít nhất 8 kí tự bao gồm chữ, số và kí tự đặc biệt"
    )
      .trim()
      .isAlphanumeric()
      .isLength({ min: 8 }),
  ],
  authController.postSignup
);

router.post("/login", authController.postLogin);

router.post("/logout", authController.postLogout);

module.exports = router;
