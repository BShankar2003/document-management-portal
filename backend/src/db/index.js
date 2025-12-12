const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'documents.db');

// Debug logs
console.log("📌 DB module loaded");
console.log("📌 Expected DB path:", dbPath);
console.log("📌 DB exists:", fs.existsSync(dbPath));

try {
  const db = new Database(dbPath);
  console.log("✅ SQLite DB successfully initialized");
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_name TEXT NOT NULL,
      stored_name TEXT NOT NULL UNIQUE,
      filepath TEXT NOT NULL,
      filesize INTEGER NOT NULL,
      created_at TEXT NOT NULL
    )
  `);

  console.log("✅ Table check/creation completed");

  module.exports = db;

} catch (err) {
  console.error("🔥 ERROR INITIALIZING DB:", err.message);
  throw err;
}
