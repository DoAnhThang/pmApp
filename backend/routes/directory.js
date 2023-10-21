const express = require("express");
const { body } = require("express-validator");

const directoryController = require("../controllers/directory");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// directory CRUD: Project Type
router.get("/project-type", isAuth, directoryController.getProjectTypes);
router.post(
  "/project-type",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên loại dự án không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên loại dự án phải có ít nhất 2 kí tự"),
    body(
      "short_desc",
      "Mô tả ngắn về loại dự án không được bỏ trống"
    ).notEmpty(),
    body(
      "long_desc",
      "Mô tả đầy đủ về loại dự án không được bỏ trống"
    ).notEmpty(),
    body("priority")
      .notEmpty()
      .withMessage("Hãy chọn một mức độ ưu tiên trong khoảng từ 1 đến 4")
      .custom((value) => {
        if (Number(value) < 1 || Number(value) > 4) {
          throw new Error("Mức độ ưu tiên phải nằm trong khoảng từ 1 đến 4");
        }
        return true;
      }),
    body("status", "Hãy chọn một trạng thái").notEmpty(),
  ],
  isAuth,
  directoryController.postProjectType
);
router.patch(
  "/project-type/:projectTypeId",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên loại dự án không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên loại dự án phải có ít nhất 2 kí tự"),
    body(
      "short_desc",
      "Mô tả ngắn về loại dự án không được bỏ trống"
    ).notEmpty(),
    body(
      "long_desc",
      "Mô tả đầy đủ về loại dự án không được bỏ trống"
    ).notEmpty(),
    body("priority")
      .notEmpty()
      .withMessage("Hãy chọn một mức độ ưu tiên trong khoảng từ 1 đến 4")
      .custom((value) => {
        if (Number(value) < 1 || Number(value) > 4) {
          throw new Error("Mức độ ưu tiên phải nằm trong khoảng từ 1 đến 4");
        }
        return true;
      }),
    body("status", "Hãy chọn một trạng thái").notEmpty(),
  ],
  isAuth,
  directoryController.patchProjectType
);
router.delete("/project-type", isAuth, directoryController.deleteProjectType);

// directory CRUD: Project Status
router.get("/project-status", isAuth, directoryController.getProjectStatuses);
router.post(
  "/project-status",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên loại dự án không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên loại dự án phải có ít nhất 2 kí tự"),
    body(
      "short_desc",
      "Mô tả ngắn về loại dự án không được bỏ trống"
    ).notEmpty(),
    body(
      "long_desc",
      "Mô tả đầy đủ về loại dự án không được bỏ trống"
    ).notEmpty(),
    body("status", "Hãy chọn một trạng thái").notEmpty(),
  ],
  isAuth,
  directoryController.postProjectStatus
);
router.patch(
  "/project-status/:projectStatusId",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên loại dự án không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên loại dự án phải có ít nhất 2 kí tự"),
    body(
      "short_desc",
      "Mô tả ngắn về loại dự án không được bỏ trống"
    ).notEmpty(),
    body(
      "long_desc",
      "Mô tả đầy đủ về loại dự án không được bỏ trống"
    ).notEmpty(),
    body("status", "Hãy chọn một trạng thái").notEmpty(),
  ],
  isAuth,
  directoryController.patchProjectStatus
);
router.delete(
  "/project-status",
  isAuth,
  directoryController.deleteProjectStatus
);

// directory CRUD: Tech Stack
router.get("/tech-stack", isAuth, directoryController.getTechStacks);
router.post(
  "/tech-stack",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên loại dự án không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên loại dự án phải có ít nhất 2 kí tự"),
    body(
      "short_desc",
      "Mô tả ngắn về loại dự án không được bỏ trống"
    ).notEmpty(),
    body(
      "long_desc",
      "Mô tả đầy đủ về loại dự án không được bỏ trống"
    ).notEmpty(),
    body("status", "Hãy chọn một trạng thái").notEmpty(),
  ],
  isAuth,
  directoryController.postTechStack
);
router.patch(
  "/tech-stack/:techStackId",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên loại dự án không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên loại dự án phải có ít nhất 2 kí tự"),
    body(
      "short_desc",
      "Mô tả ngắn về loại dự án không được bỏ trống"
    ).notEmpty(),
    body(
      "long_desc",
      "Mô tả đầy đủ về loại dự án không được bỏ trống"
    ).notEmpty(),
    body("status", "Hãy chọn một trạng thái").notEmpty(),
  ],
  isAuth,
  directoryController.patchTechStack
);
router.delete("/tech-stack", isAuth, directoryController.deleteTechStack);

// directory CRUD: Customer Group
router.get("/customer-group", isAuth, directoryController.getCustomerGroups);
router.post(
  "/customer-group",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên loại dự án không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên loại dự án phải có ít nhất 2 kí tự"),
    body(
      "short_desc",
      "Mô tả ngắn về loại dự án không được bỏ trống"
    ).notEmpty(),
    body(
      "long_desc",
      "Mô tả đầy đủ về loại dự án không được bỏ trống"
    ).notEmpty(),
    body("priority")
      .notEmpty()
      .withMessage("Hãy chọn một mức độ ưu tiên trong khoảng từ 1 đến 4")
      .custom((value) => {
        if (Number(value) < 1 || Number(value) > 4) {
          throw new Error("Mức độ ưu tiên phải nằm trong khoảng từ 1 đến 4");
        }
        return true;
      }),
    body("status", "Hãy chọn một trạng thái").notEmpty(),
  ],
  isAuth,
  directoryController.postCustomerGroup
);
router.patch(
  "/customer-group/:customerGroupId",
  [
    body("name")
      .notEmpty()
      .withMessage("Tên loại dự án không được bỏ trống")
      .isLength({ min: 2 })
      .withMessage("Tên loại dự án phải có ít nhất 2 kí tự"),
    body(
      "short_desc",
      "Mô tả ngắn về loại dự án không được bỏ trống"
    ).notEmpty(),
    body(
      "long_desc",
      "Mô tả đầy đủ về loại dự án không được bỏ trống"
    ).notEmpty(),
    body("priority")
      .notEmpty()
      .withMessage("Hãy chọn một mức độ ưu tiên trong khoảng từ 1 đến 4")
      .custom((value) => {
        if (Number(value) < 1 || Number(value) > 4) {
          throw new Error("Mức độ ưu tiên phải nằm trong khoảng từ 1 đến 4");
        }
        return true;
      }),
    body("status", "Hãy chọn một trạng thái").notEmpty(),
  ],
  isAuth,
  directoryController.patchCustomerGroup
);
router.delete(
  "/customer-group",
  isAuth,
  directoryController.deleteCustomerGroup
);

module.exports = router;
