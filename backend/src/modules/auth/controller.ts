import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addUser, getUserByUsername } from "../users/service";
import { Role } from "../../constants/roles";

export async function register(req: Request, res: Response) {
  const { username, password, role } = req.body as { username: string; password: string; role: Role };
  const hashed = await bcrypt.hash(password, 10);
  const user = addUser({ username, password: hashed, role });
  res.status(201).json({ id: user.id });
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  const user = getUserByUsername(username);
  if (!user) return res.status(400).json({ message: "invalid credentials" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "invalid credentials" });
  const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || "", { expiresIn: "1h" });
  res.json({ token });
}
