"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoles = getRoles;
exports.createRole = createRole;
exports.deleteRole = deleteRole;
const service_1 = require("./service");
function getRoles(req, res) {
    res.json({ roles: (0, service_1.listRoles)() });
}
function createRole(req, res) {
    const { role } = req.body;
    res.status(201).json({ role: (0, service_1.addRole)(role) });
}
function deleteRole(req, res) {
    const { role } = req.params;
    (0, service_1.removeRole)(role);
    res.status(204).end();
}
