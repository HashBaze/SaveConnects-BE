import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findExhibitor } from "../app/modules/user/exhibitor/exhibitor.db.utills";

const verifyUserToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(403)
        .send({ message: "JWT Authorization Header Missing" });
    }

    const token = authorization.split(" ")[1];
    const decoded = (await jwt.verify(token, `${process.env.JWT_SECRET}`)) as {
      _id: string;
    };

    const exhibitor = await findExhibitor({_id: decoded._id});

    if (exhibitor) {
      next();
    } else {
      return res.status(403).send({ message: "Unauthorized" });
    }
  } catch (err) {
    return next("Protected route, error: " + err);
  }
};

export default verifyUserToken;
