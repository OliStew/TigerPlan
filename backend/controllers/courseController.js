const Course = require('../models/Course');

// GET /api/courses
// returns the full course catalog — used if the frontend ever needs to display all courses
const getAllCourses = (req, res) => {
  try {
    const courses = Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/courses/:id
// returns one course by its numeric ID
const getCourseById = (req, res) => {
  try {
    const course = Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllCourses, getCourseById };
