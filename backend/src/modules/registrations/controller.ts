import { Request, Response } from "express";

export function listRegistrations(req: Request, res: Response) {
  res.json({ registrations: [] });
}

export function createRegistration(req: Request, res: Response) {
  res.status(201).json({ message: "registration created" });
}
