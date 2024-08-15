import { Schema } from "mongoose";
import { IAdmin } from "./admin.interface";
import { User } from "../user.model";

const AdminSchema = new Schema<IAdmin>(
  {
    // No additional fields are only required for email and password.
    // Inherits from the User schema.
  },
  {
    timestamps: true,
  }
);

export const Admin = User.discriminator<IAdmin>("Admin", AdminSchema);