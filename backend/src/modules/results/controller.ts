import { Request, Response } from "express";

export function publishResult(req: Request, res: Response) {
  res.status(201).json({ message: "result published" });
}

export function getResult(req: Request, res: Response) {
  res.json({ results: [] });
}
