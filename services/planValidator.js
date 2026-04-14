// services/planValidator.js

// checks to see if prerequisites are met 
function checkPrerequisites(course, completedCourses) {
    if (!course.prerequisites || course.prerequisites.length === 0) {
        return true;
    }

    return course.prerequisites.every(prereq =>
        completedCourses.includes(prereq)
    );
}

// check if total credits exceed recommended limit
function checkCreditLoad(planCourses) {
    const totalCredits = planCourses.reduce(
        (sum, course) => sum + (course.creditHours || 0),
        0
    );

    return {
        totalCredits,
        overloaded: totalCredits > 18
    };
}

// validate an entire plan
function validatePlan(planCourses, completedCourses) {
    let issues = [];

    for (let course of planCourses) {
        const isValid = checkPrerequisites(course, completedCourses);

        if (!isValid) {
            issues.push(`Missing prerequisites for ${course.course_code}`);
        }
    }

    const creditCheck = checkCreditLoad(planCourses);

    return {
        isValid: issues.length === 0 && !creditCheck.overloaded,
        issues,
        totalCredits: creditCheck.totalCredits,
        overloaded: creditCheck.overloaded
    };
}

module.exports = {
    validatePlan,
    checkPrerequisites,
    checkCreditLoad
};