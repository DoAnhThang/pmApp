const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const projectTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    short_desc: { type: String, required: true },
    long_desc: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectType", projectTypeSchema);
