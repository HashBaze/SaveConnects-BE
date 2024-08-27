import transporter from "./mail.config";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
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