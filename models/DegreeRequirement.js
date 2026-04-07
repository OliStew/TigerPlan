const mongoose = require('mongoose');

const degreeRequirementSchema = new mongoose.Schema({
  major: {
    type: String,
    required: true,
    trim: true
  },
  catalogYear: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Core Curriculum',
      'Major Requirements',
      'Major Electives',
      'Free Electives',
      'Minor Requirements',
      'General Electives'
    ]
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  requiredCredits: {
    type: Number,
    required: true
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  electiveOptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  minimumGrade: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    default: 'D'
  },
  isRequired: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

degreeRequirementSchema.index({ major: 1, catalogYear: 1 });

module.exports = mongoose.model('DegreeRequirement', degreeRequirementSchema);
