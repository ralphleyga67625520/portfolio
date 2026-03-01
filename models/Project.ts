import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  video?: string;
  liveUrl?: string;
  githubUrl: string;
  tags: string[];
  accentColor: string;
  order: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    image: { type: String },
    video: { type: String },
    liveUrl: { type: String },
    githubUrl: { type: String, required: true },
    tags: [{ type: String }],
    accentColor: { type: String, default: "#3B82F6" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
