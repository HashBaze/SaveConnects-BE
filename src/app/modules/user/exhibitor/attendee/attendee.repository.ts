import { IAttendee } from "./attendee.interface";
import { Attendee } from "./attendee.model";
import { addAttendeeToExhibitor } from "../../exhibitor/exhibitor.repository";

const findOneByAttendeeName = async (
  name: string
): Promise<IAttendee | null> => {
  try {
    const attendee = await Attendee.findOne({ name }).select(
      "-__v -createdAt -updatedAt"
    );
    return attendee;
  } catch (error) {
    console.error("Error finding attendee:", error);
    return null;
  }
};

const createAttendee = async (
  name: string,
  email: string,
  phoneNumber: string,
  companyName: string,
  note: string,
  exhibitorId: string
): Promise<IAttendee | null> => {
  try {
    const attendee = new Attendee({
      name,
      email,
      phoneNumber,
      companyName,
      note,
      exhibitorId,
    });

    await attendee.save();

    await addAttendeeToExhibitor(exhibitorId, attendee._id);

    return attendee;
  } catch (error) {
    console.error("Error creating attendee(attendee.repo) -->", error);
    return null;
  }
};

const findOneByAttendeeId = async (
  attendeeId: string
): Promise<IAttendee | null> => {
  try {
    const attendee = await Attendee.findOne({ _id: attendeeId }).select(
      "-__v -createdAt -updatedAt"
    );
    return attendee;
  } catch (error) {
    console.error("Error finding attendee:", error);
    return null;
  }
};

const findOneByExhibitorId = async (
  exhibitorId: string
): Promise<IAttendee | null> => {
  try {
    const attendee = await Attendee.findOne({ exhibitorId }).select(
      "-__v -createdAt -updatedAt"
    );
    return attendee;
  } catch (error) {
    console.error("Error finding attendee:", error);
    return null;
  }
};

const updateAttendeeById = async (
  attendeeId: string,
  name: string,
  email: string,
  phoneNumber: string,
  companyName: string,
  note: string
): Promise<boolean> => {
  try {
    await Attendee.updateOne(
      { _id: attendeeId },
      {
        $set: {
          name,
          email,
          phoneNumber,
          companyName,
          note,
        },
      }
    );
    return true;
  } catch (error) {
    console.error("Error updating attendee:", error);
    return false;
  }
};

const deleteAttendeeById = async (attendeeId: string): Promise<boolean> => {
  try {
    await Attendee.deleteOne({ _id: attendeeId });
    return true;
  } catch (error) {
    console.error("Error deleting attendee:", error);
    return false;
  }
};

export { createAttendee, findOneByAttendeeName, findOneByAttendeeId, findOneByExhibitorId, updateAttendeeById, deleteAttendeeById };
