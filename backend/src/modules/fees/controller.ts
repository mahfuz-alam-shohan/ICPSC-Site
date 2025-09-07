import { Request, Response } from "express";

export function payFee(req: Request, res: Response) {
  res.status(201).json({ message: "fee paid" });
}

export function getFees(req: Request, res: Response) {
  res.json({ fees: [] });
}
