const express = require("express");

const managementController = require("../controllers/management");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// management CRUD: department
router.get("/department", isAuth, managementController.getDepartments);
router.post("/department", isAuth, managementController.postDepartment);
router.patch(
  "/department/:departmentId",
  isAuth,
  managementController.patchDepartment
);
router.delete(
  "/department/:departmentId",
  isAuth,
  managementController.deleteDepartment
);

// management CRUD: staff
router.get("/staff", isAuth, managementController.getStaffs);
router.post("/staff", isAuth, managementController.postStaff);
router.patch("/staff/:staffId", isAuth, managementController.patchStaff);
router.delete("/staff/:staffId", isAuth, managementController.deleteStaff);

// management CRUD: project
router.get("/project", isAuth, managementController.getProjects);
router.get(
  "/project/:projectId",
  isAuth,
  managementController.getProjectDetail
);
router.post("/project", isAuth, managementController.postProject);
router.patch("/project/:projectId", isAuth, managementController.patchProject);
router.delete(
  "/project/:projectId",
  isAuth,
  managementController.deleteProject
);

module.exports = router;
