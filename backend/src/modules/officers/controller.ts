import { Request, Response } from "express";

export function listOfficers(req: Request, res: Response) {
  res.json({ officers: [] });
}

export function createOfficer(req: Request, res: Response) {
  res.status(201).json({ message: "officer created" });
}
