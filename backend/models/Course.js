const db = require('../config/db');

// Course handles all the database stuff for the courses table.
// Instead of writing raw SQL in multiple places, everything goes through here.

class Course {

  // run once at startup to make sure the table exists
  static createTable() {
    db.exec(`
      CREATE TABLE IF NOT EXISTS courses (
        id           INTEGER PRIMARY KEY AUTOINCREMENT,
        course_code  TEXT    NOT NULL UNIQUE,
        title        TEXT    NOT NULL,
        credit_hours INTEGER NOT NULL
      )
    `);
  }

  // INSERT OR IGNORE means if the course already exists it just skips it
  // so running seed.js twice won't cause errors
  static insert({ courseCode, title, creditHours }) {
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO courses (course_code, title, credit_hours)
      VALUES (?, ?, ?)
    `);
    return stmt.run(courseCode, title, creditHours);
  }

  // returns every course, sorted by course code (CSC before MATH before PHYS etc.)
  static findAll() {
    return db.prepare('SELECT * FROM courses ORDER BY course_code').all();
  }

  // used by GET /api/courses/:id
  static findById(id) {
    return db.prepare('SELECT * FROM courses WHERE id = ?').get(id);
  }

  // used by seed.js link() helper to look up a course ID by its code
  static findByCode(courseCode) {
    return db.prepare('SELECT * FROM courses WHERE course_code = ?').get(courseCode);
  }
}

module.exports = Course;
