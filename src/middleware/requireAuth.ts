import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "authorization token required" });
  }

  const token = authorization.split(" ")[1];
  //
  try {
    const { _id } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    //this set to only send id - of the user - from all his details
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export { requireAuth };
