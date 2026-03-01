import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAbout extends Document {
  heading: string;
  paragraphs: string[];
}

const AboutSchema = new Schema<IAbout>(
  {
    heading: { type: String, required: true },
    paragraphs: [{ type: String }],
  },
  { timestamps: true }
);

const About: Model<IAbout> =
  mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);

export default About;
