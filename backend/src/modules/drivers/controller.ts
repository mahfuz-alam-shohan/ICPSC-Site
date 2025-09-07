import { Request, Response } from "express";

export function listDrivers(req: Request, res: Response) {
  res.json({ drivers: [] });
}

export function createDriver(req: Request, res: Response) {
  res.status(201).json({ message: "driver created" });
}
