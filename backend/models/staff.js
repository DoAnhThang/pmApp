const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const staffSchema = new Schema(
  {
    name: { type: String, required: true },
    dob: { type: String, required: true },
    phone_number: { type: String, required: true },
    level: { type: String, required: true },
    gender: { type: String, required: true },
    department: [
      { type: Schema.Types.ObjectId, required: true, ref: "Department" },
    ],
    tech_stacks: [
      {
        tech_stack_id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "TechStack",
        },
        exp: { type: String, required: true },
      },
    ],
    projects: [{ type: Schema.Types.ObjectId, required: true, ref: "Project" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
