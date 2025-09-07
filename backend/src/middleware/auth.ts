import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "../constants/roles";

export interface AuthPayload {
  sub: number;
  role: Role;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "missing authorization" });
  const token = header.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;
    const sub = typeof payload.sub === "string" ? parseInt(payload.sub, 10) : payload.sub;
    const role = payload.role as Role;
    if (!sub || !role) return res.status(401).json({ message: "invalid token" });
    req.user = { sub, role };
    next();
  } catch {
    res.status(401).json({ message: "invalid token" });
  }
}
