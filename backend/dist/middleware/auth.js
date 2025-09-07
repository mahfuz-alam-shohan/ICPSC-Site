"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ message: "missing authorization" });
    const token = header.split(" ")[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        const sub = typeof payload.sub === "string" ? parseInt(payload.sub, 10) : payload.sub;
        const role = payload.role;
        if (!sub || !role)
            return res.status(401).json({ message: "invalid token" });
        req.user = { sub, role };
        next();
    }
    catch {
        res.status(401).json({ message: "invalid token" });
    }
}
