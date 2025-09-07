"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
exports.createUser = createUser;
exports.patchUser = patchUser;
exports.removeUser = removeUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const service_1 = require("./service");
function getUsers(req, res) {
    res.json({ users: (0, service_1.listUsers)() });
}
async function createUser(req, res) {
    const { username, password, role } = req.body;
    const hashed = await bcrypt_1.default.hash(password, 10);
    const user = (0, service_1.addUser)({ username, password: hashed, role });
    res.status(201).json(user);
}
function patchUser(req, res) {
    const id = parseInt(req.params.id);
    const user = (0, service_1.updateUser)(id, req.body);
    if (!user)
        return res.status(404).json({ message: "not found" });
    res.json(user);
}
function removeUser(req, res) {
    const id = parseInt(req.params.id);
    const ok = (0, service_1.deleteUser)(id);
    if (!ok)
        return res.status(404).json({ message: "not found" });
    res.status(204).end();
}
