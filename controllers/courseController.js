const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
exports.getCourses = async (req, res, next) => {
  try {
    const { department, level, search, semester, page = 1, limit = 20 } = req.query;

    const query = { isActive: true };

    if (department) {
      query.department = department.toUpperCase();
    }

    if (level) {
      query.level = parseInt(level);
    }

    if (semester) {
      query.offeredSemesters = semester;
    }

    if (search) {
      query.$or = [
        { courseCode: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [courses, total] = await Promise.all([
      Course.find(query)
        .populate('prerequisites', 'courseCode name')
        .populate('corequisites', 'courseCode name')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ courseCode: 1 }),
      Course.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: courses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('prerequisites', 'courseCode name creditHours')
      .populate('corequisites', 'courseCode name creditHours');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get course by code
// @route   GET /api/courses/code/:code
exports.getCourseByCode = async (req, res, next) => {
  try {
    const course = await Course.findOne({
      courseCode: req.params.code.toUpperCase()
    })
      .populate('prerequisites', 'courseCode name creditHours')
      .populate('corequisites', 'courseCode name creditHours');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create course
// @route   POST /api/courses
exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Course with this code already exists'
      });
    }
    next(error);
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
exports.updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete course (soft delete)
// @route   DELETE /api/courses/:id
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all departments
// @route   GET /api/courses/departments
exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Course.distinct('department', { isActive: true });

    res.json({
      success: true,
      data: departments.sort()
    });
  } catch (error) {
    next(error);
  }
};
