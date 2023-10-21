const express = require("express");
const { body } = require("express-validator");

const managementController = require("../controllers/management");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// management CRUD: department
router.get("/department", isAuth, managementController.getDepartments);
router.post(
  "/department",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên bộ phận, phòng ban không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên bộ phận, phòng ban phải có ít nhất 2 kí tự"),
    body("feature")
      .notEmpty()
      .withMessage("Chức năng, nhiệm vụ không được bỏ trống"),
  ],
  isAuth,
  managementController.postDepartment
);
router.patch(
  "/department/:departmentId",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên bộ phận, phòng ban không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên bộ phận, phòng ban phải có ít nhất 2 kí tự"),
    body("feature")
      .notEmpty()
      .withMessage("Chức năng, nhiệm vụ không được bỏ trống"),
  ],
  isAuth,
  managementController.patchDepartment
);
router.delete("/department", isAuth, managementController.deleteDepartment);

// management CRUD: staff
router.get("/staff", isAuth, managementController.getStaffs);
router.post(
  "/staff",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên nhân viên không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên nhân viên phải có ít nhất 2 kí tự"),
    body("phone_number")
      .notEmpty()
      .withMessage("Số điện thoại không được bỏ trống")
      .isLength({ min: 10, max: 12 })
      .withMessage(
        "Số điện thoại phải có ít nhất 10 kí tự và không quá 12 kí tự"
      ),
    body("level").notEmpty().withMessage("Level không được bỏ trống"),
    body("gender").notEmpty().withMessage("Giới tính không được bỏ trống"),
    body("dob").notEmpty().withMessage("Ngày sinh không được bỏ trống"),
  ],
  isAuth,
  managementController.postStaff
);
router.patch(
  "/staff/:staffId",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên nhân viên không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên nhân viên phải có ít nhất 2 kí tự"),
    body("phone_number")
      .notEmpty()
      .withMessage("Số điện thoại không được bỏ trống")
      .isLength({ min: 10, max: 12 })
      .withMessage(
        "Số điện thoại phải có ít nhất 10 kí tự và không quá 12 kí tự"
      ),
    body("level").notEmpty().withMessage("Level không được bỏ trống"),
    body("gender").notEmpty().withMessage("Giới tính không được bỏ trống"),
    body("dob").notEmpty().withMessage("Ngày sinh không được bỏ trống"),
  ],
  isAuth,
  managementController.patchStaff
);
router.delete("/staff", isAuth, managementController.deleteStaff);

// management CRUD: project
router.get("/project", isAuth, managementController.getProjects);
router.get(
  "/project/:projectId",
  isAuth,
  managementController.getProjectDetail
);
router.post(
  "/project",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên dự án không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên dự án phải có ít nhất 2 kí tự"),
    body("startTime")
      .notEmpty()
      .withMessage("Ngày bắt đầu không được bỏ trống"),
    body("endTime").notEmpty().withMessage("Ngày kết thúc không được bỏ trống"),
  ],
  isAuth,
  managementController.postProject
);
router.patch(
  "/project/:projectId",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên dự án không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên dự án phải có ít nhất 2 kí tự"),
    body("startTime")
      .notEmpty()
      .withMessage("Ngày bắt đầu không được bỏ trống"),
    body("endTime").notEmpty().withMessage("Ngày kết thúc không được bỏ trống"),
  ],
  isAuth,
  managementController.patchProject
);
router.delete("/project", isAuth, managementController.deleteProject);

module.exports = router;
