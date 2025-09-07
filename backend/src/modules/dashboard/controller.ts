import { Response } from "express";
import { AuthRequest } from "../../middleware/auth";

export function userDashboard(req: AuthRequest, res: Response) {
  res.json({ message: `User dashboard for ${req.user?.role}` });
}

export function adminDashboard(req: AuthRequest, res: Response) {
  res.json({ message: "Admin dashboard" });
}
