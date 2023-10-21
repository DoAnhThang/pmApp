const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Department = require("../models/department");
const Staff = require("../models/staff");
const Project = require("../models/project");
const { paginateDataWithPopulate } = require("../utilities/pagination");
const {
  updateFieldInModel,
  removeDocumentAndUpdateModels,
} = require("../utilities/update-management");

// management CRUD: Departments
exports.getDepartments = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const populateOptions = [
      { path: "tech_stacks", select: "name" },
      { path: "projects", select: "name" },
      { path: "staffs", select: "name" },
    ];
    const result = await paginateDataWithPopulate(
      Department,
      page,
      pageSize,
      populateOptions,
      "_id name"
    );
    res.status(result.msg ? 204 : 200).json(result);
  } catch (err) {
    next(err);
  }
};
exports.postDepartment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

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
    updateFieldInModel("departments", Project, newDepartment._id, projects);
    updateFieldInModel("department", Staff, newDepartment._id, staffs);
    res.status(201).json({
      success: true,
      msg: "Created successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.patchDepartment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

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
    updateFieldInModel("departments", Project, departmentId, projects);
    updateFieldInModel("department", Staff, departmentId, staffs);
    res.status(201).json({
      success: true,
      msg: "Updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteDepartment = async (req, res, next) => {
  const recordIds = req.body.ids;
  try {
    const modelsNeedUpdateField = [
      { model: Staff, field: "department" },
      { model: Project, field: "departments" },
    ];
    const result = await Promise.all(
      recordIds.map(
        async (id) =>
          await removeDocumentAndUpdateModels(
            Department,
            id,
            modelsNeedUpdateField
          )
      )
    );
    res.status(result[0].errorMsg ? 404 : 200).json(result[0]);
  } catch (error) {
    next(error);
  }
};

// management CRUD: Staffs
exports.getStaffs = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const populateOptions = [
      { path: "department", select: "name" },
      { path: "tech_stacks.tech_stack_id", select: "name" },
      { path: "projects", select: "name" },
    ];
    const result = await paginateDataWithPopulate(
      Staff,
      page,
      pageSize,
      populateOptions,
      "_id name department"
    );
    res.status(result.msg ? 204 : 200).json(result);
  } catch (err) {
    next(err);
  }
};
exports.postStaff = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

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
    updateFieldInModel("staffs", Department, newStaff._id, department);
    updateFieldInModel("staffs", Project, newStaff._id, projects);
    res.status(201).json({
      success: true,
      msg: "Created successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.patchStaff = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

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
    updateFieldInModel("staffs", Department, staffId, department);
    updateFieldInModel("staffs", Project, staffId, projects);
    res.status(201).json({
      success: true,
      msg: "Updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteStaff = async (req, res, next) => {
  const recordIds = req.body.ids;
  try {
    const modelsNeedUpdateField = [
      { model: Department, field: "staffs" },
      { model: Project, field: "staffs" },
    ];
    const result = await Promise.all(
      recordIds.map(
        async (id) =>
          await removeDocumentAndUpdateModels(Staff, id, modelsNeedUpdateField)
      )
    );
    res.status(result[0].errorMsg ? 404 : 200).json(result[0]);
  } catch (err) {
    next(err);
  }
};

// management CRUD: Projects
exports.getProjects = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const populateOptions = [
      { path: "project_type", select: "name" },
      { path: "project_status", select: "name" },
      { path: "customer_group", select: "name" },
      { path: "tech_stacks", select: "name" },
      { path: "departments", select: "name" },
      { path: "staffs", select: "name" },
    ];
    const result = await paginateDataWithPopulate(
      Project,
      page,
      pageSize,
      populateOptions,
      "_id name"
    );
    res.status(result.msg ? 204 : 200).json(result);
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

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
    updateFieldInModel("projects", Department, newProject._id, departments);
    updateFieldInModel("projects", Staff, newProject._id, staffs);
    res.status(201).json({
      success: true,
      msg: "Created successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.patchProject = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

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
    updateFieldInModel("projects", Department, projectId, departments);
    updateFieldInModel("projects", Staff, projectId, staffs);
    res.status(201).json({
      success: true,
      msg: "Updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteProject = async (req, res, next) => {
  const recordIds = req.body.ids;
  try {
    const modelsNeedUpdateField = [
      { model: Department, field: "projects" },
      { model: Staff, field: "projects" },
    ];
    const result = await Promise.all(
      recordIds.map(
        async (id) =>
          await removeDocumentAndUpdateModels(
            Project,
            id,
            modelsNeedUpdateField
          )
      )
    );
    res.status(result[0].errorMsg ? 404 : 200).json(result[0]);
  } catch (err) {
    next(err);
  }
};
