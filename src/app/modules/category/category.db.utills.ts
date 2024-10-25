import { ICategory } from "./category.interface";
import { Category } from "./category.model";

// create category
const createCategory = async (name: string): Promise<boolean> => {
  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    return true;
  } catch (error) {
    console.error("Error creating category--->", error);
    return false;
  }
};

// find category
const findCategory = async (
  key: Partial<ICategory>
): Promise<ICategory | null> => {
  try {
    const caseInsensitiveKey = Object.fromEntries(
      Object.entries(key).map(([k, v]) => [k, new RegExp(`^${v}$`, "i")])
    );

    const category = (await Category.findOne(caseInsensitiveKey).select(
      "-__v -createdAt -updatedAt"
    )) as ICategory | null;
    return category;
  } catch (error) {
    console.error("Error finding category--->", error);
    return null;
  }
};

// find all categories
const findAllCategories = async (): Promise<ICategory[] | null> => {

  const categories = [
    {
      _id: "1",
      name: "Software",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "2",
      name: "Electronics",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "3",
      name: "Agri",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "4",
      name: "manufacturing",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: "5",
      name: "engineering",
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      _id: "6",
      name: "construction",
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      _id: "7",
      name: "health",
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      _id: "8",
      name: "packaging",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ] as ICategory[];

  try {
    // const categories = (await Category.find().select(
    //   "-__v -createdAt -updatedAt"
    // )) as ICategory[] | null;
    return categories;
  } catch (error) {
    console.error("Error finding categories--->", error);
    return null;
  }
};

// delete category
const deleteCategory = async (key: Partial<ICategory>): Promise<boolean> => {
  try {
    const caseInsensitiveKey = Object.fromEntries(
      Object.entries(key).map(([k, v]) => [k, new RegExp(`^${v}$`, "i")])
    );

    await Category.deleteOne(caseInsensitiveKey);
    return true;
  } catch (error) {
    console.error("Error deleting category--->", error);
    return false;
  }
};

export { createCategory, findCategory, deleteCategory, findAllCategories };
