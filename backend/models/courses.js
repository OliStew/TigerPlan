// models/Course.js
//
// OOP Design:
// Course is a class that encapsulates all database operations
// for the courses table. Instead of writing raw SQL everywhere,
// callers use Course.findAll(), Course.findById(), etc.
//
// This pattern is called the "Active Record" pattern —
// the model knows how to read/write itself from the database.

const db = require('../config/db');

class Course {

  /**
   * Create the courses table if it doesn't already exist.
   * Called once at startup from seed.js.
   *
   * Columns:
   *   id          - auto-increment primary key
   *   course_code - unique identifier like "CSC 3380"
   *   title       - full name like "Object Oriented Design"
   *   credit_hours - 1, 3, 4, or 5
   */
  static createTable() {
    db.exec(`
      CREATE TABLE IF NOT EXISTS courses (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        course_code TEXT    NOT NULL UNIQUE,
        title       TEXT    NOT NULL,
        credit_hours INTEGER NOT NULL
      )
    `);
  }

  /**
   * Insert a course. Skips silently if course_code already exists.
   * "INSERT OR IGNORE" is SQLite's version of ON CONFLICT DO NOTHING.
   *
   * @param {Object} course - { courseCode, title, creditHours }
   */
  static insert({ courseCode, title, creditHours }) {
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO courses (course_code, title, credit_hours)
      VALUES (?, ?, ?)
    `);
    return stmt.run(courseCode, title, creditHours);
  }

  /**
   * Return every course in the catalog.
   * Used by GET /api/courses
   */
  static findAll() {
    return db.prepare('SELECT * FROM courses ORDER BY course_code').all();
  }

  /**
   * Find one course by its numeric ID.
   * Used by GET /api/courses/:id
   */
  static findById(id) {
    return db.prepare('SELECT * FROM courses WHERE id = ?').get(id);
  }

  /**
   * Find one course by its code (e.g. "CSC 3380").
   * Used internally by seed.js to look up IDs for relationships.
   */
  static findByCode(courseCode) {
    return db.prepare('SELECT * FROM courses WHERE course_code = ?').get(courseCode);
  }
}

module.exports = Course;