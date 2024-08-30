import { Request, Response } from "express";
import { inquiryEmail } from "../mail/mail.send";

export const sendMail = async (req: Request, res: Response) => {
  const { name, from, to, message } = req.body;
  try {
    await inquiryEmail(from, to, name, message);
    return res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
