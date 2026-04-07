const Plan = require('../models/Plan');
const PlanCourse = require('../models/PlanCourse');
const Course = require('../models/Course');
const mongoose = require('mongoose');

// @desc    Get all plans for user
// @route   GET /api/plans
exports.getPlans = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.query.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const plans = await Plan.find({ user: userId })
      .sort({ isDefault: -1, updatedAt: -1 });

    res.json({
      success: true,
      data: plans
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single plan with courses
// @route   GET /api/plans/:id
exports.getPlan = async (req, res, next) => {
  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    const planCourses = await PlanCourse.find({ plan: plan._id })
      .populate('course', 'courseCode name creditHours department level prerequisites')
      .sort({ year: 1, semester: 1 });

    // Organize by semester
    const semesters = {};
    const semesterOrder = { Spring: 1, Summer: 2, Fall: 3 };

    planCourses.forEach(pc => {
      const key = `${pc.year}-${pc.semester}`;
      if (!semesters[key]) {
        semesters[key] = {
          semester: pc.semester,
          year: pc.year,
          courses: [],
          totalCredits: 0
        };
      }
      semesters[key].courses.push(pc);
      semesters[key].totalCredits += pc.course.creditHours;
    });

    // Sort semesters
    const sortedSemesters = Object.values(semesters).sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return semesterOrder[a.semester] - semesterOrder[b.semester];
    });

    // Calculate totals
    const totalCredits = planCourses.reduce(
      (sum, pc) => sum + pc.course.creditHours, 0
    );
    const completedCredits = planCourses
      .filter(pc => pc.status === 'completed')
      .reduce((sum, pc) => sum + pc.course.creditHours, 0);

    res.json({
      success: true,
      data: {
        plan,
        semesters: sortedSemesters,
        summary: {
          totalCredits,
          completedCredits,
          remainingCredits: totalCredits - completedCredits,
          courseCount: planCourses.length
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new plan
// @route   POST /api/plans
exports.createPlan = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.body.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    const plan = await Plan.create({
      ...req.body,
      user: userId
    });

    res.status(201).json({
      success: true,
      data: plan
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update plan
// @route   PUT /api/plans/:id
exports.updatePlan = async (req, res, next) => {
  try {
    const allowedUpdates = [
      'name', 'major', 'catalogYear', 'expectedGraduation',
      'status', 'notes', 'isDefault'
    ];

    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    res.json({
      success: true,
      data: plan
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete plan
// @route   DELETE /api/plans/:id
exports.deletePlan = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    await PlanCourse.deleteMany({ plan: plan._id }, { session });
    await Plan.findByIdAndDelete(plan._id, { session });

    await session.commitTransaction();

    res.json({
      success: true,
      message: 'Plan deleted successfully'
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// @desc    Add course to plan
// @route   POST /api/plans/:id/courses
exports.addCourseToPlan = async (req, res, next) => {
  try {
    const { courseId, semester, year, status = 'planned' } = req.body;

    // Validate required fields
    if (!courseId || !semester || !year) {
      return res.status(400).json({
        success: false,
        message: 'courseId, semester, and year are required'
      });
    }

    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check for duplicate
    const existing = await PlanCourse.findOne({
      plan: plan._id,
      course: courseId,
      semester,
      year
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Course already exists in this semester'
      });
    }

    const planCourse = await PlanCourse.create({
      plan: plan._id,
      course: courseId,
      semester,
      year,
      status
    });

    await planCourse.populate('course', 'courseCode name creditHours department');

    res.status(201).json({
      success: true,
      data: planCourse
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update course in plan
// @route   PUT /api/plans/:id/courses/:courseId
exports.updatePlanCourse = async (req, res, next) => {
  try {
    const { semester, year, status, grade, notes } = req.body;

    const planCourse = await PlanCourse.findOneAndUpdate(
      {
        plan: req.params.id,
        _id: req.params.courseId
      },
      { semester, year, status, grade, notes },
      { new: true, runValidators: true }
    ).populate('course', 'courseCode name creditHours department');

    if (!planCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found in plan'
      });
    }

    res.json({
      success: true,
      data: planCourse
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove course from plan
// @route   DELETE /api/plans/:id/courses/:courseId
exports.removeCourseFromPlan = async (req, res, next) => {
  try {
    const planCourse = await PlanCourse.findOneAndDelete({
      plan: req.params.id,
      _id: req.params.courseId
    });

    if (!planCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found in plan'
      });
    }

    res.json({
      success: true,
      message: 'Course removed from plan'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get courses for specific semester
// @route   GET /api/plans/:id/semesters/:semester/:year
exports.getSemesterCourses = async (req, res, next) => {
  try {
    const { id, semester, year } = req.params;

    const courses = await PlanCourse.find({
      plan: id,
      semester,
      year: parseInt(year)
    }).populate('course', 'courseCode name creditHours department level');

    const totalCredits = courses.reduce(
      (sum, pc) => sum + pc.course.creditHours, 0
    );

    res.json({
      success: true,
      data: {
        semester,
        year: parseInt(year),
        courses,
        totalCredits
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Duplicate a plan
// @route   POST /api/plans/:id/duplicate
exports.duplicatePlan = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const originalPlan = await Plan.findById(req.params.id);

    if (!originalPlan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found'
      });
    }

    const [newPlan] = await Plan.create([{
      user: originalPlan.user,
      name: `${originalPlan.name} (Copy)`,
      major: originalPlan.major,
      catalogYear: originalPlan.catalogYear,
      expectedGraduation: originalPlan.expectedGraduation,
      status: 'draft',
      isDefault: false
    }], { session });

    const originalCourses = await PlanCourse.find({ plan: originalPlan._id });

    if (originalCourses.length > 0) {
      const newCourses = originalCourses.map(pc => ({
        plan: newPlan._id,
        course: pc.course,
        semester: pc.semester,
        year: pc.year,
        status: pc.status,
        notes: pc.notes
      }));

      await PlanCourse.insertMany(newCourses, { session });
    }

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      data: newPlan
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};
