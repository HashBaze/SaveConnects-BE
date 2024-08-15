import { Request, Response } from "express";
import { createAdmin, findOne } from "./admin.repository";
import {
  findOneByEmail,
  updateStatus,
} from "../exhibitor/exhibitor.repository";

// create admin
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the admin already exists
    const existAdmin = await findOne(email);
    if (existAdmin) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    // Create the new user
    const isCreate = await createAdmin(email, password);
    if (!isCreate) {
      return res.status(500).json({
        message: "Error while creating admin",
      });
    }

    return res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error: any) {
    console.log("Error while creating admin -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// change Exhibitor status
export const changeExhibitorStatus = async (req: Request, res: Response) => {
  try {
    const { email, status } = req.body;

    // check if the exhibitor exists
    const existExhibitor = await findOneByEmail(email);
    if (!existExhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    // update the exhibitor status
    const isUpdate = await updateStatus(status, existExhibitor);
    if (!isUpdate) {
      return res.status(500).json({
        message: "Error while updating exhibitor status",
      });
    }

    return res.status(200).json({
      message: "Exhibitor status updated successfully",
    });
  } catch (error: any) {
    console.log("Error while updating exhibitor status -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
