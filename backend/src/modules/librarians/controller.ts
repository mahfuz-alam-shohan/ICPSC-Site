import { Request, Response } from "express";

export function listLibrarians(req: Request, res: Response) {
  res.json({ librarians: [] });
}

export function createLibrarian(req: Request, res: Response) {
  res.status(201).json({ message: "librarian created" });
}
