"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAttendance = markAttendance;
exports.getAttendance = getAttendance;
function markAttendance(req, res) {
    res.status(201).json({ message: "attendance recorded" });
}
function getAttendance(req, res) {
    res.json({ attendance: [] });
}
