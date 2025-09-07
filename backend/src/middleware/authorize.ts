import { Request, Response, NextFunction } from "express";
import { Role } from "../constants/roles";
import { AuthRequest } from "./auth";

export function authorize(roles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "forbidden" });
    }
    next();
  };
}
