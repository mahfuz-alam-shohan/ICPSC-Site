"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRegistrations = listRegistrations;
exports.createRegistration = createRegistration;
function listRegistrations(req, res) {
    res.json({ registrations: [] });
}
function createRegistration(req, res) {
    res.status(201).json({ message: "registration created" });
}
