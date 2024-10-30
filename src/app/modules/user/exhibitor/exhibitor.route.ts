import express from "express";
import {
  registerExhibitor,
  editExhibitorProfile,
  editExhibitorCoverImage,
  addGalleryImage,
  editExhibitorGallery,
  getExhibitorProfile,
  addAttendee,
  editAttendee,
  deleteAttendee,
  checkCompanyNameKey,
  editGalleryList,
  rankUsers,
} from "./exhibitor.controller";

import verifyUserToken from "../../../../middleware/user.verify";

const exhibitorRouter = express.Router();

exhibitorRouter.post("/register", registerExhibitor);
exhibitorRouter.get("/profile", getExhibitorProfile);
exhibitorRouter.put("/edit", verifyUserToken, editExhibitorProfile);
exhibitorRouter.put("/cover-image", verifyUserToken, editExhibitorCoverImage);
exhibitorRouter.post("/add-gallery-image", verifyUserToken, addGalleryImage);
exhibitorRouter.put("/gallery", verifyUserToken, editExhibitorGallery);
exhibitorRouter.post("/add-attendee", verifyUserToken, addAttendee);
exhibitorRouter.put("/edit-attendee", verifyUserToken, editAttendee);
exhibitorRouter.delete("/delete-attendee", verifyUserToken, deleteAttendee);
exhibitorRouter.post("/check-company-name-key", checkCompanyNameKey);
exhibitorRouter.put("/edit-gallery-list", verifyUserToken, editGalleryList);
exhibitorRouter.get("/ranked-email-recods",rankUsers);

export default exhibitorRouter;