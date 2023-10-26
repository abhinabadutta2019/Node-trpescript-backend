import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json();
    }
    const authHeader = req.headers.authorization;

    const token = authHeader.split(" ")[1];

    await jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    console.log(err);
    res.json();
  }
};
