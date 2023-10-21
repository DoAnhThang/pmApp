const { validationResult } = require("express-validator");
const ProjectType = require("../models/project-type");
const ProjectStatus = require("../models/project-status");
const TechStack = require("../models/tech-stack");
const CustomerGroup = require("../models/customer-group");
const { paginateData } = require("../utilities/pagination");

// directory CRUD: Project Type
exports.getProjectTypes = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const result = await paginateData(ProjectType, page, pageSize);
    if (result.error) {
      return res.status(404).json({ msg: "Not found project types" });
    }
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
exports.postProjectType = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const priority = req.body.priority;
  const status = req.body.status;
  try {
    const projectType = new ProjectType({
      name: name,
      short_desc: short_desc,
      long_desc: long_desc,
      priority: priority,
      status: status,
    });
    await projectType.save();
    res.status(201).json({
      success: true,
      msg: "Created successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.patchProjectType = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

  const projectTypeId = req.params.projectTypeId;
  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const priority = req.body.priority;
  const status = req.body.status;
  try {
    const projectType = await ProjectType.findById(projectTypeId);
    if (!projectType) {
      return res.status(404).json({ errorMsg: "Not found the project type" });
    }
    projectType.name = name;
    projectType.short_desc = short_desc;
    projectType.long_desc = long_desc;
    projectType.priority = priority;
    projectType.status = status;
    await projectType.save();
    res.status(201).json({
      success: true,
      msg: "Updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteProjectType = async (req, res, next) => {
  const recordIds = req.body.ids;
  try {
    const result = await Promise.all(
      recordIds.map(async (id) => await ProjectType.findByIdAndRemove(id))
    );
    if (result.length === 0) {
      return res.status(404).json({ errorMsg: "Not found the record" });
    }
    res.status(200).json({ success: true, msg: "Deleted successfully!" });
  } catch (err) {
    next(err);
  }
};

// directory CRUD: Project Status
exports.getProjectStatuses = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const result = await paginateData(ProjectStatus, page, pageSize);
    if (result.error) {
      return res.status(404).json({ msg: "Not found project statuses" });
    }
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
exports.postProjectStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const status = req.body.status;
  try {
    const projectStatus = new ProjectStatus({
      name: name,
      short_desc: short_desc,
      long_desc: long_desc,
      status: status,
    });
    await projectStatus.save();
    res.status(201).json({
      success: true,
      msg: "Created successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.patchProjectStatus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

  const projectStatusId = req.params.projectStatusId;
  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const status = req.body.status;
  try {
    const projectStatus = await ProjectStatus.findById(projectStatusId);
    if (!projectStatus) {
      return res.status(404).json({ errorMsg: "Not found the project status" });
    }
    projectStatus.name = name;
    projectStatus.short_desc = short_desc;
    projectStatus.long_desc = long_desc;
    projectStatus.status = status;
    await projectStatus.save();
    res.status(201).json({
      success: true,
      msg: "Updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteProjectStatus = async (req, res, next) => {
  const recordIds = req.body.ids;
  try {
    const result = await Promise.all(
      recordIds.map(async (id) => await ProjectStatus.findByIdAndRemove(id))
    );
    if (result.length === 0) {
      return res.status(404).json({ errorMsg: "Not found the record" });
    }
    res.status(200).json({ success: true, msg: "Deleted successfully!" });
  } catch (err) {
    next(err);
  }
};

// directory CRUD: Tech Stack
exports.getTechStacks = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const result = await paginateData(TechStack, page, pageSize);
    if (result.error) {
      return res.status(404).json({ msg: "Not found tech stacks" });
    }
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
exports.postTechStack = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const status = req.body.status;
  try {
    const techStack = new TechStack({
      name: name,
      short_desc: short_desc,
      long_desc: long_desc,
      status: status,
    });
    await techStack.save();
    res.status(201).json({
      success: true,
      msg: "Created successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.patchTechStack = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

  const techStackId = req.params.techStackId;
  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const status = req.body.status;
  try {
    const techStack = await TechStack.findById(techStackId);
    if (!techStack) {
      return res.status(404).json({ errorMsg: "Not found the tech stack" });
    }
    techStack.name = name;
    techStack.short_desc = short_desc;
    techStack.long_desc = long_desc;
    techStack.status = status;
    await techStack.save();
    res.status(201).json({
      success: true,
      msg: "Updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteTechStack = async (req, res, next) => {
  const recordIds = req.body.ids;
  try {
    const result = await Promise.all(
      recordIds.map(async (id) => await TechStack.findByIdAndRemove(id))
    );
    if (result.length === 0) {
      return res.status(404).json({ errorMsg: "Not found the record" });
    }
    res.status(200).json({ success: true, msg: "Deleted successfully!" });
  } catch (err) {
    next(err);
  }
};

// directory CRUD: Customer Group
exports.getCustomerGroups = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const result = await paginateData(CustomerGroup, page, pageSize);
    if (result.error) {
      return res.status(404).json({ msg: "Not found customer groups" });
    }
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};
exports.postCustomerGroup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const priority = req.body.priority;
  const status = req.body.status;
  try {
    const customerGroup = new CustomerGroup({
      name: name,
      short_desc: short_desc,
      long_desc: long_desc,
      priority: priority,
      status: status,
    });
    await customerGroup.save();
    res.status(201).json({
      success: true,
      msg: "Created successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.patchCustomerGroup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorObj = errors.mapped();
    return res.status(400).json(errorObj);
  }

  const customerGroupId = req.params.customerGroupId;
  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const priority = req.body.priority;
  const status = req.body.status;
  try {
    const customerGroup = await CustomerGroup.findById(customerGroupId);
    if (!customerGroup) {
      return res.status(404).json({ errorMsg: "Not found the customer group" });
    }
    customerGroup.name = name;
    customerGroup.short_desc = short_desc;
    customerGroup.long_desc = long_desc;
    customerGroup.priority = priority;
    customerGroup.status = status;
    await customerGroup.save();
    res.status(201).json({
      success: true,
      msg: "Updated successfully!",
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteCustomerGroup = async (req, res, next) => {
  const recordIds = req.body.ids;
  try {
    const result = await Promise.all(
      recordIds.map(async (id) => await CustomerGroup.findByIdAndRemove(id))
    );
    if (result.length === 0) {
      return res.status(404).json({ errorMsg: "Not found the record" });
    }
    res.status(200).json({ success: true, msg: "Deleted successfully!" });
  } catch (err) {
    next(err);
  }
};
