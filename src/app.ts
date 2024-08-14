import express, { Application } from "express";

import userRoute from "./app/modules/user/user.route";
import exhibitorRoute from "./app/modules/exhibitor/exhibitor.route";

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
app.use("/exhibitor", exhibitorRoute);

export default app;
