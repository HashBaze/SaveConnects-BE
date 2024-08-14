import { Schema, model } from "mongoose";
import { IExhibitor } from "./exhibitor.interface";

const ExhibitorSchema = new Schema<IExhibitor>(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyNameKey: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    companyCategory: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    about: {
      type: String,
      trim: true,
    },
    gallery: {
      type: [String],
      trim: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Exhibitor = model<IExhibitor>("Exhibitor", ExhibitorSchema);
