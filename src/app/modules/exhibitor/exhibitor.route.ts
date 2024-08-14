import express from "express";
import {
  registerExhibitor,
  editExhibitorProfile,
  editExhibitorCoverImage,
  editExhibitorGallery,
  getExhibitorProfile,
} from "./exhibitor.controller";

import verifyToken from "../../../middleware/userVerify";

const exhibitorRouter = express.Router();

exhibitorRouter.post("/register", registerExhibitor);
exhibitorRouter.post("/profile", getExhibitorProfile);
exhibitorRouter.put("/edit", verifyToken, editExhibitorProfile);
exhibitorRouter.put("/cover-image", verifyToken, editExhibitorCoverImage);
exhibitorRouter.put("/gallery", verifyToken, editExhibitorGallery);

export default exhibitorRouter;
