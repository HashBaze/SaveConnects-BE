import { Schema, model } from "mongoose";
import { IAttendee } from "./attendee.interface";

const AttendeeSchema = new Schema<IAttendee>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
    exhibitorId: {
      type: String,
      ref: "Exhibitor",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Attendee = model<IAttendee>("Attendee", AttendeeSchema);
