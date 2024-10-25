import { IUser } from "../user.interface";

export interface IAttendee {
  name: string;
  companyName: string;
  contactNumber: string;
  email: string;
  note: string;
  _id?: string;
}

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
  attendees: IAttendee[];
  isEnabled: boolean;
  designation: string;
}
