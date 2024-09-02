import express from "express";
import {
    create,
    find,
    findAll,
    remove,
} from "./category.controller";

const categoryRoute = express.Router();

import verifyAdminToken from "../../../middleware/admin.verify";

categoryRoute.post("/create", verifyAdminToken, create);
categoryRoute.get("/find", verifyAdminToken, find);
categoryRoute.get("/all", findAll);
categoryRoute.delete("/delete", verifyAdminToken, remove);

export default categoryRoute;
