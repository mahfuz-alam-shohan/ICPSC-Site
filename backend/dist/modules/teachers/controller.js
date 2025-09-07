"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTeachers = listTeachers;
exports.createTeacher = createTeacher;
function listTeachers(req, res) {
    res.json({ teachers: [] });
}
function createTeacher(req, res) {
    res.status(201).json({ message: "teacher created" });
}
