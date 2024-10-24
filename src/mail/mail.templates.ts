import { IExhibitor } from "../app/modules/user/exhibitor/exhibitor.interface";

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1A2B4C, #5E6A81); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #1A2B4C; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>SaveConnects Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1A2B4C, #5E6A81); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #1A2B4C; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>SaveConnects Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const ATTENDEE_REGISTRATION_TEMPLATE = (exhibitor: IExhibitor) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ${exhibitor.companyName}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1A2B4C, #5E6A81); padding: 20px; text-align: center;">
    <!-- <img src="LOGO_URL" alt="${exhibitor.companyName} Logo" style="max-width: 100px; margin-bottom: 10px;"> -->
    <h1 style="color: white; margin: 0;">Welcome to ${exhibitor.companyName}</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for visiting and registering at our stall.</p>
    <p>Below are the contact details for the exhibitor:</p>
    <div style="overflow-x: auto;">
      <table style="width: 100%; margin-bottom: 20px;">
        <tr>
          <td style="font-weight: bold; width: 50%;">Company Name:</td>
          <td>${exhibitor.companyName}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Email :</td>
          <td>${exhibitor.email}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Address:</td>
          <td>${exhibitor.address}</td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Website:</td>
          <td><a href="${exhibitor.website}" target="_blank" style="color: #1A2B4C; text-decoration: none;">${exhibitor.website}</a></td>
        </tr>
        <tr>
          <td style="font-weight: bold;">Phone Number:</td>
          <td>${exhibitor.phoneNumber}</td>
        </tr>
      </table>
    </div>
    <p>A member of our team will be reaching out to you soon.</p>
    <p>Best regards,<br>${exhibitor.companyName} Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
    <p>Powered by SaveConnects Team</p>
  </div>
</body>
</html>
`;

export const INQUIRY_EMAIL_TEMPLATE = (
  name: string, 
  message: string, 
  fromEmail: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry from ${name}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #1A2B4C, #5E6A81); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">You have a new inquiry</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>You have received a new inquiry from <strong>${name}</strong>.</p>
    <p><strong>Inquiry Person Email:</strong> ${fromEmail}</p>
    <p><strong>Inquiry Message:</strong></p>
    <p>${message}</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>You can reply to this email to get in touch with the sender.</p>
    <p>Powered by SaveConnects Team</p>
  </div>
</body>
</html>
`;

