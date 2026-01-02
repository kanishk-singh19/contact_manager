import { Schema, model, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email?: string;
  phone: string;
  message?: string;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    message: { type: String }
  },
  { timestamps: true }
);

export default model<IContact>("Contact", contactSchema);
