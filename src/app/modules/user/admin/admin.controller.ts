import { Request, Response } from "express";
import { createAdmin, findAdmin } from "./admin.db.utills";
import {
  findExhibitor,
  updateExhibitor,
  findAllExhibitors,
} from "../exhibitor/exhibitor.db.utills";

// create admin
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the admin already exists
    const existAdmin = await findAdmin({email: email});
    if (existAdmin) {
      return res.status(400).json({
        message: "Admin already exist",
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

// Get All Exhibitors
export const getAllExhibitors = async (req: Request, res: Response) => {
  try {
    const exhibitors = await findAllExhibitors();
    return res.status(200).json({
      message: "Exhibitors fetched successfully",
      exhibitors,
    });
  } catch (error: any) {
    console.log("Error while fetching exhibitors -->", error);
    return res.status(500).json({ 
      message: error.message,
    });
  }
};

// Change Exhibitor status
export const changeExhibitorStatus = async (req: Request, res: Response) => {
  try {
    const { email, status } = req.body;

    // check if the exhibitor exists
    const existExhibitor = await findExhibitor({ email: email });
    if (!existExhibitor) {
      return res.status(404).json({
        message: "Exhibitor not found",
      });
    }

    // update the exhibitor status
    const isUpdate = await updateExhibitor(existExhibitor, { isEnabled: status });
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
