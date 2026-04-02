const db = require('../config/db');

// Program handles the programs table and the program_courses join table.
// The join table is the key to the whole comparison feature —
// it's what lets us ask "what courses do these two programs share?"

class Program {

  // creates both tables — programs and the join table program_courses
  static createTable() {
    db.exec(`
      CREATE TABLE IF NOT EXISTS programs (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        name          TEXT    NOT NULL UNIQUE,
        type          TEXT    NOT NULL CHECK(type IN ('major', 'minor')),
        department    TEXT    NOT NULL,
        total_credits INTEGER NOT NULL,
        min_gpa       REAL    NOT NULL DEFAULT 2.0
      )
    `);

    // each row here means "this program requires this course"
    // PRIMARY KEY on both columns prevents duplicates
    db.exec(`
      CREATE TABLE IF NOT EXISTS program_courses (
        program_id INTEGER NOT NULL REFERENCES programs(id),
        course_id  INTEGER NOT NULL REFERENCES courses(id),
        PRIMARY KEY (program_id, course_id)
      )
    `);
  }

  static insert({ name, type, department, totalCredits, minGpa = 2.0 }) {
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO programs (name, type, department, total_credits, min_gpa)
      VALUES (?, ?, ?, ?, ?)
    `);
    return stmt.run(name, type, department, totalCredits, minGpa);
  }

  // adds a row to program_courses linking a program to one of its required courses
  static addCourse(programId, courseId) {
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO program_courses (program_id, course_id)
      VALUES (?, ?)
    `);
    return stmt.run(programId, courseId);
  }

  // returns all programs for the dropdowns on the compare page
  // majors first, then minors, alphabetical within each group
  static findAll() {
    return db.prepare(`
      SELECT * FROM programs ORDER BY type DESC, name ASC
    `).all();
  }

  static findByType(type) {
    return db.prepare(`
      SELECT * FROM programs WHERE type = ? ORDER BY name ASC
    `).all(type);
  }

  // case-insensitive lookup — the frontend sends whatever the dropdown value is
  static findByName(name) {
    return db.prepare(`
      SELECT * FROM programs WHERE LOWER(name) = LOWER(?)
    `).get(name);
  }

  // gets all courses linked to a program through the join table
  // this is called for both programs during a comparison
  static getCoursesForProgram(programId) {
    return db.prepare(`
      SELECT c.id, c.course_code, c.title, c.credit_hours
      FROM courses c
      JOIN program_courses pc ON c.id = pc.course_id
      WHERE pc.program_id = ?
      ORDER BY c.course_code
    `).all(programId);
  }

  // the main comparison logic
  // loads both programs' course lists, finds what's in both, sums the shared credits
  static compare(firstName, secondName) {
    const first  = Program.findByName(firstName);
    const second = Program.findByName(secondName);

    if (!first)  throw new Error(`Program not found: ${firstName}`);
    if (!second) throw new Error(`Program not found: ${secondName}`);

    const firstCourses  = Program.getCoursesForProgram(first.id);
    const secondCourses = Program.getCoursesForProgram(second.id);

    // put all of program B's course IDs into a Set so lookup is O(1)
    const secondIds = new Set(secondCourses.map(c => c.id));

    // filter program A's courses to only the ones that also appear in program B
    const sharedCourses = firstCourses.filter(c => secondIds.has(c.id));

    const sharedCreditTotal = sharedCourses.reduce(
      (sum, c) => sum + c.credit_hours, 0
    );

    return {
      firstProgram: {
        id:           first.id,
        name:         first.name,
        type:         first.type,
        department:   first.department,
        totalCredits: first.total_credits,
        minGpa:       first.min_gpa
      },
      secondProgram: {
        id:           second.id,
        name:         second.name,
        type:         second.type,
        department:   second.department,
        totalCredits: second.total_credits,
        minGpa:       second.min_gpa
      },
      sharedCourses: sharedCourses.map(c => ({
        courseCode:  c.course_code,
        title:       c.title,
        creditHours: c.credit_hours
      })),
      sharedCourseCount: sharedCourses.length,
      sharedCreditTotal
    };
  }
}

module.exports = Program;
