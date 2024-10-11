import express, { Application } from "express";

import userRoute from "./app/modules/user/user.route";
import exhibitorRoute from "./app/modules/user/exhibitor/exhibitor.route";
import adminRoute from "./app/modules/user/admin/admin.route";
import mailRoute from "./mail/mail.route";
import categoryRoute from "./app/modules/category/category.route";

const app: Application = express();

import cors from "cors";

app.use(
  cors({
    origin: "https://www.saveconnects.com",
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

app.use("/mail", mailRoute);
app.use("/category", categoryRoute);

export default app;
