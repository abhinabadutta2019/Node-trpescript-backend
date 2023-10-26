import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json();
    }
    const authHeader = req.headers.authorization;

    // console.log(authHeader, "authHeader from middleware");
    const token = authHeader.split(" ")[1];

    const result = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    // console.log(result, "result");
    const userID = result._id;

    const user = await User.findOne({ _id: userID });
    console.log(user, "user");

    if (!user) {
      return res.status(401).json();
    }

    // console.log(_id, "_id");
    next();
    //
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export { verifyJWT };
