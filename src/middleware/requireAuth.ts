import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";

// Define an interface that extends the Request interface
interface CustomRequest extends Request {
  //as no question mark - was the reason of error
  user?: any; // Replace 'any' with the actual user data type
}

const requireAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "authorization token required" });
  }

  console.log(authorization, "authorization: requireAuth middleware");

  const token = authorization.split(" ")[1];
  //

  //
  try {
    const { _id } = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    //
    //this set to only send id - of the user - from all his details
    req.user = await User.findOne({ _id }).select("_id");
    //

    //
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export { requireAuth };
