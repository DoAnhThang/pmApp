const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String },
    project_type: [
      { type: Schema.Types.ObjectId, required: true, ref: "ProjectType" },
    ],
    project_status: [
      { type: Schema.Types.ObjectId, required: true, ref: "ProjectStatus" },
    ],
    customer_group: [
      { type: Schema.Types.ObjectId, required: true, ref: "CustomerGroup" },
    ],
    tech_stacks: [
      { type: Schema.Types.ObjectId, required: true, ref: "TechStack" },
    ],
    departments: [
      { type: Schema.Types.ObjectId, required: true, ref: "Department" },
    ],
    staffs: [{ type: Schema.Types.ObjectId, required: true, ref: "Staff" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
