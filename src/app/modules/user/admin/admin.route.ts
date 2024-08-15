import express from "express";
import { registerAdmin } from "./admin.controller";

const adminRoute = express.Router();

adminRoute.post("/register", registerAdmin);

export default adminRoute;