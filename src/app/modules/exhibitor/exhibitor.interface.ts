import { Types } from "mongoose";

export interface IExhibitor {
  companyName: string;
  companyNameKey: string;
  companyCategory: string;
  coverImage: string;
  phoneNumber: string;
  address: string;
  website: string;
  about: string;
  gallery: string[];
  userId: Types.ObjectId;
}
