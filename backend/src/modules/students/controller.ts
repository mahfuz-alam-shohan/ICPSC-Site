import { Request, Response } from "express";

export function listStudents(req: Request, res: Response) {
  res.json({ students: [] });
}

export function createStudent(req: Request, res: Response) {
  res.status(201).json({ message: "student created" });
}
