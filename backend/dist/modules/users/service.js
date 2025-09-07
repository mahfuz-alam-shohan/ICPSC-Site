"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = addUser;
exports.getUserByUsername = getUserByUsername;
exports.listUsers = listUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
const users = [];
function addUser(data) {
    const user = { id: users.length + 1, ...data };
    users.push(user);
    return user;
}
function getUserByUsername(username) {
    return users.find(u => u.username === username);
}
function listUsers() {
    return users;
}
function updateUser(id, data) {
    const user = users.find(u => u.id === id);
    if (!user)
        return null;
    Object.assign(user, data);
    return user;
}
function deleteUser(id) {
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1)
        return false;
    users.splice(idx, 1);
    return true;
}
