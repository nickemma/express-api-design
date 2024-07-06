import jwt, { Secret } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import AuthorizedRequest from "../types/customRequest";

const secretKey = process.env.JWT_SECRET;

const protect = async (
  req: AuthorizedRequest<any>,
  res: Response,
  next: NextFunction
) => {
  // Get token from header
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ message: "Access denied" });
  }

  const token = bearer.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey as Secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;