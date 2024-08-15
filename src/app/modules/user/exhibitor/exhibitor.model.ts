import { Schema } from "mongoose";
import { IExhibitor } from "./exhibitor.interface";
import { User } from "../user.model";

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
    salesPersonName: {
      type: String,
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
    attendees: {
      type: [String],
      ref: "Attendee",
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Exhibitor = User.discriminator<IExhibitor>("Exhibitor", ExhibitorSchema);
