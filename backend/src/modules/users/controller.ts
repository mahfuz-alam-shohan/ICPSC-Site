import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { listUsers, addUser, updateUser, deleteUser } from "./service";

export function getUsers(req: Request, res: Response) {
  res.json({ users: listUsers() });
}

export async function createUser(req: Request, res: Response) {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = addUser({ username, password: hashed, role });
  res.status(201).json(user);
}

export function patchUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const user = updateUser(id, req.body);
  if (!user) return res.status(404).json({ message: "not found" });
  res.json(user);
}

export function removeUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const ok = deleteUser(id);
  if (!ok) return res.status(404).json({ message: "not found" });
  res.status(204).end();
}
