import { Request, Response } from "express";

export function listStaff(req: Request, res: Response) {
  res.json({ staff: [] });
}

export function createStaff(req: Request, res: Response) {
  res.status(201).json({ message: "staff created" });
}
