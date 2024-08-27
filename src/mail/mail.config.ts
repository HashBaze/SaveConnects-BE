require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: `${process.env.MAIL_USER}`,
    pass: `${process.env.MAIL_PASSWORD}`,
  },
});

export default transporter;
