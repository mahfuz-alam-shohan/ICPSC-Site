"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listStudents = listStudents;
exports.createStudent = createStudent;
function listStudents(req, res) {
    res.json({ students: [] });
}
function createStudent(req, res) {
    res.status(201).json({ message: "student created" });
}
