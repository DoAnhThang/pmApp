const express = require("express");

const directoryController = require("../controllers/directory");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// directory CRUD: Project Type
router.get("/project-type", isAuth, directoryController.getProjectTypes);
router.post("/project-type", isAuth, directoryController.postProjectType);
router.patch(
  "/project-type/:projectTypeId",
  isAuth,
  directoryController.patchProjectType
);
router.delete(
  "/project-type/:projectTypeId",
  isAuth,
  directoryController.deleteProjectType
);

// directory CRUD: Project Status
router.get("/project-status", isAuth, directoryController.getProjectStatuses);
router.post("/project-status", isAuth, directoryController.postProjectStatus);
router.patch(
  "/project-status/:projectStatusId",
  isAuth,
  directoryController.patchProjectStatus
);
router.delete(
  "/project-status/:projectStatusId",
  isAuth,
  directoryController.deleteProjectStatus
);

// directory CRUD: Tech Stack
router.get("/tech-stack", isAuth, directoryController.getTechStacks);
router.post("/tech-stack", isAuth, directoryController.postTechStack);
router.patch(
  "/tech-stack/:techStackId",
  isAuth,
  directoryController.patchTechStack
);
router.delete(
  "/tech-stack/:techStackId",
  isAuth,
  directoryController.deleteTechStack
);

// directory CRUD: Customer Group
router.get("/customer-group", isAuth, directoryController.getCustomerGroups);
router.post("/customer-group", isAuth, directoryController.postCustomerGroup);
router.patch(
  "/customer-group/:customerGroupId",
  isAuth,
  directoryController.patchCustomerGroup
);
router.delete(
  "/customer-group/:customerGroupId",
  isAuth,
  directoryController.deleteCustomerGroup
);

module.exports = router;
