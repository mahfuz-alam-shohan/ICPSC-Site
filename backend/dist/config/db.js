"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
const path_1 = __importDefault(require("path"));
const sqlite3_1 = __importDefault(require("sqlite3"));
let db = null;
function connect() {
    if (db)
        return db;
    const dbPath = path_1.default.join(__dirname, "../../database.sqlite");
    sqlite3_1.default.verbose();
    db = new sqlite3_1.default.Database(dbPath, (err) => {
        if (err) {
            console.error("Failed to connect to database", err);
        }
        else {
            console.log("Connected to SQLite database");
        }
    });
    return db;
}
exports.default = connect;
