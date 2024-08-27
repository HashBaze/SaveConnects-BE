import express from "express";
import {  
    loginUser,
    forgotPassword,
    resetPassword,
 } from "./user.controller";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/forgot-password", forgotPassword);
userRouter.put("/reset-password", resetPassword);

export default userRouter;
