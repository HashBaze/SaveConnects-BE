import express from "express";

import { sendMail } from "./mail.controller";

const mailRoute = express.Router();

mailRoute.post("/send-inquiry-email", sendMail);

export default mailRoute;
