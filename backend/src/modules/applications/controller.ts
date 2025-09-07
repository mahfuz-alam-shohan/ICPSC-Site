import { Request, Response } from "express";

export function listApplications(req: Request, res: Response) {
  res.json({ applications: [] });
}

export function createApplication(req: Request, res: Response) {
  res.status(201).json({ message: "application created" });
}
