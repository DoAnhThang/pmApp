const Project = require("../models/project");
const Staff = require("../models/staff");
const TechStack = require("../models/tech-stack");

// Statistic for ProjectQuantity page
exports.getProjectStatistic = async (req, res, next) => {
  try {
    // Đếm số lượng dự án theo mỗi trạng thái
    const results = await Project.aggregate([
      {
        $lookup: {
          from: "projectstatuses", // Tên collection "ProjectStatus"
          localField: "project_status",
          foreignField: "_id",
          as: "statusDetails",
        },
      },
      {
        $unwind: {
          path: "$statusDetails",
          preserveNullAndEmptyArrays: true, // Để giữ lại các project có project_status là []
        },
      },
      {
        $group: {
          _id: "$project_status",
          totalProjectStatus: { $sum: 1 },
          name: {
            $first: {
              $cond: [
                { $ifNull: ["$statusDetails.name", false] },
                "$statusDetails.name",
                "Unknown",
              ],
            },
          },
        },
      },
    ]);

    const projectStatistic = {
      totalProjects: 0,
      completedProjects: 0,
      inProgressProjects: 0,
      waitingProjects: 0,
      pendingProjects: 0,
      problematicProjects: 0,
    };

    results.forEach((result) => {
      const projectCount = result.totalProjectStatus;
      projectStatistic.totalProjects += projectCount;
      if (result.name === "Đã hoàn thành") {
        projectStatistic.completedProjects = projectCount;
      } else if (result.name === "Đang tiến hành") {
        projectStatistic.inProgressProjects = projectCount;
      } else if (result.name === "Chưa bắt đầu") {
        projectStatistic.waitingProjects = projectCount;
      } else if (result.name === "Đang chờ duyệt") {
        projectStatistic.pendingProjects = projectCount;
      } else if (result.name === "Gặp vấn đề" || result.name === "Unknown") {
        projectStatistic.problematicProjects += projectCount;
      }
    });

    res.status(200).json({ success: true, data: projectStatistic });
  } catch (err) {
    next(err);
  }
};
exports.getProjectTypeChart = async (req, res, next) => {
  try {
    // Đếm số lượng dự án theo mỗi loại dự án
    const results = await Project.aggregate([
      {
        $lookup: {
          from: "projecttypes", // Tên collection "ProjectType"
          localField: "project_type",
          foreignField: "_id",
          as: "typeDetails",
        },
      },
      {
        $unwind: {
          path: "$typeDetails",
          preserveNullAndEmptyArrays: true, // Để giữ lại các project có project_type là []
        },
      },
      {
        $group: {
          _id: "$project_type",
          totalProjectType: { $sum: 1 },
          name: {
            $first: {
              $cond: [
                { $ifNull: ["$typeDetails.name", false] },
                "$typeDetails.name",
                "Unknown",
              ],
            },
          },
        },
      },
    ]);
    const projectTypeChart = { labels: [], data: [] };
    results.forEach((result) => {
      projectTypeChart.labels.push(result.name);
      projectTypeChart.data.push(result.totalProjectType);
    });
    res.status(200).json({
      success: true,
      data: projectTypeChart,
    });
  } catch (err) {
    next(err);
  }
};
exports.getProjectTechStack = async (req, res, next) => {
  try {
    // Đếm số lượng dự án sử dụng mỗi tech stack
    const results = await TechStack.aggregate([
      {
        $lookup: {
          from: "projects", // Tên của collection Project
          localField: "_id",
          foreignField: "tech_stacks",
          as: "projects",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          count: { $size: "$projects" },
        },
      },
    ]);
    const projectTechStack = { labels: [], data: [] };
    results.forEach((result) => {
      projectTechStack.labels.push(result.name);
      projectTechStack.data.push(result.count);
    });
    res.status(200).json({
      success: true,
      data: projectTechStack,
    });
  } catch (err) {
    next(err);
  }
};

// Statistic for StaffQuantity page
exports.getStaffStatistic = async (req, res, next) => {
  try {
    // Đếm số lượng nhân viên theo mỗi level
    const results = await Staff.aggregate([
      {
        $group: {
          _id: "$level", // phải để là _id, ko đc thay đổi
          count: { $sum: 1 }, // Đếm số lượng nhân viên
        },
      },
    ]);
    const staffStatistic = {
      totalStaffs: 0,
      seniorStaffs: 0,
      middleStaffs: 0,
      juniorStaffs: 0,
      fresherStaffs: 0,
    };
    results.forEach((result) => {
      staffStatistic.totalStaffs += result.count;
      if (result._id === "Senior") {
        staffStatistic.seniorStaffs += result.count;
      } else if (result._id === "Middle") {
        staffStatistic.middleStaffs = result.count;
      } else if (result._id === "Junior") {
        staffStatistic.juniorStaffs = result.count;
      } else if (result._id === "Fresher") {
        staffStatistic.fresherStaffs = result.count;
      }
    });
    res.status(200).json({ success: true, data: staffStatistic });
  } catch (err) {
    next(err);
  }
};
exports.getStaffTechStack = async (req, res, next) => {
  try {
    // Đếm số lượng nhân viên sử dụng mỗi tech stack
    const results = await TechStack.aggregate([
      {
        $lookup: {
          from: "staffs", // Tên của collection Staff
          localField: "_id",
          foreignField: "tech_stacks.tech_stack_id",
          as: "staffs",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          count: { $size: "$staffs" },
        },
      },
    ]);
    const staffTechStack = { labels: [], data: [] };
    results.forEach((result) => {
      staffTechStack.labels.push(result.name);
      staffTechStack.data.push(result.count);
    });
    res.status(200).json({
      success: true,
      data: staffTechStack,
    });
  } catch (err) {
    next(err);
  }
};
exports.getStaffJoinProject = async (req, res, next) => {
  try {
    // Đếm xem mỗi nhân viên đã tham gia bao nhiêu dự án
    const results = await Staff.aggregate([
      {
        $lookup: {
          from: "projects", // Tên của collection Project
          localField: "_id",
          foreignField: "staffs",
          as: "projectCount",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          projectCount: { $size: "$projectCount" },
        },
      },
      {
        $group: {
          _id: "$projectCount",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const staffJoinProject = { labels: [], data: [] };
    results.forEach((result) => {
      staffJoinProject.labels.push(`Tham gia ${result._id}`);
      staffJoinProject.data.push(result.count);
    });
    res.status(200).json({
      success: true,
      data: staffJoinProject,
    });
  } catch (err) {
    next(err);
  }
};
