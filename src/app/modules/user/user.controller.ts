import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { findOne } from "./user.repository";

require("dotenv").config();

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findOne(email);

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
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