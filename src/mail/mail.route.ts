import express from "express";

import { sendMail,logAllEmailRecords,logDeleteAll,rankUsers } from "./mail.controller";


const mailRoute = express.Router();

mailRoute.post("/send-inquiry-email", sendMail);
mailRoute.get("/email-recods",logAllEmailRecords);
mailRoute.get("/ranked-email-recods",rankUsers);
mailRoute.delete("/delete-email-recods",logDeleteAll)

export default mailRoute;
