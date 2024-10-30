import express from "express";

import { sendMail,logAllEmailRecords,logDeleteAllEmailRecors} from "./mail.controller";


const mailRoute = express.Router();

mailRoute.post("/send-inquiry-email", sendMail);
mailRoute.get("/email-recods",logAllEmailRecords);
mailRoute.delete("/delete-email-recods",logDeleteAllEmailRecors)


export default mailRoute;
