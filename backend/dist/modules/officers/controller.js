"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOfficers = listOfficers;
exports.createOfficer = createOfficer;
function listOfficers(req, res) {
    res.json({ officers: [] });
}
function createOfficer(req, res) {
    res.status(201).json({ message: "officer created" });
}
