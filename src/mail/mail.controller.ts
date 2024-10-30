import { Request, Response } from "express";
import { inquiryEmail } from "../mail/mail.send";
import { IEmail, IEmail_Record } from "./mail.interface";
import {
  saveEmailRecord,
  findAllEmailRecords,
  deleteALL,
  predict,
} from "./mail.db.utills";
import { rankUsers } from "../app/modules/user/exhibitor/exhibitor.controller";

export const sendMail = async (req: Request, res: Response) => {
  const { name, from, to, message } = req.body;
  try {
    await inquiryEmail(from, to, name, message);
    const email_client: IEmail = {
      Name: name,
      body: message,
      email: from,
    };
    const predictionOutput = await predict(email_client);
    if (!predictionOutput) {
      console.log("Prediction output is not available.");
    } else {
      const emailRecord: IEmail_Record = {
        Name: name,
        body: message,
        email: from,
        score: predictionOutput.FinalScore,
      };

      await saveEmailRecord(emailRecord);

    }

    return res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export async function logAllEmailRecords(res:Response) {
  try {
    const allEmails= await findAllEmailRecords();
    return res.status(200).json(allEmails)
  } catch (error) {
    console.error("Error fetching email records:", error);
  }
}

export async function logDeleteAllEmailRecors() {
  try {
    await deleteALL();
  } catch (error) {
    console.error("Error will be :", error);
  }
}