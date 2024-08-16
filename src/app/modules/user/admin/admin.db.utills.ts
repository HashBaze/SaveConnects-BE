import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import bcrypt from "bcrypt";

// create admin
const createAdmin = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });
    await newAdmin.save();
    return true;
  } catch (error) {
    console.error("Error creating admin:", error);
    return false;
  }
};

// find admin
const findAdmin = async (key: Partial<IAdmin>): Promise<IAdmin | null> => {
  try {
    const admin = (await Admin.findOne(key).select(
      "-__v -createdAt -updatedAt"
    )) as IAdmin | null;
    return admin;
  } catch (error) {
    console.error("Error finding admin:", error);
    return null;
  }
};

export { createAdmin, findAdmin };
