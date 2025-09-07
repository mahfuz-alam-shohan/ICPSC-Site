"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listDrivers = listDrivers;
exports.createDriver = createDriver;
function listDrivers(req, res) {
    res.json({ drivers: [] });
}
function createDriver(req, res) {
    res.status(201).json({ message: "driver created" });
}
