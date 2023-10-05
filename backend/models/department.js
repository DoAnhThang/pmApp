const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const departmentSchema = new Schema(
  {
    name: { type: String, required: true },
    feature: { type: String, required: true },
    tech_stacks: [
      { type: Schema.Types.ObjectId, required: true, ref: "TechStack" },
    ],
    projects: [{ type: Schema.Types.ObjectId, required: true, ref: "Project" }],
    staffs: [{ type: Schema.Types.ObjectId, required: true, ref: "Staff" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
