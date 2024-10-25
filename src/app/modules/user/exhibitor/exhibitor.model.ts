import { Schema } from "mongoose";
import { IAttendee, IExhibitor } from "./exhibitor.interface";
import { User } from "../user.model";

// Define the Attendee schema
const AttendeeSchema = new Schema<IAttendee>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  note: {
    type: String,
    trim: true,
  },
});

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
      default: "",
      trim: true,
    },
    coverImage: {
      type: String,
      default: "",
      trim: true,
    },
    phoneNumber: {
      type: String,
      default: "",
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    website: {
      type: String,
      default: "",
      trim: true,
    },
    about: {
      type: String,
      default: "",
      trim: true,
    },
    gallery: {
      type: [String],
      trim: true,
    },
    attendees: {
      type: [AttendeeSchema],
      default: [],
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    designation: {
      type: String,
      default: "",
      trim: true,
    }, 
  },
);

export const Exhibitor = User.discriminator<IExhibitor>("Exhibitor", ExhibitorSchema);
