const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, 'Course code is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Course name is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  creditHours: {
    type: Number,
    required: [true, 'Credit hours is required'],
    min: 1,
    max: 6
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: Number,
    enum: [1000, 2000, 3000, 4000, 5000],
    required: true
  },
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  corequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  offeredSemesters: [{
    type: String,
    enum: ['Fall', 'Spring', 'Summer']
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

courseSchema.index({ department: 1, level: 1 });
courseSchema.index({ courseCode: 'text', name: 'text' });

module.exports = mongoose.model('Course', courseSchema);
