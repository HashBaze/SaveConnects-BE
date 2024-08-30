import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import {
  createExhibitor,
  findExhibitor,
  updateExhibitor,
} from "./exhibitor.db.utills";
import { IAttendee, IExhibitor } from "./exhibitor.interface";
import { sendAttendeeRegistrationEmail } from "../../../../mail/mail.send";

require("dotenv").config();

// create exhibitor
export const registerExhibitor = async (req: Request, res: Response) => {
  try {
    const { companyName, companyCategory, email, password } = req.body;

    // Check if the exhibitor already exists
    const existExhibitor = await findExhibitor({ email: email });
    if (existExhibitor) {
      return res.status(400).json({
        message: "Exhibitor already exists",
      });
    }

    // Create a new exhibitor
    const createdExhibitor: IExhibitor | null = await createExhibitor(
      email,
      password,
      companyName,
      companyCategory
    );
    if (!createdExhibitor) {
      return res.status(500).json({
        message: "Error while creating exhibitor",
      });
    }

    const token = jwt.sign(
      { _id: createdExhibitor._id, role: createdExhibitor.role },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      message: "Exhibitor registered successfully",
      token,
      role: createdExhibitor.role,
      companyKey: createdExhibitor.companyNameKey,
    });
  } catch (error: any) {
    console.error("Error while creating exhibitor -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get exhibitor profile
export const getExhibitorProfile = async (req: Request, res: Response) => {
  try {
    // Extract User ID from JWT
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(403)
        .send({ message: "JWT Authorization Header Missing" });
    }
    const token = authorization.split(" ")[1];
    const decoded = (await jwt.verify(token, `${process.env.JWT_SECRET}`)) as {
      _id: string;
    };

    // Check if the user has an exhibitor profile
    const exhibitor = await findExhibitor({ _id: decoded._id });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }
    return res.status(200).json({
      message: "Exhibitor profile fetched successfully",
      exhibitor,
    });
  } catch (error: any) {
    console.error("Error while getting exhibitor profile -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update exhibitor profile
export const editExhibitorProfile = async (req: Request, res: Response) => {
  try {
    const {
      _id,
      salesPersonName,
      companyName,
      email,
      phoneNumber,
      address,
      website,
      about,
    } = req.body;

    // Check if the exhibitor exists
    const exhibitor = await findExhibitor({ _id: _id });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    const isUpdate = await updateExhibitor(exhibitor, {
      companyName: companyName,
      salesPersonName: salesPersonName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      website: website,
      about: about,
    });
    if (!isUpdate) {
      return res.status(500).json({
        message: "Error while editing exhibitor profile",
      });
    }
    return res.status(200).json({
      message: "Exhibitor profile updated successfully",
    });
  } catch (error: any) {
    console.error("Error while editing exhibitor profile -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update exhibitor cover image
export const editExhibitorCoverImage = async (req: Request, res: Response) => {
  try {
    const { _id, coverImage } = req.body;

    // Check if the exhibitor exists
    const exhibitor = await findExhibitor({ _id: _id });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    const isUpdate = await updateExhibitor(exhibitor, {
      coverImage: coverImage,
    });
    if (!isUpdate) {
      return res.status(500).json({
        message: "Error while editing exhibitor cover image",
      });
    }

    return res.status(200).json({
      message: "Exhibitor cover image updated successfully",
    });
  } catch (error: any) {
    console.error("Error while editing exhibitor cover image -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Add gallery image
export const addGalleryImage = async (req: Request, res: Response) => {
  try {
    const { _id, image } = req.body;

    // Check if the exhibitor exists
    const exhibitor = await findExhibitor({ _id: _id });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    const isUpdate = await updateExhibitor(exhibitor, {
      gallery: [...exhibitor.gallery, image],
    });
    if (!isUpdate) {
      return res.status(500).json({
        message: "Error while adding gallery image",
      });
    }

    return res.status(200).json({
      message: "Gallery image added successfully",
    });
  } catch (error: any) {
    console.error("Error while adding gallery image -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Add exhibitor attendee
export const addAttendee = async (req: Request, res: Response) => {
  try {
    const { _id, name, companyName, contactNumber, email, note } = req.body;

    // Check if the exhibitor exists
    const exhibitor = await findExhibitor({ _id: _id });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    const newAttendee: IAttendee = {
      name: name,
      companyName: companyName,
      contactNumber: contactNumber,
      email: email,
      note: note,
    };

    const isUpdate = await updateExhibitor(exhibitor, {
      attendees: [...exhibitor.attendees, newAttendee],
    });
    if (!isUpdate) {
      return res.status(500).json({
        message: "Error while adding exhibitor attendee",
      });
    }

    await sendAttendeeRegistrationEmail(email, exhibitor);

    return res.status(200).json({
      messsage: "Exhibitor attendee added successfully",
    });
  } catch (error: any) {
    console.error("Error while adding exhibitor attendee -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Edit exhibitor attendee
export const editAttendee = async (req: Request, res: Response) => {
  try {
    const { _id, attendeeId, name, companyName, contactNumber, email, note } =
      req.body;

    // Check if the exhibitor exists
    const exhibitor = await findExhibitor({ _id: _id });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    const updatedAttendees = exhibitor.attendees.map((attendee) => {
      if (attendee._id?.toString() === attendeeId) {
        attendee.name = name;
        attendee.companyName = companyName;
        attendee.contactNumber = contactNumber;
        attendee.email = email;
        attendee.note = note;
      }
      return attendee;
    });

    const isUpdate = await updateExhibitor(exhibitor, {
      attendees: updatedAttendees,
    });

    if (!isUpdate) {
      return res.status(500).json({
        message: "Error while editing exhibitor attendee",
      });
    }

    return res.status(200).json({
      message: "Exhibitor attendee updated successfully",
    });
  } catch (error: any) {
    console.error("Error while editing exhibitor attendee -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete exhibitor attendee
export const deleteAttendee = async (req: Request, res: Response) => {
  try {
    const { _id, attendeeId } = req.body;

    // Check if the exhibitor exists
    const exhibitor = await findExhibitor({ _id: _id });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    // Remove the attendee from the array
    const updatedAttendees = exhibitor.attendees.filter(
      (attendee) => attendee._id?.toString() !== attendeeId
    );

    const isUpdate = await updateExhibitor(exhibitor, {
      attendees: updatedAttendees,
    });

    if (!isUpdate) {
      return res.status(500).json({
        message: "Error while deleting exhibitor attendee",
      });
    }

    return res.status(200).json({
      message: "Exhibitor attendee deleted successfully",
    });
  } catch (error: any) {
    console.error("Error while deleting exhibitor attendee -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update exhibitor gallery
export const editExhibitorGallery = async (req: Request, res: Response) => {
  try {
    const { _id, gallery } = req.body;

    // Check if the exhibitor exists
    const exhibitor = await findExhibitor({ _id: _id });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    const isUpdate = await updateExhibitor(exhibitor, { gallery: gallery });
    if (!isUpdate) {
      return res.status(500).json({
        message: "Error while editing exhibitor gallery",
      });
    }

    return res.status(200).json({
      message: "Exhibitor gallery updated successfully",
    });
  } catch (error: any) {
    console.error("Error while editing exhibitor gallery -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Check companyNamekey exists
export const checkCompanyNameKey = async (req: Request, res: Response) => {
  try {
    const { companyNameKey } = req.body;

    // Check if the exhibitor exists
    const exhibitor = await findExhibitor({ companyNameKey: companyNameKey });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    return res.status(200).json({
      message: "Company name key exists",
      data: exhibitor,
    });
  } catch (error: any) {
    console.error("Error while checking company name key -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
