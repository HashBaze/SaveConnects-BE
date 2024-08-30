import transporter from "./mail.config";
import { IExhibitor } from "../app/modules/user/exhibitor/exhibitor.interface";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  ATTENDEE_REGISTRATION_TEMPLATE,
  INQUIRY_EMAIL_TEMPLATE,
} from "./mail.templates";

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
) => {
  const mailOptions = {
    from: '"SaveConnects" <tishanshamika200@gmail.com>',
    to: email,
    subject: "Reset your password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending password reset email:`, error);
    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendPasswordResetSuccessEmail = async (email: string) => {
  const mailOptions = {
    from: '"SaveConnects" <tishanshamika200@gmail.com>',
    to: email,
    subject: "Password reset successful",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset success email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending password reset success email:`, error);
    throw new Error(`Error sending password reset success email: ${error}`);
  }
}

export const sendAttendeeRegistrationEmail = async (email: string, exhibitor: IExhibitor) => {
  const mailOptions = {
    from: `"${exhibitor.companyName}" <${exhibitor.email}>`,
    to: email,
    subject: "Attendee Registration",
    html: ATTENDEE_REGISTRATION_TEMPLATE(exhibitor),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Attendee registration email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending attendee registration email to ${email}:`, error);
    throw new Error(`Error sending attendee registration email: ${error}`);
  }
};

export const inquiryEmail = async (from: string, to: string, name: string, message: string) => {
  const mailOptions = {
    from: `"${name}" <${from}>`,
    to: to,
    subject: "New Inquiry",
    html: INQUIRY_EMAIL_TEMPLATE(name, message, from),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Inquiry email sent to ${to}`);
  } catch (error) {
    console.error(`Error sending inquiry email:`, error);
    throw new Error(`Error sending inquiry email: ${error}`);
  }
}