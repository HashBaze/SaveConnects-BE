import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Exhibitor } from "../app/modules/exhibitor/exhibitor.model";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
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

    const { _id } = decoded;

    const exhibitor = await Exhibitor.findOne({ _id: req.body });

    if (exhibitor) {
      if (exhibitor.userId.toString() !== _id) {
        return res.status(403).send({ message: "Unauthorized" });
      }
      next();
    } else {
      return res.status(403).send({ message: "Unauthorized" });
    }
  } catch (err) {
    return next("Protected route, error: " + err);
  }
};

export default verifyToken;
