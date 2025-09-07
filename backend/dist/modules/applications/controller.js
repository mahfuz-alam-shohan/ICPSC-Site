"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listApplications = listApplications;
exports.createApplication = createApplication;
function listApplications(req, res) {
    res.json({ applications: [] });
}
function createApplication(req, res) {
    res.status(201).json({ message: "application created" });
}
