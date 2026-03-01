import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHero extends Document {
  greeting: string;
  name: string;
  tagline: string;
  splineUrl: string;
}

const HeroSchema = new Schema<IHero>(
  {
    greeting: { type: String, default: "Hey, I'm" },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    splineUrl: { type: String },
  },
  { timestamps: true }
);

const Hero: Model<IHero> =
  mongoose.models.Hero || mongoose.model<IHero>("Hero", HeroSchema);

export default Hero;
