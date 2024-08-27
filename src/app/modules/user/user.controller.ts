import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { findOne, updateUser } from "./user.db.utills";
import { findExhibitor } from "../user/exhibitor/exhibitor.db.utills";
import { IExhibitor } from "./exhibitor/exhibitor.interface";
import { sendPasswordResetEmail, sendPasswordResetSuccessEmail } from "../../../mail/mail.send";

require("dotenv").config();

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findOne({email: email});

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
        if (user.role === "Exhibitor") {
          const exhibitor : IExhibitor | null = await findExhibitor({ _id: user._id });
          if (exhibitor) {
            return res.status(200).json({ 
              message: "Login successful",
              token,
              role: user.role,
              companyKey: exhibitor.companyNameKey,
            });
          }
        }
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

// forgot password
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = jwt.sign(
      { 
        _id: user._id,
        purpose: 'password_reset'
      },
      process.env.JWT_SECRET as Secret,
      { expiresIn: '1h' }
    );

    // Create the reset URL
    const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send the password reset email
    await sendPasswordResetEmail(email, resetURL);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error: any) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};

// Reset password
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    // Verify the reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as {
      _id: string;
      purpose: string;
    };

    if (decoded.purpose !== 'password_reset') {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Find the user
    const user = await findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user password
    const isUpdate = await updateUser(user, { password: hashedPassword });

    if (!isUpdate) {
      return res.status(500).json({ message: 'Error while resetting password' });
    }

    // Send the password reset success email
    await sendPasswordResetSuccessEmail(user.email);

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error: any) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: 'Error processing request', error: error.message });
  }
}