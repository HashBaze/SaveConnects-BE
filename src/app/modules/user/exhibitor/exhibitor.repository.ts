import { IExhibitor } from "./exhibitor.interface";
import { Exhibitor } from "./exhibitor.model";
import bcrypt from "bcrypt";

//create unique companyNameKey
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

const createExhibitor = async (
  email: string,
  password: string,
  companyName: string,
  companyCategory: string
): Promise<boolean> => {
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
    return true;
  } catch (error) {
    console.error("Error creating exhibitor(exhibitor.repo)-->:", error);
    return false;
  }
};

const findOneByEmail = async (email: string): Promise<IExhibitor | null> => {
  try {
    const exhibitor = (await Exhibitor.findOne({ email }).select(
      "-__v -createdAt -updatedAt"
    )) as IExhibitor | null;
    return exhibitor;
  } catch (error) {
    console.error("Error finding exhibitor:", error);
    return null;
  }
};

const findOneByCompanyNameKey = async (
  companyNameKey: string
): Promise<IExhibitor | null> => {
  try {
    const exhibitor = (await Exhibitor.findOne({
      companyNameKey,
    }).select("-__v -createdAt -updatedAt")) as IExhibitor | null;
    return exhibitor;
  } catch (error) {
    console.error("Error finding exhibitor(exhibitor.repo)-->:", error);
    return null;
  }
};

const findOneById = async (_id: string): Promise<IExhibitor | null> => {
  try {
    const exhibitor = (await Exhibitor.findOne({
      _id,
    }).select("-__v -createdAt -updatedAt")) as IExhibitor | null;
    return exhibitor;
  } catch (error) {
    console.error("Error finding exhibitor(exhibitor.repo)-->:", error);
    return null;
  }
};

const updateOne = async (
  salesPersonName: string,
  companyName: string,
  email: string,
  phoneNumber: string,
  address: string,
  website: string,
  about: string,
  exhibitor: IExhibitor
): Promise<boolean> => {
  try {
    if (companyName !== exhibitor.companyName) {
      const newCompanyNameKey = await generateUniqueKey(companyName);
      await Exhibitor.updateOne(
        { _id: exhibitor._id },
        {
          $set: {
            companyName,
            companyNameKey: newCompanyNameKey,
            salesPersonName,
            email,
            phoneNumber,
            address,
            website,
            about,
          },
        }
      );
    } else {
      await Exhibitor.updateOne(
        { _id: exhibitor._id },
        {
          $set: { salesPersonName, email, phoneNumber, address, website, about },
        }
      );
    }
    return true;
  } catch (error) {
    console.error("Error updating exhibitor(exhibitor.repo)-->:", error);
    return false;
  }
};

const updateCoverImage = async (
  coverImage: string,
  exhibitor: IExhibitor
): Promise<boolean> => {
  try {
    await Exhibitor.updateOne(
      { _id: exhibitor._id },
      {
        $set: { coverImage },
      }
    );
    return true;
  } catch (error) {
    console.error(
      "Error updating exhibitor cover image(exhibitor.repo)-->:",
      error
    );
    return false;
  }
};

const updateGallery = async (
  gallery: string[],
  exhibitor: IExhibitor
): Promise<boolean> => {
  try {
    await Exhibitor.updateOne(
      { _id: exhibitor._id },
      {
        $set: { gallery },
      }
    );
    return true;
  } catch (error) { 
    console.error("Error updating exhibitor gallery(exhibitor.repo)-->:", error);
    return false;
  }
};

const updateStatus = async (
  status: string,
  exhibitor: IExhibitor
): Promise<boolean> => {
  try {
    await Exhibitor.updateOne(
      { _id: exhibitor._id },
      {
        $set: { isEnabled: status },
      }
    );
    return true;
  } catch (error) {
    console.error("Error updating exhibitor status(exhibitor.repo)-->:", error);
    return false;
  }
};

const addAttendeeToExhibitor = async (
  exhibitorId: string,
  attendeeId: string
): Promise<boolean> => {
  try {
    await Exhibitor.updateOne(
      { _id: exhibitorId },
      { $push: { attendees: attendeeId } }
    );
    return true;
  } catch (error) {
    console.error("Error updating exhibitor with attendee (exhibitor.repo) -->", error);
    return false;
  }
};

export {
  createExhibitor,
  findOneByEmail,
  findOneByCompanyNameKey,
  updateOne,
  updateCoverImage,
  findOneById,
  updateGallery,
  updateStatus,
  addAttendeeToExhibitor,
};
