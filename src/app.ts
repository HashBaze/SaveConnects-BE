import express, { Application } from "express";

import userRoute from "./app/modules/user/user.route";
import exhibitorRoute from "./app/modules/user/exhibitor/exhibitor.route";
import adminRoute from "./app/modules/user/admin/admin.route";
import attendeeRoute from "./app/modules/user/exhibitor/attendee/attendee.route";

const app: Application = express();

import cors from "cors";

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/exhibitor", exhibitorRoute);
app.use("/attendee", attendeeRoute);

export default app;
