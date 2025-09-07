"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishResult = publishResult;
exports.getResult = getResult;
function publishResult(req, res) {
    res.status(201).json({ message: "result published" });
}
function getResult(req, res) {
    res.json({ results: [] });
}
