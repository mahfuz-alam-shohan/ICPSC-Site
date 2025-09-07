import path from "path";
import sqlite3 from "sqlite3";

let db: sqlite3.Database | null = null;

export function connect(): sqlite3.Database {
  if (db) return db;

  const dbPath = path.join(__dirname, "../../database.sqlite");
  sqlite3.verbose();
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error("Failed to connect to database", err);
    } else {
      console.log("Connected to SQLite database");
    }
  });

  return db;
}

export default connect;
