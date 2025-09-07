"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listLibrarians = listLibrarians;
exports.createLibrarian = createLibrarian;
function listLibrarians(req, res) {
    res.json({ librarians: [] });
}
function createLibrarian(req, res) {
    res.status(201).json({ message: "librarian created" });
}
