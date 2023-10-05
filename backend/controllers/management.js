const mongoose = require("mongoose");
const Department = require("../models/department");
const Staff = require("../models/staff");
const Project = require("../models/project");

const updateDepartmentInProjects = async (departmentId, projectObjectIds) => {
  try {
    // Cập nhật các project chứa departmentId và xóa departmentId này khỏi departments
    await Project.updateMany(
      { departments: departmentId },
      { $pull: { departments: departmentId } }
    );
    // Thêm departmentId vào các project có id thuộc mảng projectObjectIds
    await Project.updateMany(
      { _id: { $in: projectObjectIds } },
      { $push: { departments: departmentId } }
    );
  } catch (error) {
    console.error(error);
  }
};
const updateDepartmentInStaffs = async (departmentId, staffObjectIds) => {
  try {
    await Staff.updateMany(
      { department: departmentId },
      { $pull: { department: departmentId } }
    );
    await Staff.updateMany(
      { _id: { $in: staffObjectIds } },
      { $push: { department: departmentId } }
    );
  } catch (error) {
    console.error(error);
  }
};
const updateStaffInDepartments = async (staffId, departmentObjectIds) => {
  try {
    await Department.updateMany(
      { staffs: staffId },
      { $pull: { staffs: staffId } }
    );
    await Department.updateMany(
      { _id: { $in: departmentObjectIds } },
      { $push: { staffs: staffId } }
    );
  } catch (error) {
    console.error(error);
  }
};
const updateStaffInProjects = async (staffId, projectObjectIds) => {
  try {
    await Project.updateMany(
      { staffs: staffId },
      { $pull: { staffs: staffId } }
    );
    await Project.updateMany(
      { _id: { $in: projectObjectIds } },
      { $push: { staffs: staffId } }
    );
  } catch (error) {
    console.error(error);
  }
};
const updateProjectInDepartments = async (projectId, departmentObjectIds) => {
  try {
    await Department.updateMany(
      { projects: projectId },
      { $pull: { projects: projectId } }
    );
    await Department.updateMany(
      { _id: { $in: departmentObjectIds } },
      { $push: { projects: projectId } }
    );
  } catch (error) {
    console.error(error);
  }
};
const updateProjectInStaffs = async (projectId, staffObjectIds) => {
  try {
    await Staff.updateMany(
      { projects: projectId },
      { $pull: { projects: projectId } }
    );
    await Staff.updateMany(
      { _id: { $in: staffObjectIds } },
      { $push: { projects: projectId } }
    );
  } catch (error) {
    console.error(error);
  }
};

// management CRUD: Departments
exports.getDepartments = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const totalDepartments = await Department.countDocuments();
    if (totalDepartments === 0) {
      return res.json({ msg: "Not found departments" });
    }
    if (page && pageSize) {
      const totalPages = Math.ceil(totalDepartments / pageSize);
      const paginatedData = await Department.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate("tech_stacks", "name")
        .populate("projects", "name")
        .populate("staffs", "name");
      res.status(200).json({
        success: true,
        data: paginatedData,
        currentPage: page,
        totalPages,
        totalDepartments,
      });
    } else {
      const departments = await Department.find({}, "_id name");
      res.status(200).json({ success: true, data: departments });
    }
  } catch (err) {
    next(err);
  }
};
exports.postDepartment = async (req, res, next) => {
  const name = req.body.name;
  const feature = req.body.feature;
  const tech_stacks = req.body.tech_stacks
    ? req.body.tech_stacks.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  const projects = req.body.projects
    ? req.body.projects.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  const staffs = req.body.staffs
    ? req.body.staffs.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  try {
    const department = new Department({
      name: name,
      feature: feature,
      tech_stacks: tech_stacks,
      projects: projects,
      staffs: staffs,
    });
    const newDepartment = await department.save();
    updateDepartmentInProjects(newDepartment._id, projects);
    updateDepartmentInStaffs(newDepartment._id, staffs);
    res.status(201).json({
      success: true,
      msg: "Created successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.patchDepartment = async (req, res, next) => {
  const departmentId = req.params.departmentId;
  const name = req.body.name;
  const feature = req.body.feature;
  const tech_stacks = req.body.tech_stacks
    ? req.body.tech_stacks.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  const projects = req.body.projects
    ? req.body.projects.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  const staffs = req.body.staffs
    ? req.body.staffs.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  try {
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(204).json({ errorMsg: "Not found the department" });
    }
    department.name = name;
    department.feature = feature;
    department.tech_stacks = tech_stacks;
    department.projects = projects;
    department.staffs = staffs;
    await department.save();
    updateDepartmentInProjects(departmentId, projects);
    updateDepartmentInStaffs(departmentId, staffs);
    res.status(201).json({
      success: true,
      msg: "Updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteDepartment = async (req, res, next) => {
  const departmentId = req.params.departmentId;
  try {
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(204).json({ errorMsg: "Not found the department" });
    }
    await Department.findByIdAndRemove(departmentId);
    await Project.updateMany(
      { departments: departmentId },
      { $pull: { departments: departmentId } }
    );
    await Staff.updateMany(
      { department: departmentId },
      { $pull: { department: departmentId } }
    );
    res.status(200).json({
      success: true,
      msg: "Deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// management CRUD: Staffs
exports.getStaffs = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const totalStaffs = await Staff.countDocuments();
    if (totalStaffs === 0) {
      return res.json({ msg: "Not found staffs" });
    }
    if (page && pageSize) {
      const totalPages = Math.ceil(totalStaffs / pageSize);
      const paginatedData = await Staff.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate("department", "name")
        .populate("tech_stacks.tech_stack_id", "name")
        .populate("projects", "name");
      res.status(200).json({
        success: true,
        data: paginatedData,
        currentPage: page,
        totalPages,
        totalStaffs,
      });
    } else {
      const staffs = await Staff.find({}, "_id name department");
      res.status(200).json({ success: true, data: staffs });
    }
  } catch (err) {
    next(err);
  }
};
exports.postStaff = async (req, res, next) => {
  const name = req.body.name;
  const dob = req.body.dob;
  const phone_number = req.body.phone_number;
  const level = req.body.level;
  const gender = req.body.gender;
  const department = req.body.department
    ? new mongoose.Types.ObjectId(req.body.department)
    : [];
  const tech_stacks = req.body.tech_stacks
    ? req.body.tech_stacks.map((item) => ({
        ...item,
        tech_stack_id: new mongoose.Types.ObjectId(item.tech_stack_id),
      }))
    : [];
  const projects = req.body.projects
    ? req.body.projects.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  try {
    const staff = new Staff({
      name: name,
      dob: dob,
      phone_number: phone_number,
      level: level,
      gender: gender,
      department: department,
      tech_stacks: tech_stacks,
      projects: projects,
    });
    const newStaff = await staff.save();
    updateStaffInDepartments(newStaff._id, department);
    updateStaffInProjects(newStaff._id, projects);
    res.status(201).json({
      success: true,
      msg: "Created successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.patchStaff = async (req, res, next) => {
  const staffId = req.params.staffId;
  const name = req.body.name;
  const dob = req.body.dob;
  const phone_number = req.body.phone_number;
  const level = req.body.level;
  const gender = req.body.gender;
  const department = req.body.department
    ? new mongoose.Types.ObjectId(req.body.department)
    : [];
  const tech_stacks = req.body.tech_stacks
    ? req.body.tech_stacks.map((item) => ({
        ...item,
        tech_stack_id: new mongoose.Types.ObjectId(item.tech_stack_id),
      }))
    : [];
  const projects = req.body.projects
    ? req.body.projects.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(204).json({ errorMsg: "Not found the staff" });
    }
    staff.name = name;
    staff.dob = dob;
    staff.phone_number = phone_number;
    staff.level = level;
    staff.gender = gender;
    staff.department = department;
    staff.tech_stacks = tech_stacks;
    staff.projects = projects;
    await staff.save();
    updateStaffInDepartments(staffId, department);
    updateStaffInProjects(staffId, projects);
    res.status(201).json({
      success: true,
      msg: "Updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteStaff = async (req, res, next) => {
  const staffId = req.params.staffId;
  try {
    const staff = await Staff.findById(staffId);
    if (!staff) {
      return res.status(204).json({ errorMsg: "Not found the staff" });
    }
    await Staff.findByIdAndRemove(staffId);
    await Department.updateMany(
      { staffs: staffId },
      { $pull: { staffs: staffId } }
    );
    await Project.updateMany(
      { staffs: staffId },
      { $pull: { staffs: staffId } }
    );
    res.status(200).json({
      success: true,
      msg: "Deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// management CRUD: Projects
exports.getProjects = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const totalProjects = await Project.countDocuments();
    if (totalProjects === 0) {
      return res.json({ msg: "Not found projects" });
    }
    if (page && pageSize) {
      const totalPages = Math.ceil(totalProjects / pageSize);
      const paginatedData = await Project.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate("project_type", "name")
        .populate("project_status", "name")
        .populate("customer_group", "name")
        .populate("tech_stacks", "name")
        .populate("departments", "name")
        .populate("staffs", "name");
      res.status(200).json({
        success: true,
        data: paginatedData,
        currentPage: page,
        totalPages,
        totalProjects,
      });
    } else {
      const projects = await Project.find({}, "_id name");
      res.status(200).json({ success: true, data: projects });
    }
  } catch (err) {
    next(err);
  }
};
exports.getProjectDetail = async (req, res, next) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId)
      .populate("project_type", "name")
      .populate("project_status", "name")
      .populate("customer_group", "name")
      .populate("tech_stacks", "name")
      .populate("departments", "name")
      .populate("staffs", "name");
    if (!project) {
      return res.status(204).json({ errorMsg: "Not found the project" });
    }
    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};
exports.postProject = async (req, res, next) => {
  const name = req.body.name;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const project_type = req.body.project_type
    ? new mongoose.Types.ObjectId(req.body.project_type)
    : [];
  const project_status = req.body.project_status
    ? new mongoose.Types.ObjectId(req.body.project_status)
    : [];
  const customer_group = req.body.customer_group
    ? new mongoose.Types.ObjectId(req.body.customer_group)
    : [];
  const tech_stacks = req.body.tech_stacks
    ? req.body.tech_stacks.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  const departments = req.body.departments
    ? req.body.departments.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  const staffs = req.body.staffs
    ? req.body.staffs.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  try {
    const project = new Project({
      name: name,
      startTime: startTime,
      endTime: endTime,
      project_type: project_type,
      project_status: project_status,
      customer_group: customer_group,
      tech_stacks: tech_stacks,
      departments: departments,
      staffs: staffs,
    });
    const newProject = await project.save();
    updateProjectInDepartments(newProject._id, departments);
    updateProjectInStaffs(newProject._id, staffs);
    res.status(201).json({
      success: true,
      msg: "Created successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.patchProject = async (req, res, next) => {
  const projectId = req.params.projectId;
  const name = req.body.name;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const project_type = req.body.project_type
    ? new mongoose.Types.ObjectId(req.body.project_type)
    : [];
  const project_status = req.body.project_status
    ? new mongoose.Types.ObjectId(req.body.project_status)
    : [];
  const customer_group = req.body.customer_group
    ? new mongoose.Types.ObjectId(req.body.customer_group)
    : [];
  const tech_stacks = req.body.tech_stacks
    ? req.body.tech_stacks.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  const departments = req.body.departments
    ? req.body.departments.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  const staffs = req.body.staffs
    ? req.body.staffs.map((item) => new mongoose.Types.ObjectId(item))
    : [];
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(204).json({ errorMsg: "Not found the project" });
    }
    project.name = name;
    project.startTime = startTime;
    project.endTime = endTime;
    project.project_type = project_type;
    project.project_status = project_status;
    project.customer_group = customer_group;
    project.tech_stacks = tech_stacks;
    project.departments = departments;
    project.staffs = staffs;
    await project.save();
    updateProjectInDepartments(projectId, departments);
    updateProjectInStaffs(projectId, staffs);
    res.status(201).json({
      success: true,
      msg: "Updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteProject = async (req, res, next) => {
  const projectId = req.params.projectId;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(204).json({ errorMsg: "Not found the project" });
    }
    await Project.findByIdAndRemove(projectId);
    await Department.updateMany(
      { projects: projectId },
      { $pull: { projects: projectId } }
    );
    await Staff.updateMany(
      { projects: projectId },
      { $pull: { projects: projectId } }
    );
    res.status(200).json({
      success: true,
      msg: "Deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
