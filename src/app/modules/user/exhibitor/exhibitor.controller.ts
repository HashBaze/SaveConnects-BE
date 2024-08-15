import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  createExhibitor,
  findOneByEmail,
  findOneById,
  updateOne,
  updateCoverImage,
  updateGallery,
} from "./exhibitor.repository";

require("dotenv").config();

// create exhibitor
export const registerExhibitor = async (req: Request, res: Response) => {
  try {
    const { companyName, companyCategory, email, password } = req.body;

    // Check if the exhibitor already exists
    const existExhibitor = await findOneByEmail(email);
    if (existExhibitor) {
      return res.status(400).json({
        message: "Exhibitor already exists",
      });
    }

    // Create a new exhibitor
    const isCreate = await createExhibitor(
      email,
      password,
      companyName,
      companyCategory
    );
    if (!isCreate) {
      return res.status(500).json({
        message: "Error while creating exhibitor",
      });
    }

    return res.status(201).json({
      message: "Exhibitor registered successfully",
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
    const exhibitor = await findOneById(decoded._id);
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
    const exhibitor = await findOneById(_id);
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    const isUpdate = await updateOne(
      salesPersonName,
      companyName,
      email,
      phoneNumber,
      address,
      website,
      about,
      exhibitor
    );
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
    const exhibitor = await findOneById(_id);
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    const isUpdate = await updateCoverImage(coverImage, exhibitor);
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

// Update exhibitor gallery
export const editExhibitorGallery = async (req: Request, res: Response) => {
  try {
    const { _id, gallery } = req.body;

    // Check if the exhibitor exists
    const exhibitor = await findOneById(_id);
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    const isUpdate = await updateGallery(gallery, exhibitor);
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
