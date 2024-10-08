import { IExhibitor } from "./exhibitor.interface";
import { Exhibitor } from "./exhibitor.model";
import bcrypt from "bcrypt";

// create unique companyNameKey
const generateUniqueKey = async (companyName: string) => {
  let key = companyName.toLowerCase().replace(/\s+/g, "-");
  let keyExists = await Exhibitor.findOne({ companyNameKey: key });
  let suffix = 1;

  while (keyExists) {
    key = `${companyName.toLowerCase().replace(/\s+/g, "-")}-${suffix}`;
    keyExists = await Exhibitor.findOne({ companyNameKey: key });
    suffix++;
  }
  return key;
};

// create exhibitor
const createExhibitor = async (
  email: string,
  password: string,
  companyName: string,
  companyCategory: string
): Promise<IExhibitor | null> => {
  try {
    // Generate the unique companyNameKey
    const companyNameKey = await generateUniqueKey(companyName);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newExhibitor = new Exhibitor({
      email,
      password: hashedPassword,
      companyName,
      companyNameKey,
      companyCategory,
    });
    await newExhibitor.save();
    return newExhibitor;
  } catch (error) {
    console.error("Error creating exhibitor(exhibitor.repo)-->:", error);
    return null;
  }
};

// find exhibitor
const findExhibitor = async (
  key: Partial<IExhibitor>
): Promise<IExhibitor | null> => {
  try {
    const exhibitor = (await Exhibitor.findOne(key).select(
      "-__v -createdAt -updatedAt"
    )) as IExhibitor | null;
    return exhibitor;
  } catch (error) {
    console.error("Error finding exhibitor:", error);
    return null;
  }
};

// get all exhibitors
const findAllExhibitors = async (): Promise<IExhibitor[] | null> => {
  try {
    const exhibitors = await Exhibitor.find().select(
      "-__v -createdAt -updatedAt"
    );
    return exhibitors;
  } catch (error) {
    console.error("Error finding exhibitors:", error);
    return null;
  }
};

// update exhibitor
const updateExhibitor = async (
  exhibitor: IExhibitor,
  updates: Partial<IExhibitor>
): Promise<boolean> => {
  try {
    const updateFields: Partial<IExhibitor> = { ...updates };

    // Check if companyName is provided and different from the current one
    if (updates.companyName && updates.companyName !== exhibitor.companyName) {
      updateFields.companyNameKey = await generateUniqueKey(
        updates.companyName
      );
    }

    await Exhibitor.updateOne({ _id: exhibitor._id }, { $set: updateFields });
    return true;
  } catch (error) {
    console.error("Error updating exhibitor(exhibitor.repo)-->:", error);
    return false;
  }
};

// update Exhibuter Galerry
const updateExhibitorGallery = async (
  exhibitor: IExhibitor,
  gallery: string[]
): Promise<boolean> => {
  try {
    await Exhibitor.updateOne({ _id: exhibitor._id }, { $set: { gallery } });
    return true;
  } catch (error) {
    console.error("Error updating exhibitor gallery(exhibitor.repo)-->:", error);
    return false;
  }
};

export { createExhibitor, findExhibitor, updateExhibitor, findAllExhibitors ,updateExhibitorGallery };
