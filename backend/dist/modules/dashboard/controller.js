"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDashboard = userDashboard;
exports.adminDashboard = adminDashboard;
function userDashboard(req, res) {
    res.json({ message: `User dashboard for ${req.user?.role}` });
}
function adminDashboard(req, res) {
    res.json({ message: "Admin dashboard" });
}
