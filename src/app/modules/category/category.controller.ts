import { Request, Response } from "express";
import {
  createCategory,
  findCategory,
  deleteCategory,
  findAllCategories,
} from "./category.db.utills";

// create category
export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // Check if the category already exists
    const existCategory = await findCategory({ name: name });
    if (existCategory) {
      return res.status(400).json({
        message: "Category already exist",
      });
    }

    // Create the new category
    const isCreate = await createCategory(name);
    if (!isCreate) {
      return res.status(500).json({
        message: "Error while creating category",
      });
    }

    return res.status(201).json({
      message: "Category created successfully",
    });
  } catch (error: any) {
    console.log("Error while creating category -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// find category
export const find = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await findCategory({ name });
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }
    return res.status(200).json({
      message: "Category fetched successfully",
      category,
    });
  } catch (error: any) {
    console.log("Error while fetching category -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// get all categories
export const findAll = async (req: Request, res: Response) => {
  try {
    const categories = await findAllCategories();
    if (!categories) {
      return res.status(404).json({
        message: "Categories not found",
      });
    }

    return res.status(200).json({
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error: any) {
    console.log("Error while fetching categories -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

// delete category
export const remove = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    // check if the category exists
    const existCategory = await findCategory({ name });
    if (!existCategory) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // delete the category
    const isDelete = await deleteCategory({ name });
    if (!isDelete) {
      return res.status(500).json({
        message: "Error while deleting category",
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    console.log("Error while deleting category -->", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
