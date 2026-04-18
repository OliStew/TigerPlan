# TigerPlan Backend

Node/Express API for the TigerPlan major/minor comparison tool.
Built with SQLite so there's no database server to set up — just clone and run.

---

## Setup

Make sure you have Node 20 installed. If you're on a newer version and hit install errors, run:
```
brew install node@20
echo 'export PATH="/opt/homebrew/opt/node@20/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Then from the `backend/` folder:

```bash
npm install       # install dependencies
npm run seed      # creates tigerplan.db and loads all course/program data
npm start         # starts the server on port 3000
```

You only need to run `npm run seed` once. After that just use `npm start`.

---

## Endpoints

### Programs

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/programs` | All programs (majors + minors) |
| GET | `/api/programs?type=major` | Filter to majors only |
| GET | `/api/programs?type=minor` | Filter to minors only |
| GET | `/api/programs/compare?first=X&second=Y` | Compare two programs |

### Courses

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/courses` | Full course catalog |
| GET | `/api/courses/:id` | Single course by ID |

---

## Compare Example

```
GET /api/programs/compare?first=Chemical Engineering&second=Environmental Engineering
```

```json
{
  "firstProgram": {
    "id": 2,
    "name": "Chemical Engineering",
    "type": "major",
    "department": "Engineering",
    "totalCredits": 128,
    "minGpa": 2.7
  },
  "secondProgram": {
    "id": 12,
    "name": "Environmental Engineering",
    "type": "major",
    "department": "Engineering",
    "totalCredits": 128,
    "minGpa": 2.5
  },
  "sharedCourses": [
    { "courseCode": "CHEM 1201", "title": "General Chemistry I", "creditHours": 3 },
    { "courseCode": "MATH 1550", "title": "Differential and Integral Calculus", "creditHours": 5 }
  ],
  "sharedCourseCount": 10,
  "sharedCreditTotal": 32
}
```

---

## Data

Seed data covers the 2025-2026 LSU catalog across three colleges:

**College of Engineering** — Biological Engineering, Chemical Engineering, Civil Engineering,
Computer Engineering, Computer Science (5 concentrations), Construction Management,
Electrical Engineering, Environmental Engineering, Industrial Engineering,
Mechanical Engineering, Petroleum Engineering

**College of Science** — Biochemistry, Biological Sciences, Chemistry, Geology,
Mathematics, Microbiology, Physics

**E.J. Ourso College of Business** — Accounting, Business Analytics, Economics,
Entrepreneurship, Finance, General Business, Information Systems and Analytics,
International Trade and Finance, Management, Marketing

**Minors** — Business Administration, Energy, Entrepreneurship, IT Management,
Mathematics, Statistics

354 total courses, 38 programs.

---

## File Structure

```
backend/
├── config/
│   └── db.js                   opens the SQLite connection
├── models/
│   ├── Course.js               course table + queries
│   └── Program.js              programs table + comparison logic
├── controllers/
│   ├── programController.js    handles HTTP for /api/programs
│   └── courseController.js     handles HTTP for /api/courses
├── routes/
│   ├── programs.js             route definitions for programs
│   └── courses.js              route definitions for courses
├── seed/
│   └── seed.js                 loads all LSU course/program data into the DB
├── server.js                   Express app entry point
└── package.json
```

---

## Notes for the Frontend Team

The programs endpoint is what powers the dropdowns on the Compare page.
Call it on page load and populate both `<select>` elements with `program.name`.

```js
fetch('http://localhost:3000/api/programs')
  .then(r => r.json())
  .then(programs => {
    // programs is an array sorted majors first, then minors, alphabetical
    // each item has: id, name, type, department, total_credits, min_gpa
  });
```

When both dropdowns have a value selected, call compare:

```js
const url = `/api/programs/compare?first=${encodeURIComponent(first)}&second=${encodeURIComponent(second)}`;
fetch(url)
  .then(r => r.json())
  .then(data => {
    // data.firstProgram  → left card (name, type, department, totalCredits, minGpa)
    // data.secondProgram → right card
    // data.sharedCourseCount + data.sharedCreditTotal → the banner text
    // data.sharedCourses → list of overlapping courses if you want to show them
  });
```

Note: program names with spaces need `encodeURIComponent()` so they don't break the URL.