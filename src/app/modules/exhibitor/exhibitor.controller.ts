import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../user/user.model";
import { Exhibitor } from "./exhibitor.model";

require("dotenv").config();

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

// create exhibitor
export const registerExhibitor = async (req: Request, res: Response) => {
  try {
    const { companyName, companyCategory, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create the new user
    const user = new User({
      email,
      password: hashedPassword,
      role: "exhibitor",
    });
    const savedUser = await user.save();

    // Generate the unique companyNameKey
    const companyNameKey = await generateUniqueKey(companyName);

    // Create the exhibitor profile linked to the user
    const exhibitor = new Exhibitor({
      companyName,
      companyNameKey,
      companyCategory,
      userId: savedUser._id,
    });
    await exhibitor.save();

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
    const { token } = req.body;
    const decoded = (await jwt.verify(token, `${process.env.JWT_SECRET}`)) as {
      _id: string;
    };

    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check if the user has an exhibitor profile
    const exhibitor = await Exhibitor.findOne({ userId: user._id }).select(
      "-userId -__v -createdAt -updatedAt"
    );
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }
    return res.status(200).json({
      message: "Exhibitor profile fetched successfully",
      exhibitor,
      email: user.email,
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
    const { _id, companyName, email, phoneNumber, address, website, about } =
      req.body;

    // Check if the user exists
    const exhibitor = await Exhibitor.findOne({ _id });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    // Check if the companyName is different
    if (companyName !== exhibitor.companyName) {
      const newCompanyNameKey = await generateUniqueKey(companyName);
      await Exhibitor.updateOne(
        { _id },
        {
          $set: {
            companyName,
            companyNameKey: newCompanyNameKey,
            phoneNumber,
            address,
            website,
            about,
          },
        }
      );
    } else {
      await Exhibitor.updateOne(
        { _id },
        {
          $set: {
            phoneNumber,
            address,
            website,
            about,
          },
        }
      );
    }

    // Check if the email is different
    const user = await User.findOne({ _id: exhibitor.userId });
    if (email !== user?.email) {
      await User.updateOne(
        { _id: exhibitor.userId },
        {
          $set: {
            email,
          },
        }
      );
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
    const exhibitor = await Exhibitor.findOne({ _id });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    await Exhibitor.updateOne(
      { _id },
      {
        $set: {
          coverImage,
        },
      }
    );

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
    const exhibitor = await Exhibitor.findOne({ _id });
    if (!exhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    await Exhibitor.findOneAndUpdate(
      { _id },
      {
        $addToSet: {
          gallery,
        },
      }
    );

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
