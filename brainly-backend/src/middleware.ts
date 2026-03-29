import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

const JWT_PASS = process.env.JWT_PASS as string;

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers["authorization"];
  if (!header) {
    return res.status(403).json({
      message: "No Token Provided",
    });
  }
  const token = header.split(" ")[1]; // Bearer TOKEN
  if (!token) {
    return res.status(403).json({
      message: "Invalid token format",
    });
  }
  try {
    const decoded = jwt.verify(token!, JWT_PASS);
    if (decoded) {
      //@ts-ignore
      (req as any).userId = decoded.id;
      next();
    }
  } catch (e) {
    return res.status(403).json({
      message: "Invalid or expired Token",
    });
  }
};
