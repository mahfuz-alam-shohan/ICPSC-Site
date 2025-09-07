import { Request, Response } from "express";
import { listRoles, addRole, removeRole } from "./service";

export function getRoles(req: Request, res: Response) {
  res.json({ roles: listRoles() });
}

export function createRole(req: Request, res: Response) {
  const { role } = req.body;
  res.status(201).json({ role: addRole(role) });
}

export function deleteRole(req: Request, res: Response) {
  const { role } = req.params;
  removeRole(role);
  res.status(204).end();
}
