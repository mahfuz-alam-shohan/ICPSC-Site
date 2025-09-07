import { Request, Response } from "express";

export function markAttendance(req: Request, res: Response) {
  res.status(201).json({ message: "attendance recorded" });
}

export function getAttendance(req: Request, res: Response) {
  res.json({ attendance: [] });
}
