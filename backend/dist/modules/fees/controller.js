"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.payFee = payFee;
exports.getFees = getFees;
function payFee(req, res) {
    res.status(201).json({ message: "fee paid" });
}
function getFees(req, res) {
    res.json({ fees: [] });
}
