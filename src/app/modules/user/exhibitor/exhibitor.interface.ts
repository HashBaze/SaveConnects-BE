import { IUser } from "../user.interface";

export interface IExhibitor extends IUser {
  _id: string;
  companyName: string;
  companyNameKey: string;
  companyCategory: string;
  salesPersonName: string;
  coverImage: string;
  phoneNumber: string;
  address: string;
  website: string;
  about: string;
  gallery: string[];
  attendees: string[];
  isEnabled: boolean;
}
