// services/planValidator.js


// checks to see if prerequisotes are met 
function checkPrerequisites( course, completedCourses){
    if(!course.prerequisites || course.prerequisites.length === 0){
        return true;
    }
    return course.prerequisites.every(prereq => completedCourses.includes(prereq)
    );
    
    //validate an entire plan
    function validatePlan(planCourses, completedCourses){
        let issues = [];
    
        for(let course of planCourses){
            const isValid = checkPrerequisites(course, completedCourses);
    
            if(!isValid){
                issues.push(`Missing Prerequisites for ${course.course_code}`);
            }
        }
        return {
            isValid: issues.length === 0,
            issues
        };
    }
    module.exports ={
        vaildatePlan,
        checkPrerequisites
    };
    
    }