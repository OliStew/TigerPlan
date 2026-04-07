const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourse,
  getCourseByCode,
  createCourse,
  updateCourse,
  deleteCourse,
  getDepartments
} = require('../controllers/courseController');

// Public routes
router.get('/', getCourses);
router.get('/departments', getDepartments);
router.get('/code/:code', getCourseByCode);
router.get('/:id', getCourse);

// Admin routes (Person 1 will add auth middleware later)
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router;
