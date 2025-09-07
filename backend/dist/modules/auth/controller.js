"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const service_1 = require("../users/service");
async function register(req, res) {
    const { username, password, role } = req.body;
    const hashed = await bcrypt_1.default.hash(password, 10);
    const user = (0, service_1.addUser)({ username, password: hashed, role });
    res.status(201).json({ id: user.id });
}
async function login(req, res) {
    const { username, password } = req.body;
    const user = (0, service_1.getUserByUsername)(username);
    if (!user)
        return res.status(400).json({ message: "invalid credentials" });
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match)
        return res.status(400).json({ message: "invalid credentials" });
    const token = jsonwebtoken_1.default.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || "", { expiresIn: "1h" });
    res.json({ token });
}
