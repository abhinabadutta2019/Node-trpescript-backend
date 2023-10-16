import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authoriztion } = req.headers;

  if (!authoriztion) {
    return res.status(401).json({ error: "authorization token required" });
  }

  const token = authoriztion.split(" ")[1];
  //
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET as string);
    //this set to only send id - of the user - from all his details
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export { requireAuth };
