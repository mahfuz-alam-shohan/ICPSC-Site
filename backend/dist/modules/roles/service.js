"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRoles = listRoles;
exports.addRole = addRole;
exports.removeRole = removeRole;
let roles = ["admin", "teacher", "student", "librarian", "staff", "driver", "officer"];
function listRoles() {
    return roles;
}
function addRole(role) {
    if (!roles.includes(role))
        roles.push(role);
    return role;
}
function removeRole(role) {
    roles = roles.filter(r => r !== role);
}
