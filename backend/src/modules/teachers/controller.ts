import { Request, Response } from "express";

export function listTeachers(req: Request, res: Response) {
  res.json({ teachers: [] });
}

export function createTeacher(req: Request, res: Response) {
  res.status(201).json({ message: "teacher created" });
}
