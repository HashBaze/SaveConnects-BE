import express from "express";
import {  
    loginUser,
 } from "./user.controller";

const userRouter = express.Router();

userRouter.post("/login", loginUser);

export default userRouter;
