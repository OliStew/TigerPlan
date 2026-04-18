export const programsData = {
    "Computer Science - Software Engineering": {
        type: "Major",
        department: "Engineering",
        totalCredits: 120,
        minGpa: 2.5,
        courses: [
            { code: "CSC 1253", name: "Computer Science I", credits: 3 },
            { code: "CSC 1254", name: "Computer Science II", credits: 3 },
            { code: "CSC 2259", name: "Discrete Structures", credits: 3 },
            { code: "CSC 3102", name: "Data Structures", credits: 3 },
            { code: "CSC 4103", name: "Operating Systems", credits: 3 },
            { code: "CSC 4330", name: "Software Engineering", credits: 3 },
            { code: "MATH 1550", name: "Calculus I", credits: 5 },
            { code: "MATH 1552", name: "Calculus II", credits: 4 }
        ]
    },
    "Mathematics": {
        type: "Major",
        department: "Science",
        totalCredits: 120,
        minGpa: 2.0,
        courses: [
            { code: "MATH 1550", name: "Calculus I", credits: 5 },
            { code: "MATH 1552", name: "Calculus II", credits: 4 },
            { code: "MATH 2057", name: "Calculus III", credits: 4 },
            { code: "MATH 2085", name: "Linear Algebra", credits: 3 },
            { code: "MATH 2021", name: "Intro to Proofs", credits: 3 },
            { code: "MATH 4031", name: "Advanced Calculus", credits: 3 }
        ]
    },
    "Business Analytics": {
        type: "Major",
        department: "Business",
        totalCredits: 127,
        minGpa: 2.6,
        courses: [
            { code: "ISDS 1102", name: "Intro to Business Analytics", credits: 3 },
            { code: "ISDS 2001", name: "Stats Resources", credits: 3 },
            { code: "ISDS 3115", name: "Data Management", credits: 3 },
            { code: "ISDS 4111", name: "Data Mining", credits: 3 },
            { code: "ECON 2000", name: "Microeconomics", credits: 3 },
            { code: "ACCT 2001", name: "Financial Accounting", credits: 3 },
            { code: "MATH 1431", name: "Business Calculus", credits: 3 }
        ]
    },
    "Electrical Engineering": {
        type: "Major",
        department: "Engineering",
        totalCredits: 120,
        minGpa: 2.5,
        courses: [
            { code: "EE 2120", name: "Circuits I", credits: 3 },
            { code: "EE 2130", name: "Circuits II", credits: 3 },
            { code: "EE 2741", name: "Digital Logic", credits: 3 },
            { code: "MATH 1550", name: "Calculus I", credits: 5 },
            { code: "MATH 1552", name: "Calculus II", credits: 4 },
            { code: "PHYS 2110", name: "Physics for Engineers I", credits: 3 }
        ]
    },
    "Statistics Minor": {
        type: "Minor",
        department: "Science",
        totalCredits: 18,
        minGpa: 2.0,
        courses: [
            { code: "EXST 2201", name: "Intro to Statistics", credits: 3 },
            { code: "ISDS 2001", name: "Stats Resources", credits: 3 },
            { code: "MATH 2085", name: "Linear Algebra", credits: 3 },
            { code: "STAT 4001", name: "Statistical Methods", credits: 3 }
        ]
    },
    "Energy Minor": {
        type: "Minor",
        department: "Business",
        totalCredits: 15,
        minGpa: 2.0,
        courses: [
            { code: "ENRG 3000", name: "Intro to Energy", credits: 3 },
            { code: "ECON 4520", name: "Energy Economics", credits: 3 },
            { code: "GEOL 2066", name: "Energy Resources", credits: 3 }
        ]
    },
    "Entrepreneurship Minor": {
        type: "Minor",
        department: "Engineering",
        totalCredits: 15,
        minGpa: 2.0,
        courses: [
            { code: "ECON 2000", name: "Microeconomics", credits: 3 },
            { code: "ECON 2010", name: "Macroeconomics", credits: 3 },
            { code: "ECON 4720", name: "Intermediate Micro", credits: 3 },
            { code: "ECON 4710", name: "Intermediate Macro", credits: 3 }
        ]
    }
};

export const equivalencies = [
    { codeA: "MATH 1431", nameA: "Business Calculus",   codeB: "MATH 1550", nameB: "Calculus I" },
    { codeA: "EXST 2201", nameA: "Intro to Statistics",  codeB: "ISDS 2001", nameB: "Stats Resources" },
    { codeA: "CSC 3102",  nameA: "Data Structures",      codeB: "ISDS 3115", nameB: "Data Management" },
    { codeA: "EE 2741",   nameA: "Digital Logic",        codeB: "CSC 2259",  nameB: "Discrete Structures" }
];