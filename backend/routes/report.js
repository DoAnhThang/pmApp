const express = require("express");

const isAuth = require("../middleware/is-auth");
const reportController = require("../controllers/report");

const router = express.Router();

// Project Quantity
router.get("/project-statistic", isAuth, reportController.getProjectStatistic);
router.get("/project-type-chart", isAuth, reportController.getProjectTypeChart);
router.get("/project-tech-stack", isAuth, reportController.getProjectTechStack);

// Staff Quantity
router.get("/staff-statistic", isAuth, reportController.getStaffStatistic);
router.get("/staff-tech-stack", isAuth, reportController.getStaffTechStack);
router.get("/staff-join-project", isAuth, reportController.getStaffJoinProject);

module.exports = router;
