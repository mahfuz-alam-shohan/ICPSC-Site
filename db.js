import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

export const dbPromise = open({
  filename: './database.sqlite',
  driver: sqlite3.Database
}).then(async (db) => {
  await db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    role TEXT NOT NULL
  )`);
  return db;
});
