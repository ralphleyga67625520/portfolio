import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkill {
  name: string;
  iconKey: string; // key into the Icons map (e.g. "react", "typescript")
}

export interface ISkillCategory extends Document {
  title: string;
  categoryIconKey: string; // lucide icon name: "Code2", "Monitor", etc.
  color: string;
  gradientFrom: string;
  gradientTo: string;
  gradientColor: string;
  span: string;
  skills: ISkill[];
  order: number;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    iconKey: { type: String, required: true },
  },
  { _id: false }
);

const SkillCategorySchema = new Schema<ISkillCategory>(
  {
    title: { type: String, required: true },
    categoryIconKey: { type: String, required: true },
    color: { type: String, required: true },
    gradientFrom: { type: String, required: true },
    gradientTo: { type: String, required: true },
    gradientColor: { type: String, required: true },
    span: { type: String, default: "col-span-3 lg:col-span-1" },
    skills: [SkillSchema],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const SkillCategory: Model<ISkillCategory> =
  mongoose.models.SkillCategory ||
  mongoose.model<ISkillCategory>("SkillCategory", SkillCategorySchema);

export default SkillCategory;
