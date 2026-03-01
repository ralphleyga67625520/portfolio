import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICertification extends Document {
  name: string;
  image: string;
  link?: string;
  order: number;
}

const CertificationSchema = new Schema<ICertification>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Certification: Model<ICertification> =
  mongoose.models.Certification ||
  mongoose.model<ICertification>("Certification", CertificationSchema);

export default Certification;
