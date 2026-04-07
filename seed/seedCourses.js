const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');
const DegreeRequirement = require('../models/DegreeRequirement');

dotenv.config();

const courses = [
  // CSC Courses
  {
    courseCode: 'CSC1350',
    name: 'Introduction to Computer Science I',
    description: 'Problem solving, algorithm development, data types, control structures, functions, arrays',
    creditHours: 3,
    department: 'CSC',
    level: 1000,
    prerequisites: [],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC1351',
    name: 'Introduction to Computer Science II',
    description: 'Object-oriented programming, inheritance, polymorphism, exception handling, recursion',
    creditHours: 3,
    department: 'CSC',
    level: 1000,
    prerequisiteCodes: ['CSC1350'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC2259',
    name: 'Discrete Structures',
    description: 'Logic, sets, relations, functions, mathematical induction, counting, graphs and trees',
    creditHours: 3,
    department: 'CSC',
    level: 2000,
    prerequisiteCodes: ['MATH1550'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC3102',
    name: 'Advanced Data Structures and Algorithm Analysis',
    description: 'Algorithm analysis, trees, heaps, hashing, graphs, sorting, NP-completeness',
    creditHours: 3,
    department: 'CSC',
    level: 3000,
    prerequisiteCodes: ['CSC1351', 'CSC2259'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC3380',
    name: 'Object-Oriented Design',
    description: 'OO analysis and design, UML, design patterns, software architecture',
    creditHours: 3,
    department: 'CSC',
    level: 3000,
    prerequisiteCodes: ['CSC1351'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC3501',
    name: 'Computer Organization and Design',
    description: 'CPU design, assembly language, memory hierarchy, I/O systems',
    creditHours: 3,
    department: 'CSC',
    level: 3000,
    prerequisiteCodes: ['CSC1351', 'EE2120'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC4101',
    name: 'Programming Languages',
    description: 'Syntax, semantics, data types, control structures, functional and logic programming',
    creditHours: 3,
    department: 'CSC',
    level: 4000,
    prerequisiteCodes: ['CSC3102'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC4103',
    name: 'Operating Systems',
    description: 'Process management, memory management, file systems, I/O, distributed systems',
    creditHours: 3,
    department: 'CSC',
    level: 4000,
    prerequisiteCodes: ['CSC3102', 'CSC3501'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC4330',
    name: 'Software Systems Development',
    description: 'Software engineering principles, requirements, design, testing, team project',
    creditHours: 3,
    department: 'CSC',
    level: 4000,
    prerequisiteCodes: ['CSC3380'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC4351',
    name: 'Compiler Construction',
    description: 'Lexical analysis, parsing, semantic analysis, code generation, optimization',
    creditHours: 3,
    department: 'CSC',
    level: 4000,
    prerequisiteCodes: ['CSC4101'],
    offeredSemesters: ['Fall']
  },
  {
    courseCode: 'CSC4362',
    name: 'Computer Networks',
    description: 'Network architecture, protocols, TCP/IP, routing, security, wireless networks',
    creditHours: 3,
    department: 'CSC',
    level: 4000,
    prerequisiteCodes: ['CSC3102'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC4370',
    name: 'Database Systems',
    description: 'Relational model, SQL, normalization, transaction management, query processing',
    creditHours: 3,
    department: 'CSC',
    level: 4000,
    prerequisiteCodes: ['CSC3102'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC4444',
    name: 'Artificial Intelligence',
    description: 'Search, knowledge representation, machine learning, neural networks, NLP',
    creditHours: 3,
    department: 'CSC',
    level: 4000,
    prerequisiteCodes: ['CSC3102'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'CSC4501',
    name: 'Computer Architecture',
    description: 'Advanced CPU design, pipelining, memory systems, multiprocessors',
    creditHours: 3,
    department: 'CSC',
    level: 4000,
    prerequisiteCodes: ['CSC3501'],
    offeredSemesters: ['Spring']
  },
  {
    courseCode: 'CSC4585',
    name: 'Multicore Programming',
    description: 'Parallel programming, threads, synchronization, GPU programming',
    creditHours: 3,
    department: 'CSC',
    level: 4000,
    prerequisiteCodes: ['CSC4103'],
    offeredSemesters: ['Spring']
  },

  // Math Courses
  {
    courseCode: 'MATH1550',
    name: 'Calculus I',
    description: 'Limits, derivatives, applications of derivatives, introduction to integration',
    creditHours: 5,
    department: 'MATH',
    level: 1000,
    prerequisites: [],
    offeredSemesters: ['Fall', 'Spring', 'Summer']
  },
  {
    courseCode: 'MATH1552',
    name: 'Calculus II',
    description: 'Integration techniques, applications, sequences and series',
    creditHours: 4,
    department: 'MATH',
    level: 1000,
    prerequisiteCodes: ['MATH1550'],
    offeredSemesters: ['Fall', 'Spring', 'Summer']
  },
  {
    courseCode: 'MATH2085',
    name: 'Linear Algebra',
    description: 'Systems of equations, matrices, vector spaces, linear transformations, eigenvalues',
    creditHours: 3,
    department: 'MATH',
    level: 2000,
    prerequisiteCodes: ['MATH1552'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'MATH2090',
    name: 'Differential Equations and Linear Algebra',
    description: 'First-order equations, linear systems, matrix algebra, Laplace transforms',
    creditHours: 4,
    department: 'MATH',
    level: 2000,
    prerequisiteCodes: ['MATH1552'],
    offeredSemesters: ['Fall', 'Spring']
  },

  // English Courses
  {
    courseCode: 'ENGL1001',
    name: 'English Composition',
    description: 'Principles of expository writing, reading and analysis, research methods',
    creditHours: 3,
    department: 'ENGL',
    level: 1000,
    prerequisites: [],
    offeredSemesters: ['Fall', 'Spring', 'Summer']
  },
  {
    courseCode: 'ENGL2000',
    name: 'English Composition II',
    description: 'Advanced composition, argumentation, research writing, critical analysis',
    creditHours: 3,
    department: 'ENGL',
    level: 2000,
    prerequisiteCodes: ['ENGL1001'],
    offeredSemesters: ['Fall', 'Spring', 'Summer']
  },

  // Physics Courses
  {
    courseCode: 'PHYS2110',
    name: 'Physics I',
    description: 'Mechanics, waves, thermodynamics',
    creditHours: 3,
    department: 'PHYS',
    level: 2000,
    prerequisiteCodes: ['MATH1550'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'PHYS2113',
    name: 'Physics Lab I',
    description: 'Laboratory experiments in mechanics and thermodynamics',
    creditHours: 1,
    department: 'PHYS',
    level: 2000,
    corequisiteCodes: ['PHYS2110'],
    offeredSemesters: ['Fall', 'Spring']
  },
  {
    courseCode: 'PHYS2120',
    name: 'Physics II',
    description: 'Electricity and magnetism, optics, modern physics',
    creditHours: 3,
    department: 'PHYS',
    level: 2000,
    prerequisiteCodes: ['PHYS2110', 'MATH1552'],
    offeredSemesters: ['Fall', 'Spring']
  },

  // EE Course
  {
    courseCode: 'EE2120',
    name: 'Electrical Circuits I',
    description: 'Circuit analysis, Kirchhoffs laws, network theorems, capacitors, inductors',
    creditHours: 3,
    department: 'EE',
    level: 2000,
    prerequisiteCodes: ['PHYS2120', 'MATH2090'],
    offeredSemesters: ['Fall', 'Spring']
  },

  // Communication
  {
    courseCode: 'CMST2010',
    name: 'Public Speaking',
    description: 'Principles and practice of effective public speaking',
    creditHours: 3,
    department: 'CMST',
    level: 2000,
    prerequisites: [],
    offeredSemesters: ['Fall', 'Spring', 'Summer']
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await Course.deleteMany({});
    await DegreeRequirement.deleteMany({});
    console.log('Cleared existing data');

    // First pass: create courses without prerequisites
    const courseMap = new Map();

    for (const courseData of courses) {
      const { prerequisiteCodes, corequisiteCodes, ...data } = courseData;
      const course = await Course.create(data);
      courseMap.set(course.courseCode, course._id);
      console.log(`Created: ${course.courseCode}`);
    }

    // Second pass: update prerequisites and corequisites
    for (const courseData of courses) {
      const updates = {};

      if (courseData.prerequisiteCodes?.length > 0) {
        updates.prerequisites = courseData.prerequisiteCodes
          .map(code => courseMap.get(code))
          .filter(id => id);
      }

      if (courseData.corequisiteCodes?.length > 0) {
        updates.corequisites = courseData.corequisiteCodes
          .map(code => courseMap.get(code))
          .filter(id => id);
      }

      if (Object.keys(updates).length > 0) {
        await Course.findOneAndUpdate(
          { courseCode: courseData.courseCode },
          updates
        );
      }
    }

    console.log(`\n✓ Seeded ${courses.length} courses\n`);

    // Create degree requirements
    const requirements = [
      {
        major: 'Computer Science',
        catalogYear: 2024,
        category: 'Core Curriculum',
        name: 'English Composition',
        requiredCredits: 6,
        courses: [courseMap.get('ENGL1001'), courseMap.get('ENGL2000')],
        minimumGrade: 'C'
      },
      {
        major: 'Computer Science',
        catalogYear: 2024,
        category: 'Core Curriculum',
        name: 'Mathematics',
        requiredCredits: 9,
        courses: [courseMap.get('MATH1550'), courseMap.get('MATH1552')],
        minimumGrade: 'C'
      },
      {
        major: 'Computer Science',
        catalogYear: 2024,
        category: 'Major Requirements',
        name: 'CS Foundation',
        requiredCredits: 6,
        courses: [courseMap.get('CSC1350'), courseMap.get('CSC1351')],
        minimumGrade: 'C'
      },
      {
        major: 'Computer Science',
        catalogYear: 2024,
        category: 'Major Requirements',
        name: 'CS Core',
        requiredCredits: 21,
        courses: [
          courseMap.get('CSC2259'),
          courseMap.get('CSC3102'),
          courseMap.get('CSC3380'),
          courseMap.get('CSC3501'),
          courseMap.get('CSC4101'),
          courseMap.get('CSC4103'),
          courseMap.get('CSC4330')
        ],
        minimumGrade: 'C'
      },
      {
        major: 'Computer Science',
        catalogYear: 2024,
        category: 'Major Electives',
        name: 'CS Technical Electives',
        description: 'Choose 9 credits from 4000-level CSC courses',
        requiredCredits: 9,
        electiveOptions: [
          courseMap.get('CSC4351'),
          courseMap.get('CSC4362'),
          courseMap.get('CSC4370'),
          courseMap.get('CSC4444'),
          courseMap.get('CSC4501'),
          courseMap.get('CSC4585')
        ],
        minimumGrade: 'C'
      }
    ];

    await DegreeRequirement.insertMany(requirements);
    console.log(`✓ Seeded ${requirements.length} degree requirements`);

    console.log('\n=== SEED COMPLETE ===\n');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
