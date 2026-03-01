import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISocial extends Document {
  platform: string;
  url: string;
  order: number;
}

const SocialSchema = new Schema<ISocial>(
  {
    platform: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Social: Model<ISocial> =
  mongoose.models.Social || mongoose.model<ISocial>("Social", SocialSchema);

export default Social;
