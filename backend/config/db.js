const Database = require('better-sqlite3');
const path = require('path');

// points to tigerplan.db in the project root
// better-sqlite3 creates the file automatically if it doesn't exist
const DB_PATH = path.join(__dirname, '..', 'tigerplan.db');

const db = new Database(DB_PATH);

// SQLite turns off foreign keys by default, this turns them on
// so we can't accidentally add a program_course row for a program that doesn't exist
db.pragma('foreign_keys = ON');

module.exports = db;
