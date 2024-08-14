import express from "express";
import { 
    registerUser, 
    loginUser,
    getUserProfile,
 } from "./user.controller";

const userRouter = express.Router();

userRouter.post("/admin/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin/profile", getUserProfile);

export default userRouter;
