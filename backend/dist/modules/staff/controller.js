"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listStaff = listStaff;
exports.createStaff = createStaff;
function listStaff(req, res) {
    res.json({ staff: [] });
}
function createStaff(req, res) {
    res.status(201).json({ message: "staff created" });
}
