import express from "express";
import { registerAdmin, changeExhibitorStatus } from "./admin.controller";

import verifyAdminToken from "../../../../middleware/admin.verify";

const adminRoute = express.Router();

adminRoute.post("/register", registerAdmin);
adminRoute.post("/change-exhibitor-status", verifyAdminToken, changeExhibitorStatus);

export default adminRoute;