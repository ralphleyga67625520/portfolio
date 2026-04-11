import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    companyUrl: { type: String },
    duration: { type: String, required: true },
    description: [{ type: String }],
    upcoming: { type: Boolean, default: false },
    accentColor: { type: String, default: "#3B82F6" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Experience ||
  mongoose.model("Experience", ExperienceSchema);
