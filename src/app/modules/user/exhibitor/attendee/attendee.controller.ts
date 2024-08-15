import { Request, Response } from "express";
import {
  createAttendee,
  findOneByAttendeeName,
  findOneByAttendeeId,
  findOneByExhibitorId,
  updateAttendeeById,
  deleteAttendeeById,
} from "./attendee.repository";

export const registerAttendee = async (req: Request, res: Response) => {
  try {
    const { exhibitorId, name, email, phoneNumber, companyName, note } =
      req.body;

    // Check if the attendee exists
    const exitAttendee = await findOneByAttendeeName(name);

    if (exitAttendee) {
      return res.status(400).json({
        message: "Attendee already exists",
      });
    }

    // Create the attendee
    const isCreated = await createAttendee(
      name,
      email,
      phoneNumber,
      companyName,
      note,
      exhibitorId
    );

    if (!isCreated) {
      return res.status(500).json({
        message: "Error creating attendee",
      });
    }

    return res.status(201).json({
      message: "Attendee created successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error creating attendee",
      error: error.message,
    });
  }
};

export const updateAttendee = async (req: Request, res: Response) => {
  try {
    const { _id, name, email, phoneNumber, companyName, note } = req.body;

    // Check if the attendee exists
    const exitAttendee = await findOneByAttendeeId(_id);

    if (!exitAttendee) {
      return res.status(400).json({
        message: "Attendee not found",
      });
    }

    // Update the attendee
    const isUpdated = await updateAttendeeById(
      _id,
      name,
      email,
      phoneNumber,
      companyName,
      note
    );

    if (!isUpdated) {
      return res.status(500).json({
        message: "Error updating attendee",
      });
    }

    return res.status(200).json({
      message: "Attendee updated successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error updating attendee",
      error: error.message,
    });
  }
};

export const deleteAttendee = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    // Check if the attendee exists
    const exitAttendee = await findOneByAttendeeId(_id);

    if (!exitAttendee) {
      return res.status(400).json({
        message: "Attendee not found",
      });
    }

    // Delete the attendee
    const isDeleted = await deleteAttendeeById(_id);

    if (!isDeleted) {
      return res.status(500).json({
        message: "Error deleting attendee",
      });
    }

    return res.status(200).json({
      message: "Attendee deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error deleting attendee",
      error: error.message,
    });
  }
};
