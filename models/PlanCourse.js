const mongoose = require('mongoose');

const planCourseSchema = new mongoose.Schema({
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  semester: {
    type: String,
    enum: ['Fall', 'Spring', 'Summer'],
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['planned', 'in-progress', 'completed', 'dropped', 'transferred'],
    default: 'planned'
  },
  grade: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'F', 'W', 'P', 'NP', 'IP', null],
    default: null
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

planCourseSchema.index({ plan: 1, course: 1, semester: 1, year: 1 }, { unique: true });
planCourseSchema.index({ plan: 1 });

module.exports = mongoose.model('PlanCourse', planCourseSchema);
