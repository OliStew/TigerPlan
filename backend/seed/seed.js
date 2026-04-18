// seed/seed.js
//
// LSU 2025-2026 Catalog — Complete Course & Program Seed
// Covers: College of Engineering (11 programs)
//         College of Science (7 programs)
//         E.J. Ourso College of Business (10 programs)
//
// Sources:
//   Engineering: Official 2025-2026 flowchart PDFs (lsu.edu/eng/docs/Flowcharts/2025-2026/)
//   Science:     2025-2026 General Catalog (catalog.lsu.edu, catoid=33)
//   Business:    2025-2026 General Catalog (catalog.lsu.edu, catoid=33)
//   CS:          2025-2026 General Catalog (catoid=33, poid=13745)
//
// Run: npm run seed
// Idempotent: INSERT OR IGNORE — safe to re-run

const Course  = require('../models/Course');
const Program = require('../models/Program');

console.log('=== TigerPlan Seed — 2025-2026 Catalog ===\n');
console.log('Creating tables...');
Course.createTable();
Program.createTable();

// ─────────────────────────────────────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────────────────────────────────────

function link(programName, courseCodes) {
  const program = Program.findByName(programName);
  if (!program) { console.warn(`  WARN: Program not found — "${programName}"`); return; }
  let linked = 0;
  courseCodes.forEach(code => {
    const course = Course.findByCode(code);
    if (!course) { console.warn(`  WARN: Course not found — "${code}" (${programName})`); return; }
    Program.addCourse(program.id, course.id);
    linked++;
  });
  console.log(`  ✓ ${programName} — ${linked} courses linked`);
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1 — COURSES
// Every distinct course across all three colleges.
// course_code is UNIQUE; shared courses stored once.
// ─────────────────────────────────────────────────────────────────────────────

console.log('\n── Seeding courses ──────────────────────────────────────────');

const courses = [

  // ── MATH ──────────────────────────────────────────────────────────────────
  { courseCode: 'MATH 1021', title: 'College Algebra',                                      creditHours: 3 },
  { courseCode: 'MATH 1022', title: 'Trigonometry',                                         creditHours: 3 },
  { courseCode: 'MATH 1023', title: 'College Algebra and Trigonometry',                     creditHours: 3 },
  { courseCode: 'MATH 1431', title: 'Applied Calculus',                                     creditHours: 3 },
  { courseCode: 'MATH 1550', title: 'Differential and Integral Calculus',                   creditHours: 5 },
  { courseCode: 'MATH 1552', title: 'Analytic Geometry and Calculus II',                    creditHours: 4 },
  { courseCode: 'MATH 2057', title: 'Multivariable Calculus',                               creditHours: 3 },
  { courseCode: 'MATH 2065', title: 'Elementary Differential Equations',                    creditHours: 3 },
  { courseCode: 'MATH 2070', title: 'Mathematical Methods in Engineering',                  creditHours: 4 },
  { courseCode: 'MATH 2085', title: 'Linear Algebra',                                       creditHours: 3 },
  { courseCode: 'MATH 2090', title: 'Elementary Differential Equations and Linear Algebra', creditHours: 4 },
  { courseCode: 'MATH 3355', title: 'Probability',                                          creditHours: 3 },
  { courseCode: 'MATH 3903', title: 'Introduction to Higher Mathematics',                   creditHours: 3 },
  { courseCode: 'MATH 4031', title: 'Advanced Calculus I',                                  creditHours: 3 },
  { courseCode: 'MATH 4032', title: 'Advanced Calculus II',                                 creditHours: 3 },
  { courseCode: 'MATH 4036', title: 'Complex Variables',                                    creditHours: 3 },
  { courseCode: 'MATH 4153', title: 'Abstract Algebra I',                                   creditHours: 3 },
  { courseCode: 'MATH 4154', title: 'Abstract Algebra II',                                  creditHours: 3 },
  { courseCode: 'MATH 4200', title: 'Topology',                                             creditHours: 3 },
  { courseCode: 'MATH 4325', title: 'Introduction to Numerical Analysis',                   creditHours: 3 },
  { courseCode: 'MATH 4345', title: 'Mathematical Modeling',                                creditHours: 3 },
  { courseCode: 'MATH 4023', title: 'Applied Mathematics for Scientists',                   creditHours: 3 },
  { courseCode: 'MATH 4025', title: 'Applied Linear Algebra',                               creditHours: 3 },
  { courseCode: 'MATH 4171', title: 'Graph Theory',                                         creditHours: 3 },
  { courseCode: 'MATH 4172', title: 'Combinatorics',                                        creditHours: 3 },

  // ── ENGLISH ───────────────────────────────────────────────────────────────
  { courseCode: 'ENGL 1001', title: 'English Composition I',  creditHours: 3 },
  { courseCode: 'ENGL 2000', title: 'English Composition II', creditHours: 3 },

  // ── PHYSICS ───────────────────────────────────────────────────────────────
  { courseCode: 'PHYS 1201', title: 'Physics for Scientists and Engineers I',         creditHours: 3 },
  { courseCode: 'PHYS 1202', title: 'Physics for Scientists and Engineers II',        creditHours: 3 },
  { courseCode: 'PHYS 2001', title: 'Physics for Scientists I',                       creditHours: 3 },
  { courseCode: 'PHYS 2002', title: 'Physics for Scientists II',                      creditHours: 3 },
  { courseCode: 'PHYS 2108', title: 'General Physics Lab',                            creditHours: 1 },
  { courseCode: 'PHYS 2110', title: 'General Physics I (Mechanics)',                  creditHours: 3 },
  { courseCode: 'PHYS 2112', title: 'General Physics II (Thermodynamics and Waves)',  creditHours: 3 },
  { courseCode: 'PHYS 2113', title: 'General Physics III (Electromagnetism)',         creditHours: 3 },
  { courseCode: 'PHYS 2221', title: 'Modern Physics',                                 creditHours: 3 },
  { courseCode: 'PHYS 3201', title: 'Classical Mechanics',                            creditHours: 3 },
  { courseCode: 'PHYS 3301', title: 'Electricity and Magnetism I',                   creditHours: 3 },
  { courseCode: 'PHYS 3302', title: 'Electricity and Magnetism II',                  creditHours: 3 },
  { courseCode: 'PHYS 4125', title: 'Thermodynamics and Statistical Mechanics',       creditHours: 3 },
  { courseCode: 'PHYS 4200', title: 'Introduction to Quantum Mechanics',              creditHours: 3 },

  // ── CHEMISTRY ─────────────────────────────────────────────────────────────
  { courseCode: 'CHEM 1001', title: 'Chemistry for Non-Science Majors',        creditHours: 3 },
  { courseCode: 'CHEM 1201', title: 'General Chemistry I',                     creditHours: 3 },
  { courseCode: 'CHEM 1202', title: 'General Chemistry II',                    creditHours: 3 },
  { courseCode: 'CHEM 1212', title: 'General Chemistry Lab',                   creditHours: 2 },
  { courseCode: 'CHEM 1421', title: 'General Chemistry for Engineers',         creditHours: 3 },
  { courseCode: 'CHEM 2060', title: 'Organic Chemistry for Non-Majors',        creditHours: 3 },
  { courseCode: 'CHEM 2261', title: 'Organic Chemistry I',                     creditHours: 3 },
  { courseCode: 'CHEM 2262', title: 'Organic Chemistry II',                    creditHours: 3 },
  { courseCode: 'CHEM 2264', title: 'Organic Chemistry Lab',                   creditHours: 2 },
  { courseCode: 'CHEM 3361', title: 'Physical Chemistry I',                    creditHours: 3 },
  { courseCode: 'CHEM 3362', title: 'Physical Chemistry II',                   creditHours: 3 },
  { courseCode: 'CHEM 3363', title: 'Physical Chemistry Lab',                  creditHours: 1 },
  { courseCode: 'CHEM 3492', title: 'Physical Chemistry II (for ChE)',         creditHours: 3 },
  { courseCode: 'CHEM 4001', title: 'Advanced Inorganic Chemistry',            creditHours: 3 },
  { courseCode: 'CHEM 4111', title: 'Biochemistry I',                          creditHours: 3 },
  { courseCode: 'CHEM 4141', title: 'Analytical Chemistry',                    creditHours: 3 },
  { courseCode: 'CHEM 4142', title: 'Analytical Chemistry Lab',                creditHours: 2 },

  // ── BIOLOGY ───────────────────────────────────────────────────────────────
  { courseCode: 'BIOL 1001', title: 'Principles of Biology',                   creditHours: 3 },
  { courseCode: 'BIOL 1201', title: 'Biology for Science Majors I',            creditHours: 3 },
  { courseCode: 'BIOL 1202', title: 'Biology for Science Majors II',           creditHours: 3 },
  { courseCode: 'BIOL 1208', title: 'Biology Lab I',                           creditHours: 1 },
  { courseCode: 'BIOL 1209', title: 'Biology Lab II',                          creditHours: 1 },
  { courseCode: 'BIOL 2051', title: 'Genetics',                                creditHours: 3 },
  { courseCode: 'BIOL 2083', title: 'Biochemistry for Life Sciences',          creditHours: 3 },
  { courseCode: 'BIOL 2160', title: 'Microbiology',                            creditHours: 3 },
  { courseCode: 'BIOL 3040', title: 'Cell Biology',                            creditHours: 3 },
  { courseCode: 'BIOL 3090', title: 'General Ecology',                         creditHours: 3 },
  { courseCode: 'BIOL 3200', title: 'Evolution',                               creditHours: 3 },
  { courseCode: 'BIOL 3201', title: 'Animal Physiology',                       creditHours: 3 },
  { courseCode: 'BIOL 3300', title: 'Plant Biology',                           creditHours: 3 },
  { courseCode: 'BIOL 4100', title: 'Molecular Biology',                       creditHours: 3 },
  { courseCode: 'BIOL 4150', title: 'Developmental Biology',                   creditHours: 3 },
  { courseCode: 'BIOL 4170', title: 'Immunology',                              creditHours: 3 },
  { courseCode: 'BIOL 4500', title: 'Neurobiology',                            creditHours: 3 },

  // ── GEOLOGY ───────────────────────────────────────────────────────────────
  { courseCode: 'GEOL 1001', title: 'Physical Geology',                        creditHours: 3 },
  { courseCode: 'GEOL 1003', title: 'Environmental Geology',                   creditHours: 3 },
  { courseCode: 'GEOL 1601', title: 'Geology Lab',                             creditHours: 1 },
  { courseCode: 'GEOL 2005', title: 'Historical Geology',                      creditHours: 3 },
  { courseCode: 'GEOL 2020', title: 'Energy Resources and the Environment',    creditHours: 3 },
  { courseCode: 'GEOL 3010', title: 'Mineralogy',                              creditHours: 3 },
  { courseCode: 'GEOL 3030', title: 'Petrology',                               creditHours: 3 },
  { courseCode: 'GEOL 3060', title: 'Structural Geology',                      creditHours: 3 },
  { courseCode: 'GEOL 4005', title: 'Stratigraphy',                            creditHours: 3 },
  { courseCode: 'GEOL 4060', title: 'Geomorphology',                           creditHours: 3 },
  { courseCode: 'GEOL 4080', title: 'Hydrogeology',                            creditHours: 3 },
  { courseCode: 'GEOL 4100', title: 'Geophysics',                              creditHours: 3 },

  // ── ASTRONOMY ─────────────────────────────────────────────────────────────
  { courseCode: 'ASTR 1101', title: 'Introduction to Astronomy',               creditHours: 3 },
  { courseCode: 'ASTR 1102', title: 'Introduction to Astronomy II',            creditHours: 3 },

  // ── ECONOMICS ─────────────────────────────────────────────────────────────
  { courseCode: 'ECON 2000', title: 'Principles of Microeconomics',            creditHours: 3 },
  { courseCode: 'ECON 2010', title: 'Principles of Macroeconomics',            creditHours: 3 },
  { courseCode: 'ECON 2030', title: 'Economics Principles (Combined)',         creditHours: 3 },
  { courseCode: 'ECON 3000', title: 'Intermediate Microeconomics',             creditHours: 3 },
  { courseCode: 'ECON 3010', title: 'Intermediate Macroeconomics',             creditHours: 3 },
  { courseCode: 'ECON 3100', title: 'Statistics for Economics',                creditHours: 3 },
  { courseCode: 'ECON 3200', title: 'Econometrics',                            creditHours: 3 },
  { courseCode: 'ECON 4320', title: 'Energy Economics',                        creditHours: 3 },
  { courseCode: 'ECON 4325', title: 'Environmental Economics',                 creditHours: 3 },

  // ── ACCOUNTING ────────────────────────────────────────────────────────────
  { courseCode: 'ACCT 2000', title: 'Survey of Accounting',                    creditHours: 3 },
  { courseCode: 'ACCT 2001', title: 'Introduction to Financial Accounting',    creditHours: 3 },
  { courseCode: 'ACCT 2101', title: 'Introduction to Managerial Accounting',   creditHours: 3 },
  { courseCode: 'ACCT 3001', title: 'Intermediate Accounting I',               creditHours: 3 },
  { courseCode: 'ACCT 3025', title: 'Cost Accounting',                         creditHours: 3 },
  { courseCode: 'ACCT 3121', title: 'Intermediate Accounting II',              creditHours: 3 },
  { courseCode: 'ACCT 3221', title: 'Advanced Financial Accounting',           creditHours: 3 },
  { courseCode: 'ACCT 3233', title: 'Income Tax',                              creditHours: 3 },
  { courseCode: 'ACCT 4021', title: 'Auditing',                                creditHours: 3 },
  { courseCode: 'ACCT 4200', title: 'Accounting Information Systems',          creditHours: 3 },
  { courseCode: 'ACCT 4421', title: 'Advanced Accounting',                     creditHours: 3 },
  { courseCode: 'ACCT 4501', title: 'Petroleum Accounting',                    creditHours: 3 },

  // ── FINANCE ───────────────────────────────────────────────────────────────
  { courseCode: 'FIN 3715',  title: 'Business Finance',                        creditHours: 3 },
  { courseCode: 'FIN 3716',  title: 'Financial Analysis and Valuation',        creditHours: 3 },
  { courseCode: 'FIN 3718',  title: 'Energy Finance',                          creditHours: 3 },
  { courseCode: 'FIN 3751',  title: 'Money and Banking',                       creditHours: 3 },
  { courseCode: 'FIN 3801',  title: 'Investments',                             creditHours: 3 },
  { courseCode: 'FIN 3830',  title: 'Financial Institutions Management',       creditHours: 3 },
  { courseCode: 'FIN 3851',  title: 'Real Estate',                             creditHours: 3 },
  { courseCode: 'FIN 4351',  title: 'International Finance',                   creditHours: 3 },
  { courseCode: 'FIN 4720',  title: 'Advanced Corporate Finance',              creditHours: 3 },
  { courseCode: 'FIN 4810',  title: 'Fixed Income Securities',                 creditHours: 3 },

  // ── MANAGEMENT ────────────────────────────────────────────────────────────
  { courseCode: 'MGT 3200',  title: 'Principles of Management',                creditHours: 3 },
  { courseCode: 'MGT 3210',  title: 'Human Resource Management',               creditHours: 3 },
  { courseCode: 'MGT 3220',  title: 'Organizational Behavior',                 creditHours: 3 },
  { courseCode: 'MGT 3850',  title: 'Business Law',                            creditHours: 3 },
  { courseCode: 'MGT 4200',  title: 'Strategic Management',                    creditHours: 3 },
  { courseCode: 'MGT 4210',  title: 'Negotiation and Conflict Resolution',     creditHours: 3 },
  { courseCode: 'MGT 4400',  title: 'International Management',                creditHours: 3 },

  // ── MARKETING ─────────────────────────────────────────────────────────────
  { courseCode: 'MKT 3401',  title: 'Principles of Marketing',                 creditHours: 3 },
  { courseCode: 'MKT 3413',  title: 'Consumer Behavior',                       creditHours: 3 },
  { courseCode: 'MKT 3431',  title: 'Marketing Research',                      creditHours: 3 },
  { courseCode: 'MKT 3441',  title: 'Advertising and Promotion',               creditHours: 3 },
  { courseCode: 'MKT 3461',  title: 'Sales Management',                        creditHours: 3 },
  { courseCode: 'MKT 4420',  title: 'Digital Marketing',                       creditHours: 3 },
  { courseCode: 'MKT 4450',  title: 'International Marketing',                 creditHours: 3 },
  { courseCode: 'MKT 4480',  title: 'Marketing Strategy',                      creditHours: 3 },

  // ── ISDS (Information Systems & Decision Sciences) ────────────────────────
  { courseCode: 'ISDS 1100', title: 'Management Information Systems',          creditHours: 3 },
  { courseCode: 'ISDS 1102', title: 'Business Computing',                      creditHours: 3 },
  { courseCode: 'ISDS 3100', title: 'Production and Operations Management',    creditHours: 3 },
  { courseCode: 'ISDS 3105', title: 'Data Management',                         creditHours: 3 },
  { courseCode: 'ISDS 3115', title: 'Systems Analysis and Design',             creditHours: 3 },
  { courseCode: 'ISDS 3120', title: 'Business Data Communications',            creditHours: 3 },
  { courseCode: 'ISDS 4110', title: 'Database Administration',                 creditHours: 3 },
  { courseCode: 'ISDS 4111', title: 'Enterprise Resource Planning',            creditHours: 3 },
  { courseCode: 'ISDS 4112', title: 'Information Security Management',         creditHours: 3 },
  { courseCode: 'ISDS 4113', title: 'IT Project Management',                   creditHours: 3 },
  { courseCode: 'ISDS 4118', title: 'Business Intelligence',                   creditHours: 3 },
  { courseCode: 'ISDS 4120', title: 'Network Management',                      creditHours: 3 },
  { courseCode: 'ISDS 4123', title: 'Cloud Computing for Business',            creditHours: 3 },
  { courseCode: 'ISDS 4141', title: 'Data Analytics',                          creditHours: 3 },
  { courseCode: 'ISDS 4160', title: 'Energy Information Systems',              creditHours: 3 },

  // ── GENERAL BUSINESS / ENTREPRENEURSHIP / INTL ───────────────────────────
  { courseCode: 'GBUS 3061', title: 'Business Communication and Professional Development', creditHours: 3 },
  { courseCode: 'BLAW 3201', title: 'Legal Environment of Business',           creditHours: 3 },
  { courseCode: 'ENTR 3000', title: 'Introduction to Entrepreneurship',        creditHours: 3 },
  { courseCode: 'ENTR 4000', title: 'Entrepreneurial Finance',                 creditHours: 3 },
  { courseCode: 'ENTR 4050', title: 'New Venture Creation',                    creditHours: 3 },
  { courseCode: 'ENTR 4100', title: 'Innovation Management',                   creditHours: 3 },
  { courseCode: 'INTB 4000', title: 'International Business Strategy',         creditHours: 3 },
  { courseCode: 'INTB 4200', title: 'International Trade',                     creditHours: 3 },
  { courseCode: 'INTB 4300', title: 'Global Supply Chain Management',          creditHours: 3 },

  // ── STATISTICS / EXST ─────────────────────────────────────────────────────
  { courseCode: 'EXST 2201', title: 'Introduction to Statistical Analysis',    creditHours: 4 },
  { courseCode: 'IE 3302',   title: 'Engineering Statistics',                  creditHours: 3 },

  // ── COMMUNICATIONS / SOCIAL SCIENCE ──────────────────────────────────────
  { courseCode: 'CMST 1061', title: 'Public Speaking',                         creditHours: 3 },
  { courseCode: 'CMST 2060', title: 'Business and Professional Communication', creditHours: 3 },
  { courseCode: 'PHIL 2020', title: 'Ethics',                                  creditHours: 3 },
  { courseCode: 'AGEC 2003', title: 'Agricultural Economics',                  creditHours: 3 },

  // ── COMPUTER SCIENCE ──────────────────────────────────────────────────────
  { courseCode: 'CSC 1253',  title: 'Introduction to Computer Science',             creditHours: 3 },
  { courseCode: 'CSC 1254',  title: 'Introduction to Computer Science II',          creditHours: 3 },
  { courseCode: 'CSC 1350',  title: 'Computer Science I for Majors',                creditHours: 4 },
  { courseCode: 'CSC 1351',  title: 'Computer Science II for Majors',               creditHours: 4 },
  { courseCode: 'CSC 2259',  title: 'Discrete Structures',                          creditHours: 3 },
  { courseCode: 'CSC 2262',  title: 'Numerical Methods',                            creditHours: 3 },
  { courseCode: 'CSC 2362',  title: 'Introduction to Cybersecurity',                creditHours: 3 },
  { courseCode: 'CSC 2610',  title: 'Cloud Fundamentals and Web Programming',       creditHours: 3 },
  { courseCode: 'CSC 2730',  title: 'Data Science and Analytics',                   creditHours: 3 },
  { courseCode: 'CSC 3102',  title: 'Advanced Data Structures and Algorithm Analysis', creditHours: 3 },
  { courseCode: 'CSC 3200',  title: 'Ethics in Computing',                          creditHours: 1 },
  { courseCode: 'CSC 3304',  title: 'Introduction to Systems Programming',          creditHours: 3 },
  { courseCode: 'CSC 3380',  title: 'Object Oriented Design',                       creditHours: 3 },
  { courseCode: 'CSC 3501',  title: 'Computer Organization and Design',             creditHours: 3 },
  { courseCode: 'CSC 3730',  title: 'Machine Learning and Data Analytics',          creditHours: 3 },
  { courseCode: 'CSC 4101',  title: 'Programming Languages',                        creditHours: 3 },
  { courseCode: 'CSC 4103',  title: 'Operating Systems',                            creditHours: 3 },
  { courseCode: 'CSC 4330',  title: 'Software Systems Development',                 creditHours: 3 },
  { courseCode: 'CSC 4332',  title: 'Software Quality and Testing',                 creditHours: 3 },
  { courseCode: 'CSC 4343',  title: 'Applied Deep Learning',                        creditHours: 3 },
  { courseCode: 'CSC 4351',  title: 'Compiler Construction',                        creditHours: 3 },
  { courseCode: 'CSC 4360',  title: 'Malware Analysis and Reverse Engineering',     creditHours: 3 },
  { courseCode: 'CSC 4362',  title: 'Software Vulnerabilities and Exploitation',    creditHours: 3 },
  { courseCode: 'CSC 4402',  title: 'Database Systems',                             creditHours: 3 },
  { courseCode: 'CSC 4501',  title: 'Computer Networks',                            creditHours: 3 },
  { courseCode: 'CSC 4562',  title: 'Mobile Security and Applied Cryptography',     creditHours: 3 },
  { courseCode: 'CSC 4610',  title: 'Cloud Systems and Virtualization',             creditHours: 3 },
  { courseCode: 'CSC 4740',  title: 'Big Data Technologies',                        creditHours: 3 },

  // ── ELECTRICAL ENGINEERING ────────────────────────────────────────────────
  { courseCode: 'EE 1810',   title: 'Introduction to Electrical Engineering',       creditHours: 2 },
  { courseCode: 'EE 2120',   title: 'Electric Circuits I',                          creditHours: 3 },
  { courseCode: 'EE 2130',   title: 'Electric Circuits II',                         creditHours: 3 },
  { courseCode: 'EE 2230',   title: 'Electronics I',                               creditHours: 3 },
  { courseCode: 'EE 2231',   title: 'Electronics I Lab',                            creditHours: 2 },
  { courseCode: 'EE 2741',   title: 'Digital Logic Design I',                       creditHours: 3 },
  { courseCode: 'EE 2742',   title: 'Digital Logic Design II',                      creditHours: 2 },
  { courseCode: 'EE 2810',   title: 'ECE Tools',                                    creditHours: 2 },
  { courseCode: 'EE 2950',   title: 'Computational Methods for Electrical Engineers', creditHours: 3 },
  { courseCode: 'EE 3150',   title: 'Probability and Random Variables',             creditHours: 3 },
  { courseCode: 'EE 3160',   title: 'Digital Signal Processing',                   creditHours: 3 },
  { courseCode: 'EE 3320',   title: 'Electromagnetic Fields',                       creditHours: 3 },
  { courseCode: 'EE 3410',   title: 'Electric Power',                               creditHours: 3 },
  { courseCode: 'EE 3530',   title: 'Controls Engineering',                         creditHours: 3 },
  { courseCode: 'EE 3610',   title: 'Signals and Systems',                          creditHours: 3 },
  { courseCode: 'EE 3710',   title: 'Communications in Computing',                  creditHours: 3 },
  { courseCode: 'EE 3740',   title: 'Discrete Mathematics for EE',                  creditHours: 3 },
  { courseCode: 'EE 3752',   title: 'Microprocessors and Lab',                      creditHours: 3 },
  { courseCode: 'EE 3755',   title: 'Computer Organization',                        creditHours: 3 },
  { courseCode: 'EE 3950',   title: 'Electronics for Mechanical Engineers',         creditHours: 2 },
  { courseCode: 'EE 4720',   title: 'Computer Architecture',                        creditHours: 3 },
  { courseCode: 'EE 4755',   title: 'Hardware Description Language and Digital Design', creditHours: 3 },
  { courseCode: 'EE 4810',   title: 'Senior Design I',                              creditHours: 3 },
  { courseCode: 'EE 4820',   title: 'Senior Design II',                             creditHours: 3 },

  // ── CIVIL ENGINEERING ─────────────────────────────────────────────────────
  { courseCode: 'CE 2200',   title: 'Fluid Mechanics',                              creditHours: 3 },
  { courseCode: 'CE 2250',   title: 'Fluid Mechanics Lab',                          creditHours: 1 },
  { courseCode: 'CE 2450',   title: 'Engineering Statics',                          creditHours: 3 },
  { courseCode: 'CE 2460',   title: 'Engineering Dynamics',                         creditHours: 3 },
  { courseCode: 'CE 2700',   title: 'Introduction to Civil Engineering',            creditHours: 1 },
  { courseCode: 'CE 3300',   title: 'Geotechnical Engineering',                     creditHours: 3 },
  { courseCode: 'CE 3350',   title: 'Geotechnical Engineering Lab',                 creditHours: 1 },
  { courseCode: 'CE 3400',   title: 'Engineering Materials',                        creditHours: 3 },
  { courseCode: 'CE 3410',   title: 'Materials Lab',                               creditHours: 1 },
  { courseCode: 'CE 3415',   title: 'Structural Analysis',                          creditHours: 3 },
  { courseCode: 'CE 3500',   title: 'Surveying',                                    creditHours: 3 },
  { courseCode: 'CE 3600',   title: 'Highway Engineering',                          creditHours: 3 },
  { courseCode: 'CE 3700',   title: 'Engineering Materials Lab',                    creditHours: 1 },
  { courseCode: 'CE 4200',   title: 'Hydrology',                                    creditHours: 3 },
  { courseCode: 'CE 4250',   title: 'Groundwater Engineering',                      creditHours: 3 },
  { courseCode: 'CE 4410',   title: 'Principles of Construction',                   creditHours: 3 },
  { courseCode: 'CE 4750',   title: 'Professional Issues in Civil Engineering',     creditHours: 2 },

  // ── ENVIRONMENTAL ENGINEERING ─────────────────────────────────────────────
  { courseCode: 'EVEG 1050', title: 'Introduction to Environmental Engineering',   creditHours: 1 },
  { courseCode: 'EVEG 2000', title: 'Environmental Engineering I',                 creditHours: 3 },
  { courseCode: 'EVEG 2050', title: 'Environmental Engineering Design I',          creditHours: 1 },
  { courseCode: 'EVEG 3050', title: 'Global Environmental Issues',                 creditHours: 1 },
  { courseCode: 'EVEG 3110', title: 'Wastewater Treatment',                        creditHours: 3 },
  { courseCode: 'EVEG 3120', title: 'Environmental Kinetics',                      creditHours: 3 },
  { courseCode: 'EVEG 3145', title: 'Environmental Engineering III',               creditHours: 3 },
  { courseCode: 'EVEG 3200', title: 'Water Resources Engineering',                 creditHours: 3 },
  { courseCode: 'EVEG 3400', title: 'Environmental Engineering II',                creditHours: 3 },
  { courseCode: 'EVEG 4105', title: 'Quantitative Water Management',               creditHours: 3 },
  { courseCode: 'EVEG 4110', title: 'Unit Operations Lab',                         creditHours: 1 },
  { courseCode: 'EVEG 4120', title: 'Solid and Hazardous Waste',                   creditHours: 3 },
  { courseCode: 'EVEG 4125', title: 'Environmental Transport',                     creditHours: 3 },
  { courseCode: 'EVEG 4136', title: 'Water Quality Lab',                           creditHours: 1 },
  { courseCode: 'EVEG 4150', title: 'Senior Design I',                             creditHours: 3 },
  { courseCode: 'EVEG 4151', title: 'Senior Design II',                            creditHours: 3 },

  // ── CHEMICAL ENGINEERING ──────────────────────────────────────────────────
  { courseCode: 'CHE 1100',  title: 'Introduction to Chemical Engineering',         creditHours: 1 },
  { courseCode: 'CHE 2171',  title: 'Material and Energy Balances',                 creditHours: 4 },
  { courseCode: 'CHE 2172',  title: 'Chemical Engineering Thermodynamics',          creditHours: 3 },
  { courseCode: 'CHE 2176',  title: 'Numerical Methods and Programming for ChE',   creditHours: 4 },
  { courseCode: 'CHE 3101',  title: 'Momentum Transfer',                            creditHours: 3 },
  { courseCode: 'CHE 3102',  title: 'Heat and Mass Transfer',                       creditHours: 4 },
  { courseCode: 'CHE 3104',  title: 'Measurements Lab (Junior Lab)',                creditHours: 3 },
  { courseCode: 'CHE 3171',  title: 'Introduction to Design and Safety',            creditHours: 3 },
  { courseCode: 'CHE 3173',  title: 'Heterogeneous Equilibria',                     creditHours: 3 },
  { courseCode: 'CHE 3190',  title: 'Reaction Engineering',                         creditHours: 3 },
  { courseCode: 'CHE 4151',  title: 'Unit Operations Design',                       creditHours: 4 },
  { courseCode: 'CHE 4162',  title: 'Unit Operations Lab (Senior Lab)',             creditHours: 3 },
  { courseCode: 'CHE 4172',  title: 'Process Design',                               creditHours: 4 },
  { courseCode: 'CHE 4198',  title: 'Process Dynamics and Controls',                creditHours: 3 },
  { courseCode: 'CHE 4253',  title: 'Pollution Control',                            creditHours: 3 },

  // ── BIOLOGICAL ENGINEERING ────────────────────────────────────────────────
  { courseCode: 'BE 1251',   title: 'Engineering Methods',                          creditHours: 2 },
  { courseCode: 'BE 1252',   title: 'Biological Engineering Systems',               creditHours: 2 },
  { courseCode: 'BE 2350',   title: 'Experimental Methods',                         creditHours: 3 },
  { courseCode: 'BE 2352',   title: 'Quantitative Biological Engineering',          creditHours: 3 },
  { courseCode: 'BE 3320',   title: 'Machine Design for Biological Systems',        creditHours: 3 },
  { courseCode: 'BE 3340',   title: 'Process Design for Biological Systems',        creditHours: 3 },
  { courseCode: 'BE 4303',   title: 'Biological Materials',                         creditHours: 3 },
  { courseCode: 'BE 4352',   title: 'Transport Phenomena in Biological Systems',    creditHours: 3 },
  { courseCode: 'BE 4390',   title: 'Senior Engineering Design I',                  creditHours: 3 },
  { courseCode: 'BE 4392',   title: 'Senior Engineering Design II',                 creditHours: 3 },

  // ── MECHANICAL ENGINEERING ────────────────────────────────────────────────
  { courseCode: 'ME 1212',   title: 'ME Design Fundamentals',                       creditHours: 2 },
  { courseCode: 'ME 1222',   title: 'ME Innovation and Entrepreneurship',           creditHours: 2 },
  { courseCode: 'ME 2334',   title: 'Thermodynamics',                               creditHours: 4 },
  { courseCode: 'ME 2543',   title: 'Simulation Methods',                           creditHours: 3 },
  { courseCode: 'ME 2733',   title: 'Materials Science',                            creditHours: 3 },
  { courseCode: 'ME 3133',   title: 'Dynamics',                                     creditHours: 3 },
  { courseCode: 'ME 3333',   title: 'Thermodynamics II',                            creditHours: 3 },
  { courseCode: 'ME 3603',   title: 'Instrumentation and Measurement',              creditHours: 3 },
  { courseCode: 'ME 3633',   title: 'Manufacturing Processes',                      creditHours: 3 },
  { courseCode: 'ME 3701',   title: 'Materials Lab',                               creditHours: 1 },
  { courseCode: 'ME 3752',   title: 'Materials Selection and Engineering Practice', creditHours: 2 },
  { courseCode: 'ME 3834',   title: 'Fluid Mechanics',                              creditHours: 4 },
  { courseCode: 'ME 4133',   title: 'Machine Design I — Kinematics',               creditHours: 3 },
  { courseCode: 'ME 4183',   title: 'Controls Engineering',                         creditHours: 3 },
  { courseCode: 'ME 4201',   title: 'Machine Design Lab',                           creditHours: 1 },
  { courseCode: 'ME 4202',   title: 'Design II',                                    creditHours: 2 },
  { courseCode: 'ME 4243',   title: 'Design I',                                     creditHours: 3 },
  { courseCode: 'ME 4244',   title: 'Machine Design II — Components',               creditHours: 4 },
  { courseCode: 'ME 4433',   title: 'Heat Transfer',                                creditHours: 3 },
  { courseCode: 'ME 4611',   title: 'Thermal Systems Lab',                          creditHours: 1 },
  { courseCode: 'ME 4621',   title: 'Thermal Science Lab',                          creditHours: 1 },

  // ── PETROLEUM ENGINEERING ─────────────────────────────────────────────────
  { courseCode: 'PETE 1010', title: 'Introduction to Petroleum Engineering',        creditHours: 2 },
  { courseCode: 'PETE 2031', title: 'Rock Properties',                              creditHours: 3 },
  { courseCode: 'PETE 2032', title: 'Fluid Properties',                             creditHours: 3 },
  { courseCode: 'PETE 2034', title: 'Rock and Fluid Properties Lab',                creditHours: 1 },
  { courseCode: 'PETE 2061', title: 'PETE Data Visualization',                      creditHours: 2 },
  { courseCode: 'PETE 3025', title: 'Petroleum Economics',                          creditHours: 3 },
  { courseCode: 'PETE 3036', title: 'Well Logging',                                 creditHours: 3 },
  { courseCode: 'PETE 3037', title: 'Field Operations',                             creditHours: 1 },
  { courseCode: 'PETE 3050', title: 'Reservoir Dynamics',                           creditHours: 3 },
  { courseCode: 'PETE 3053', title: 'Subsurface Geology for Engineers',             creditHours: 3 },
  { courseCode: 'PETE 3061', title: 'Computational Methods',                        creditHours: 3 },
  { courseCode: 'PETE 3085', title: 'Production Engineering',                       creditHours: 3 },
  { courseCode: 'PETE 4045', title: 'Drilling Engineering',                         creditHours: 3 },
  { courseCode: 'PETE 4047', title: 'Well Completions',                             creditHours: 3 },
  { courseCode: 'PETE 4051', title: 'Reservoir Management',                         creditHours: 3 },
  { courseCode: 'PETE 4056', title: 'Reservoir Simulation',                         creditHours: 3 },
  { courseCode: 'PETE 4058', title: 'Reservoir Mechanics Lab',                      creditHours: 1 },
  { courseCode: 'PETE 4059', title: 'Mud Lab',                                      creditHours: 1 },
  { courseCode: 'PETE 4060', title: 'Blowout Prevention',                           creditHours: 1 },
  { courseCode: 'PETE 4998', title: 'Senior Project I',                             creditHours: 1 },
  { courseCode: 'PETE 4999', title: 'Senior Project II',                            creditHours: 1 },

  // ── INDUSTRIAL ENGINEERING ────────────────────────────────────────────────
  { courseCode: 'IE 2060',   title: 'Programming for Industrial Engineers',         creditHours: 3 },
  { courseCode: 'IE 3201',   title: 'Engineering Economy',                          creditHours: 3 },
  { courseCode: 'IE 3302',   title: 'Engineering Statistics',                       creditHours: 3 },
  { courseCode: 'IE 3303',   title: 'Statistical Quality Control',                  creditHours: 3 },
  { courseCode: 'IE 4001',   title: 'Operations Research I',                        creditHours: 3 },
  { courseCode: 'IE 4102',   title: 'Simulation',                                   creditHours: 3 },
  { courseCode: 'IE 4201',   title: 'Engineering Management',                       creditHours: 3 },
  { courseCode: 'IE 4401',   title: 'Human Factors Engineering',                    creditHours: 3 },
  { courseCode: 'IE 4426',   title: 'Supply Chain Engineering',                     creditHours: 3 },
  { courseCode: 'IE 4461',   title: 'Systems Engineering',                          creditHours: 3 },
  { courseCode: 'IE 4462',   title: 'Risk Analysis',                                creditHours: 3 },
  { courseCode: 'IE 4466',   title: 'Cybersecurity Risk Management',                creditHours: 3 },

  // ── CONSTRUCTION MANAGEMENT ───────────────────────────────────────────────
  { courseCode: 'CM 1011',   title: 'Introduction to Construction Management',      creditHours: 3 },
  { courseCode: 'CM 1070',   title: 'Introduction to Sustainable Development',      creditHours: 3 },
  { courseCode: 'CM 1112',   title: 'Construction Materials and Methods I',         creditHours: 3 },
  { courseCode: 'CM 2105',   title: 'Construction Surveying',                       creditHours: 3 },
  { courseCode: 'CM 2112',   title: 'Construction Materials and Methods II',        creditHours: 3 },
  { courseCode: 'CM 2113',   title: 'Construction Equipment',                       creditHours: 3 },
  { courseCode: 'CM 2116',   title: 'Construction Plan Reading',                    creditHours: 3 },
  { courseCode: 'CM 2215',   title: 'Construction Safety',                          creditHours: 3 },
  { courseCode: 'CM 2501',   title: 'Structural Principles and Practices',          creditHours: 3 },
  { courseCode: 'CM 3111',   title: 'Construction Estimating',                      creditHours: 3 },
  { courseCode: 'CM 3112',   title: 'Building Information Modeling',                creditHours: 3 },
  { courseCode: 'CM 3201',   title: 'Mechanical and Electrical Systems',            creditHours: 3 },
  { courseCode: 'CM 3502',   title: 'Construction and Civil Materials',             creditHours: 3 },
  { courseCode: 'CM 3503',   title: 'Soils in Construction',                        creditHours: 3 },
  { courseCode: 'CM 3504',   title: 'Applied Structural Design',                    creditHours: 3 },
  { courseCode: 'CM 4101',   title: 'Construction Scheduling and Cost Control',     creditHours: 3 },
  { courseCode: 'CM 4202',   title: 'Construction Enterprise',                      creditHours: 3 },
  { courseCode: 'CM 4211',   title: 'Construction Contracting',                     creditHours: 3 },
  { courseCode: 'CM 4221',   title: 'Construction Project Management',              creditHours: 3 },

  // ── MICROBIOLOGY (College of Science) ────────────────────────────────────
  { courseCode: 'MICR 2051', title: 'General Microbiology',                         creditHours: 3 },
  { courseCode: 'MICR 2053', title: 'General Microbiology Lab',                     creditHours: 1 },
  { courseCode: 'MICR 3055', title: 'Microbial Physiology',                         creditHours: 3 },
  { courseCode: 'MICR 4058', title: 'Microbial Genetics',                           creditHours: 3 },
  { courseCode: 'MICR 4059', title: 'Immunology',                                   creditHours: 3 },
  { courseCode: 'MICR 4060', title: 'Virology',                                     creditHours: 3 },
];

courses.forEach(c => Course.insert(c));
console.log(`  ✓ ${courses.length} courses inserted`);

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2 — PROGRAMS
// ─────────────────────────────────────────────────────────────────────────────

console.log('\n── Seeding programs ─────────────────────────────────────────');

const programs = [
  // ── COLLEGE OF ENGINEERING ────────────────────────────────────────────────
  { name: 'Biological Engineering',                          type: 'major', department: 'Engineering', totalCredits: 128, minGpa: 2.5 },
  { name: 'Chemical Engineering',                            type: 'major', department: 'Engineering', totalCredits: 128, minGpa: 2.7 },
  { name: 'Civil Engineering',                               type: 'major', department: 'Engineering', totalCredits: 120, minGpa: 2.5 },
  { name: 'Computer Engineering',                            type: 'major', department: 'Engineering', totalCredits: 127, minGpa: 2.0 },
  { name: 'Computer Science - Cloud Computing and Networking',type: 'major', department: 'Engineering', totalCredits: 120, minGpa: 2.5 },
  { name: 'Computer Science - Cybersecurity',                type: 'major', department: 'Engineering', totalCredits: 120, minGpa: 2.5 },
  { name: 'Computer Science - Data Science and Analytics',   type: 'major', department: 'Engineering', totalCredits: 120, minGpa: 2.5 },
  { name: 'Computer Science - Second Discipline',            type: 'major', department: 'Engineering', totalCredits: 120, minGpa: 2.5 },
  { name: 'Computer Science - Software Engineering',         type: 'major', department: 'Engineering', totalCredits: 120, minGpa: 2.5 },
  { name: 'Construction Management',                         type: 'major', department: 'Engineering', totalCredits: 124, minGpa: 2.0 },
  { name: 'Electrical Engineering',                          type: 'major', department: 'Engineering', totalCredits: 127, minGpa: 2.0 },
  { name: 'Environmental Engineering',                       type: 'major', department: 'Engineering', totalCredits: 128, minGpa: 2.5 },
  { name: 'Industrial Engineering',                          type: 'major', department: 'Engineering', totalCredits: 128, minGpa: 2.0 },
  { name: 'Mechanical Engineering',                          type: 'major', department: 'Engineering', totalCredits: 128, minGpa: 2.8 },
  { name: 'Petroleum Engineering',                           type: 'major', department: 'Engineering', totalCredits: 128, minGpa: 2.8 },

  // ── COLLEGE OF SCIENCE ────────────────────────────────────────────────────
  { name: 'Biochemistry',                                    type: 'major', department: 'Science', totalCredits: 122, minGpa: 2.0 },
  { name: 'Biological Sciences',                             type: 'major', department: 'Science', totalCredits: 120, minGpa: 2.0 },
  { name: 'Chemistry',                                       type: 'major', department: 'Science', totalCredits: 120, minGpa: 2.0 },
  { name: 'Geology',                                         type: 'major', department: 'Science', totalCredits: 120, minGpa: 2.0 },
  { name: 'Mathematics',                                     type: 'major', department: 'Science', totalCredits: 120, minGpa: 2.0 },
  { name: 'Microbiology',                                    type: 'major', department: 'Science', totalCredits: 120, minGpa: 2.0 },
  { name: 'Physics',                                         type: 'major', department: 'Science', totalCredits: 122, minGpa: 2.0 },

  // ── E.J. OURSO COLLEGE OF BUSINESS ────────────────────────────────────────
  { name: 'Accounting',                                      type: 'major', department: 'Business', totalCredits: 120, minGpa: 2.7 },
  { name: 'Business Analytics',                              type: 'major', department: 'Business', totalCredits: 120, minGpa: 2.6 },
  { name: 'Economics',                                       type: 'major', department: 'Business', totalCredits: 120, minGpa: 2.6 },
  { name: 'Entrepreneurship',                                type: 'major', department: 'Business', totalCredits: 120, minGpa: 2.6 },
  { name: 'Finance',                                         type: 'major', department: 'Business', totalCredits: 120, minGpa: 3.0 },
  { name: 'General Business',                                type: 'major', department: 'Business', totalCredits: 120, minGpa: 2.6 },
  { name: 'Information Systems and Analytics',               type: 'major', department: 'Business', totalCredits: 120, minGpa: 2.6 },
  { name: 'International Trade and Finance',                 type: 'major', department: 'Business', totalCredits: 120, minGpa: 2.6 },
  { name: 'Management',                                      type: 'major', department: 'Business', totalCredits: 120, minGpa: 2.6 },
  { name: 'Marketing',                                       type: 'major', department: 'Business', totalCredits: 120, minGpa: 2.6 },

  // ── MINORS ────────────────────────────────────────────────────────────────
  { name: 'Business Administration Minor',                   type: 'minor', department: 'Business',  totalCredits: 18, minGpa: 2.0 },
  { name: 'Mathematics Minor',                               type: 'minor', department: 'Science',   totalCredits: 18, minGpa: 2.0 },
  { name: 'Statistics Minor',                                type: 'minor', department: 'Science',   totalCredits: 18, minGpa: 2.0 },
  { name: 'IT Management Minor',                             type: 'minor', department: 'Business',  totalCredits: 18, minGpa: 2.0 },
  { name: 'Energy Minor',                                    type: 'minor', department: 'Business',  totalCredits: 15, minGpa: 2.0 },
  { name: 'Entrepreneurship Minor',                          type: 'minor', department: 'Business',  totalCredits: 15, minGpa: 2.0 },
];

programs.forEach(p => Program.insert(p));
console.log(`  ✓ ${programs.length} programs inserted`);

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3 — LINK COURSES TO PROGRAMS
// Source: 2025-2026 official flowcharts and catalog pages (fetched directly)
// ─────────────────────────────────────────────────────────────────────────────

console.log('\n── Linking courses to programs ──────────────────────────────');

// ══ ENGINEERING ══════════════════════════════════════════════════════════════

// Biological Engineering (128 hrs) — from be_2025-2026flowchart.pdf
link('Biological Engineering', [
  'MATH 1550','MATH 1552','MATH 2065',
  'ENGL 1001','ENGL 2000',
  'PHYS 2110','PHYS 2113',
  'CHEM 1201','CHEM 1202','CHEM 1212','CHEM 2261',
  'BIOL 1201','BIOL 1202','BIOL 1208','BIOL 1209','BIOL 2051','BIOL 2083',
  'CE 2450','CE 2460','CE 2200','CE 3400',
  'ME 3333',
  'EE 2950',
  'AGEC 2003',
  'BE 1251','BE 1252','BE 2350','BE 2352',
  'BE 3320','BE 3340',
  'BE 4303','BE 4352','BE 4390','BE 4392',
]);

// Chemical Engineering (128 hrs) — from che_flowchart2025-2026.pdf
link('Chemical Engineering', [
  'MATH 1550','MATH 1552','MATH 2057','MATH 2090',
  'ENGL 1001','ENGL 2000',
  'PHYS 2110','PHYS 2113',
  'CHEM 1201','CHEM 1202','CHEM 1212','CHEM 2261','CHEM 2262','CHEM 3492',
  'BIOL 1201',
  'ME 2733',
  'ECON 2030',
  'CHE 2171','CHE 2172','CHE 2176',
  'CHE 3101','CHE 3102','CHE 3104','CHE 3171','CHE 3173','CHE 3190',
  'CHE 4151','CHE 4162','CHE 4172','CHE 4198',
]);

// Civil Engineering (120 hrs) — from ce_25-26.pdf
link('Civil Engineering', [
  'MATH 1550','MATH 1552','MATH 2057','MATH 2065',
  'ENGL 1001','ENGL 2000',
  'PHYS 2110','PHYS 2112',
  'CHEM 1201','CHEM 1202',
  'GEOL 1001',
  'ECON 2030',
  'EXST 2201',
  'EE 2950',
  'CE 2200','CE 2250','CE 2450','CE 2460','CE 2700',
  'CE 3300','CE 3350','CE 3400','CE 3410','CE 3415','CE 3500','CE 3600','CE 3700',
  'CE 4200','CE 4410','CE 4750',
  'EVEG 3110','EVEG 3200',
]);

// Computer Engineering (127 hrs) — from eec_flowchart25-26.pdf
link('Computer Engineering', [
  'MATH 1550','MATH 1552','MATH 2057','MATH 2070',
  'ENGL 1001','ENGL 2000',
  'PHYS 2110','PHYS 2108','PHYS 2113',
  'CHEM 1201',
  'PHIL 2020',
  'CSC 1253','CSC 1254','CSC 3102','CSC 4103',
  'EE 1810','EE 2120','EE 2130','EE 2230','EE 2231',
  'EE 2741','EE 2742','EE 2810',
  'EE 3150','EE 3710','EE 3740','EE 3752','EE 3755',
  'EE 4720','EE 4810','EE 4820',
]);

// Electrical Engineering (127 hrs) — from ee_flowchart25-26.pdf
link('Electrical Engineering', [
  'MATH 1550','MATH 1552','MATH 2057','MATH 2070',
  'ENGL 1001','ENGL 2000',
  'PHYS 2110','PHYS 2108','PHYS 2113',
  'CHEM 1201',
  'PHIL 2020',
  'CSC 1253',
  'EE 1810','EE 2120','EE 2130','EE 2230','EE 2231',
  'EE 2741','EE 2742','EE 2810',
  'EE 3150','EE 3320','EE 3610',
  'EE 4810','EE 4820',
]);

// Environmental Engineering (128 hrs) — from eveg_2025-26flowchart.pdf
link('Environmental Engineering', [
  'MATH 1550','MATH 1552','MATH 2065',
  'ENGL 1001','ENGL 2000',
  'PHYS 2110','PHYS 2112',
  'CHEM 1201','CHEM 1202','CHEM 1212','CHEM 2060',
  'BIOL 1201','BIOL 1208',
  'GEOL 1001',
  'ECON 2030',
  'EXST 2201',
  'CE 2200','CE 2250','CE 2450','CE 3300','CE 3350','CE 4200','CE 4250',
  'EVEG 1050','EVEG 2000','EVEG 2050','EVEG 3050',
  'EVEG 3110','EVEG 3120','EVEG 3145','EVEG 3200','EVEG 3400',
  'EVEG 4105','EVEG 4110','EVEG 4120','EVEG 4125','EVEG 4136','EVEG 4150','EVEG 4151',
  'CHE 4253',
]);

// Mechanical Engineering (127-128 hrs) — from flowchart_me_25-26_rev2.pdf
link('Mechanical Engineering', [
  'MATH 1550','MATH 1552','MATH 2057','MATH 2070',
  'ENGL 1001','ENGL 2000',
  'PHYS 2110','PHYS 2113',
  'CHEM 1201','CHEM 1202',
  'ECON 2030',
  'CE 2450',
  'EE 2950','EE 3950',
  'ME 1212','ME 1222','ME 2334','ME 2543','ME 2733',
  'ME 3133','ME 3603','ME 3633','ME 3701','ME 3752','ME 3834',
  'ME 4133','ME 4183','ME 4201','ME 4202','ME 4243','ME 4244',
  'ME 4433','ME 4611','ME 4621',
]);

// Petroleum Engineering (128 hrs) — from pete_25-26.pdf
link('Petroleum Engineering', [
  'MATH 1550','MATH 1552','MATH 2065',
  'ENGL 1001','ENGL 2000',
  'PHYS 2110','PHYS 2112','PHYS 2113',
  'CHEM 1201','CHEM 1202','CHEM 1212',
  'GEOL 1001','GEOL 1601',
  'ECON 2030',
  'CE 2200','CE 2450','CE 3400',
  'ME 3333',
  'PETE 1010','PETE 2031','PETE 2032','PETE 2034','PETE 2061',
  'PETE 3025','PETE 3036','PETE 3037','PETE 3050','PETE 3053','PETE 3061','PETE 3085',
  'PETE 4045','PETE 4047','PETE 4051','PETE 4056','PETE 4058','PETE 4059','PETE 4060',
  'PETE 4998','PETE 4999',
]);

// Construction Management (123-125 hrs) — from cm_2025-2026_flowchart_campus.pdf
link('Construction Management', [
  'MATH 1022','MATH 1431',
  'ENGL 1001','ENGL 2000',
  'PHYS 2001','PHYS 2002',
  'ECON 2030',
  'ACCT 2000',
  'BLAW 3201',
  'FIN 3715',
  'MGT 3200',
  'MKT 3401',
  'ISDS 1100',
  'CMST 1061',
  'CM 1011','CM 1070','CM 1112','CM 2105','CM 2112','CM 2113','CM 2116','CM 2215','CM 2501',
  'CM 3111','CM 3112','CM 3201','CM 3502','CM 3503','CM 3504',
  'CM 4101','CM 4202','CM 4211','CM 4221',
]);

// Industrial Engineering (128 hrs) — curriculum from catalog/dept page
// IE flowchart PDF was image-based; using known 2025-2026 course list
link('Industrial Engineering', [
  'MATH 1550','MATH 1552','MATH 2090',
  'ENGL 1001','ENGL 2000',
  'PHYS 2110','PHYS 2112',
  'CHEM 1201',
  'ECON 2030',
  'EXST 2201',
  'ME 2733',
  'EE 2950',
  'IE 2060','IE 3201','IE 3302','IE 3303',
  'IE 4001','IE 4102','IE 4201','IE 4401',
]);

// CS — Cloud Computing and Networking (120 hrs) — from catalog
link('Computer Science - Cloud Computing and Networking', [
  'MATH 1021','MATH 1550','MATH 1552','MATH 2090',
  'ENGL 1001','ENGL 2000',
  'CSC 1350','CSC 1351','CSC 2259','CSC 3102','CSC 2262','CSC 2610','CSC 3380',
  'CSC 4402','CSC 4501','CSC 3200','CSC 3501',
  'CSC 4103','CSC 4330','CSC 4101','CSC 4610','CSC 4562',
  'IE 3302',
]);

// CS — Cybersecurity (120 hrs) — from catalog
link('Computer Science - Cybersecurity', [
  'MATH 1021','MATH 1550','MATH 1552','MATH 2090',
  'ENGL 1001','ENGL 2000',
  'CSC 1350','CSC 1351','CSC 2259','CSC 3102','CSC 2262','CSC 3380','CSC 3304',
  'CSC 3501','CSC 4103','CSC 2362','CSC 3200',
  'CSC 4330','CSC 4360','CSC 4402',
  'CSC 4101','CSC 4501','CSC 4362','CSC 4562',
  'IE 3302',
]);

// CS — Data Science and Analytics (120 hrs) — from catalog
link('Computer Science - Data Science and Analytics', [
  'MATH 1021','MATH 1550','MATH 1552','MATH 2090',
  'ENGL 1001','ENGL 2000',
  'CSC 1350','CSC 1351','CSC 2259','CSC 3102','CSC 2262','CSC 3380','CSC 3501',
  'CSC 4402','CSC 2730',
  'CSC 4103','CSC 4330','CSC 4740',
  'CSC 3200','CSC 4101','CSC 3730','CSC 4343',
  'IE 3302',
]);

// CS — Second Discipline (120 hrs) — from catalog
link('Computer Science - Second Discipline', [
  'MATH 1021','MATH 1550','MATH 1552','MATH 2090',
  'ENGL 1001','ENGL 2000',
  'CSC 1350','CSC 1351','CSC 2259','CSC 3102','CSC 2262','CSC 3380',
  'CSC 3501','CSC 4402','CSC 3200','CSC 4101',
  'CSC 4330','CSC 4103',
  'IE 3302',
]);

// CS — Software Engineering (120 hrs) — from catalog
link('Computer Science - Software Engineering', [
  'MATH 1021','MATH 1550','MATH 1552','MATH 2090',
  'ENGL 1001','ENGL 2000',
  'CSC 1350','CSC 1351','CSC 2259','CSC 3102','CSC 2262','CSC 3304','CSC 3501',
  'CSC 3380','CSC 4101','CSC 3200',
  'CSC 4103','CSC 4402','CSC 4351',
  'CSC 4330','CSC 4332',
  'IE 3302',
]);

// ══ COLLEGE OF SCIENCE ═══════════════════════════════════════════════════════

// Biological Sciences (120 hrs)
link('Biological Sciences', [
  'MATH 1550','MATH 1552',
  'ENGL 1001','ENGL 2000',
  'CHEM 1201','CHEM 1202','CHEM 1212','CHEM 2261','CHEM 2262',
  'PHYS 2001','PHYS 2002',
  'BIOL 1201','BIOL 1202','BIOL 1208','BIOL 1209',
  'BIOL 2051','BIOL 2160',
  'BIOL 3040','BIOL 3090','BIOL 3200','BIOL 3201','BIOL 3300',
  'BIOL 4100',
]);

// Biochemistry (122 hrs)
link('Biochemistry', [
  'MATH 1550','MATH 1552',
  'ENGL 1001','ENGL 2000',
  'CHEM 1201','CHEM 1202','CHEM 1212','CHEM 2261','CHEM 2262','CHEM 2264',
  'CHEM 3361','CHEM 3362','CHEM 3363','CHEM 4111','CHEM 4141','CHEM 4142',
  'PHYS 2001','PHYS 2002',
  'BIOL 1201','BIOL 1202','BIOL 1208','BIOL 1209',
  'BIOL 2051','BIOL 3040','BIOL 4100',
  'MATH 2085',
]);

// Microbiology (120 hrs)
link('Microbiology', [
  'MATH 1550','MATH 1552',
  'ENGL 1001','ENGL 2000',
  'CHEM 1201','CHEM 1202','CHEM 1212','CHEM 2261','CHEM 2262',
  'PHYS 2001','PHYS 2002',
  'BIOL 1201','BIOL 1202','BIOL 1208','BIOL 1209',
  'BIOL 2051',
  'MICR 2051','MICR 2053','MICR 3055','MICR 4058','MICR 4059','MICR 4060',
  'BIOL 3040','BIOL 4100',
]);

// Chemistry (120 hrs)
link('Chemistry', [
  'MATH 1550','MATH 1552','MATH 2057',
  'ENGL 1001','ENGL 2000',
  'PHYS 2001','PHYS 2002',
  'CHEM 1201','CHEM 1202','CHEM 1212',
  'CHEM 2261','CHEM 2262','CHEM 2264',
  'CHEM 3361','CHEM 3362','CHEM 3363',
  'CHEM 4001','CHEM 4111','CHEM 4141','CHEM 4142',
]);

// Geology (120 hrs)
link('Geology', [
  'MATH 1550','MATH 1552',
  'ENGL 1001','ENGL 2000',
  'PHYS 1201','PHYS 1202',
  'CHEM 1201','CHEM 1202','CHEM 1212',
  'GEOL 1001','GEOL 2005',
  'GEOL 3010','GEOL 3030','GEOL 3060',
  'GEOL 4005','GEOL 4060','GEOL 4080','GEOL 4100',
  'BIOL 1001',
]);

// Mathematics (120 hrs)
link('Mathematics', [
  'MATH 1550','MATH 1552','MATH 2057','MATH 2085','MATH 2090',
  'ENGL 1001','ENGL 2000',
  'PHYS 2001','PHYS 2002',
  'MATH 3355','MATH 3903',
  'MATH 4031','MATH 4032','MATH 4036',
  'MATH 4153','MATH 4154','MATH 4200',
]);

// Physics (122 hrs)
link('Physics', [
  'MATH 1550','MATH 1552','MATH 2057','MATH 2085','MATH 2090',
  'ENGL 1001','ENGL 2000',
  'PHYS 2110','PHYS 2112','PHYS 2113','PHYS 2108',
  'PHYS 2221',
  'PHYS 3201','PHYS 3301','PHYS 3302',
  'PHYS 4125','PHYS 4200',
  'CHEM 1201',
]);

// ══ E.J. OURSO COLLEGE OF BUSINESS ══════════════════════════════════════════
// All business majors share a Pre-Business Core:
// ENGL 1001, MATH 1021, MATH 1431, ECON 2000, ISDS 1102, ACCT 2001
// Plus: ENGL 2000, ECON 2010, GBUS 3061, BLAW 3201, MGT 3200, MKT 3401,
//       FIN 3715, ISDS 3100, ACCT 2101

const bizCore = [
  'ENGL 1001','ENGL 2000',
  'MATH 1021','MATH 1431',
  'ECON 2000','ECON 2010',
  'ISDS 1102',
  'ACCT 2001','ACCT 2101',
  'GBUS 3061',
  'BLAW 3201',
  'MGT 3200',
  'MKT 3401',
  'FIN 3715',
  'ISDS 3100',
];

// Accounting (120 hrs)
link('Accounting', [
  ...bizCore,
  'ACCT 3001','ACCT 3025','ACCT 3121','ACCT 3221','ACCT 3233',
  'ACCT 4021','ACCT 4200','ACCT 4421',
]);

// Business Analytics (120 hrs)
link('Business Analytics', [
  ...bizCore,
  'MATH 1550','ISDS 3105','ISDS 3115','ISDS 3120',
  'ISDS 4110','ISDS 4118','ISDS 4141',
  'ECON 3100','ECON 3200',
]);

// Economics (120 hrs)
link('Economics', [
  ...bizCore,
  'ECON 3000','ECON 3010','ECON 3100','ECON 3200',
  'MATH 1550','MATH 2085',
]);

// Entrepreneurship (120 hrs)
link('Entrepreneurship', [
  ...bizCore,
  'ENTR 3000','ENTR 4000','ENTR 4050','ENTR 4100',
  'MGT 3220',
]);

// Finance (120 hrs)
link('Finance', [
  ...bizCore,
  'FIN 3716','FIN 3751','FIN 3801','FIN 3830','FIN 4351','FIN 4720',
  'ECON 3000','ECON 3010',
  'MATH 1550',
]);

// General Business (120 hrs)
link('General Business', [
  ...bizCore,
  'MGT 3210','MGT 3220','MGT 4200',
  'MKT 3413',
  'ACCT 3001',
]);

// Information Systems and Analytics (120 hrs)
link('Information Systems and Analytics', [
  ...bizCore,
  'ISDS 1100','ISDS 3105','ISDS 3115','ISDS 3120',
  'ISDS 4110','ISDS 4111','ISDS 4112','ISDS 4113','ISDS 4118','ISDS 4141',
  'CSC 1253',
]);

// International Trade and Finance (120 hrs)
link('International Trade and Finance', [
  ...bizCore,
  'FIN 3716','FIN 4351',
  'ECON 3000','ECON 3010',
  'INTB 4000','INTB 4200','INTB 4300',
  'MKT 4450',
]);

// Management (120 hrs)
link('Management', [
  ...bizCore,
  'MGT 3210','MGT 3220','MGT 3850',
  'MGT 4200','MGT 4210','MGT 4400',
]);

// Marketing (120 hrs)
link('Marketing', [
  ...bizCore,
  'MKT 3413','MKT 3431','MKT 3441','MKT 3461',
  'MKT 4420','MKT 4450','MKT 4480',
]);

// ══ MINORS ═══════════════════════════════════════════════════════════════════

link('Business Administration Minor', [
  'ACCT 2000','ECON 2030','FIN 3715','ISDS 1100','MGT 3200','MKT 3401',
]);

link('Mathematics Minor', [
  'MATH 1550','MATH 1552','MATH 2057','MATH 2085','MATH 3355',
]);

link('Statistics Minor', [
  'MATH 1550','MATH 1552','MATH 2090','MATH 3355','IE 3302',
]);

link('IT Management Minor', [
  'ISDS 1100','ISDS 3105','ISDS 3120','ISDS 4120','CSC 1350','ENGL 1001',
]);

link('Energy Minor', [
  'GEOL 1001','GEOL 2020','FIN 3718',
  'ECON 4320','ECON 4325','ISDS 4160',
]);

link('Entrepreneurship Minor', [
  'ENTR 3000','ENTR 4000','ENTR 4050','ENTR 4100','MGT 3200',
]);

// ─────────────────────────────────────────────────────────────────────────────
console.log('\n=== Seed complete ===');
console.log(`Database ready. Run: npm start`);
