import express from "express";
import {
    registerAttendee,
} from "./attendee.controller";

const attendeeRoute = express.Router();

attendeeRoute.post("/create", registerAttendee);

export default attendeeRoute;