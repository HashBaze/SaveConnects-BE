import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "./user.model";

require("dotenv").config();

// create admin
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, date } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    // Create the new user
    const user = new User({
      email,
      password: hashedPassword,
      role: "admin",
      date,
    });
    await user.save();

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error: any) {
    console.log("Error while creating user -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET as Secret,
          {
            expiresIn: "1d",
          }
        );
        return res.status(200).json({
          message: "Login successful",
          token,
          role: user.role,
        });
      } else {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error: any) {
    console.log("Error while login user -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};


// Get Admin user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // Extract User ID from JWT
    const { token } = req.body;
    const decoded = (await jwt.verify(token, `${process.env.JWT_SECRET}`)) as {
      _id: string;
    };
    const user = await User.findOne({ _id: decoded._id }).select(
      "-password -__v -createdAt -updatedAt"
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (error: any) {
    console.log("Error while getting user profile -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
}