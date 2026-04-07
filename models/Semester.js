const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ['Fall', 'Spring', 'Summer']
  },
  year: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  }
}, {
  timestamps: true
});

semesterSchema.index({ name: 1, year: 1 }, { unique: true });

semesterSchema.virtual('displayName').get(function() {
  return `${this.name} ${this.year}`;
});

semesterSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Semester', semesterSchema);
