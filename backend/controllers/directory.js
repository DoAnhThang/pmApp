const ProjectType = require("../models/project-type");
const ProjectStatus = require("../models/project-status");
const TechStack = require("../models/tech-stack");
const CustomerGroup = require("../models/customer-group");

// directory CRUD: Project Type
exports.getProjectTypes = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const totalProjectTypes = await ProjectType.countDocuments();
    if (totalProjectTypes === 0) {
      return res.json({ msg: "Not found project types" });
    }
    if (page && pageSize) {
      const totalPages = Math.ceil(totalProjectTypes / pageSize);
      const paginatedData = await ProjectType.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      res.status(200).json({
        success: true,
        data: paginatedData,
        currentPage: page,
        totalPages,
        totalProjectTypes,
      });
    } else {
      const projectTypes = await ProjectType.find({}, "_id name");
      res.status(200).json({ success: true, data: projectTypes });
    }
  } catch (err) {
    next(err);
  }
};
exports.postProjectType = async (req, res, next) => {
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
  const projectTypeId = req.params.projectTypeId;
  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const priority = req.body.priority;
  const status = req.body.status;
  try {
    const projectType = await ProjectType.findById(projectTypeId);
    if (!projectType) {
      return res.status(204).json({ errorMsg: "Not found the project type" });
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
  const projectTypeId = req.params.projectTypeId;
  try {
    const projectType = await ProjectType.findById(projectTypeId);
    if (!projectType) {
      return res.status(204).json({ errorMsg: "Not found the project type" });
    }
    await ProjectType.findByIdAndRemove(projectTypeId);
    res.status(200).json({
      success: true,
      msg: "Deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// directory CRUD: Project Status
exports.getProjectStatuses = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const totalProjectStatuses = await ProjectStatus.countDocuments();
    if (totalProjectStatuses === 0) {
      return res.json({ msg: "Not found project statuses" });
    }
    if (page && pageSize) {
      const totalPages = Math.ceil(totalProjectStatuses / pageSize);
      const paginatedData = await ProjectStatus.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      res.status(200).json({
        success: true,
        data: paginatedData,
        currentPage: page,
        totalPages,
        totalProjectStatuses,
      });
    } else {
      const projectStatuses = await ProjectStatus.find({}, "_id name");
      res.status(200).json({ success: true, data: projectStatuses });
    }
  } catch (err) {
    next(err);
  }
};
exports.postProjectStatus = async (req, res, next) => {
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
  const projectStatusId = req.params.projectStatusId;
  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const status = req.body.status;
  try {
    const projectStatus = await ProjectStatus.findById(projectStatusId);
    if (!projectStatus) {
      return res.status(204).json({ errorMsg: "Not found the project status" });
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
  const projectStatusId = req.params.projectStatusId;
  try {
    const projectStatus = await ProjectStatus.findById(projectStatusId);
    if (!projectStatus) {
      return res.status(204).json({ errorMsg: "Not found the project status" });
    }
    await ProjectStatus.findByIdAndRemove(projectStatusId);
    res.status(200).json({
      success: true,
      msg: "Deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// directory CRUD: Tech Stack
exports.getTechStacks = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const totalTechStacks = await TechStack.countDocuments();
    if (totalTechStacks === 0) {
      return res.json({ msg: "Not found tech stacks" });
    }
    if (page && pageSize) {
      const totalPages = Math.ceil(totalTechStacks / pageSize);
      const paginatedData = await TechStack.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      res.status(200).json({
        success: true,
        data: paginatedData,
        currentPage: page,
        totalPages,
        totalTechStacks,
      });
    } else {
      const techStacks = await TechStack.find({}, "_id name");
      res.status(200).json({ success: true, data: techStacks });
    }
  } catch (err) {
    next(err);
  }
};
exports.postTechStack = async (req, res, next) => {
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
  const techStackId = req.params.techStackId;
  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const status = req.body.status;
  try {
    const techStack = await TechStack.findById(techStackId);
    if (!techStack) {
      return res.status(204).json({ errorMsg: "Not found the tech stack" });
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
  const techStackId = req.params.techStackId;
  try {
    const techStack = await TechStack.findById(techStackId);
    if (!techStack) {
      return res.status(204).json({ errorMsg: "Not found the tech stack" });
    }
    await TechStack.findByIdAndRemove(techStackId);
    res.status(200).json({
      success: true,
      msg: "Deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// directory CRUD: Customer Group
exports.getCustomerGroups = async (req, res, next) => {
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  try {
    const totalCustomerGroups = await CustomerGroup.countDocuments();
    if (totalCustomerGroups === 0) {
      return res.json({ msg: "Not found customer groups" });
    }
    if (page && pageSize) {
      const totalPages = Math.ceil(totalCustomerGroups / pageSize);
      const paginatedData = await CustomerGroup.find()
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      res.status(200).json({
        success: true,
        data: paginatedData,
        currentPage: page,
        totalPages,
        totalCustomerGroups,
      });
    } else {
      const customerGroups = await CustomerGroup.find({}, "_id name");
      res.status(200).json({ success: true, data: customerGroups });
    }
  } catch (err) {
    next(err);
  }
};
exports.postCustomerGroup = async (req, res, next) => {
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
  const customerGroupId = req.params.customerGroupId;
  const name = req.body.name;
  const short_desc = req.body.short_desc;
  const long_desc = req.body.long_desc;
  const priority = req.body.priority;
  const status = req.body.status;
  try {
    const customerGroup = await CustomerGroup.findById(customerGroupId);
    if (!customerGroup) {
      return res.status(204).json({ errorMsg: "Not found the customer group" });
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
  const customerGroupId = req.params.customerGroupId;
  try {
    const customerGroup = await CustomerGroup.findById(customerGroupId);
    if (!customerGroup) {
      return res.status(204).json({ errorMsg: "Not found the customer group" });
    }
    await CustomerGroup.findByIdAndRemove(customerGroupId);
    res.status(200).json({
      success: true,
      msg: "Deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};
