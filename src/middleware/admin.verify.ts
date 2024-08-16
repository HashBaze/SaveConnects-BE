import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findAdmin } from "../app/modules/user/admin/admin.db.utills";

const verifyAdminToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(403)
        .send({ message: "JWT Authorization Header Missing" });
    }

    const token = authorization.split(" ")[1];
    const decoded = (await jwt.verify(token, `${process.env.JWT_SECRET}`)) as {
      _id: string,
      role: string
    };

    const admin = await findAdmin({_id: decoded._id});

    if (admin && admin.role === decoded.role) {
      next();
    } else {
      return res.status(403).send({ message: "Unauthorized you are not an admin" });
    }
  } catch (err) {
    return next("Protected route, error: " + err);
  }
};

export default verifyAdminToken;
