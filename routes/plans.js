const express = require('express');
const router = express.Router();
const {
  getPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
  addCourseToPlan,
  updatePlanCourse,
  removeCourseFromPlan,
  getSemesterCourses,
  duplicatePlan,
  validatePlanController
} = require('../controllers/planController');

// Plan routes (Person 1 will add auth middleware later)
router.get('/', getPlans);
router.post('/', createPlan);
router.get('/:id', getPlan);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);
router.post('/:id/duplicate', duplicatePlan);

// Plan course routes
router.post('/:id/courses', addCourseToPlan);
router.put('/:id/courses/:courseId', updatePlanCourse);
router.delete('/:id/courses/:courseId', removeCourseFromPlan);
router.get('/:id/semesters/:semester/:year', getSemesterCourses);

// Validate a student's course plan by checking prerequisites
// @route   POST /api/plans/validate
router.post('/validate', validatePlanController);

module.exports = router;
 
