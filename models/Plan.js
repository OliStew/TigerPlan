const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true,
    default: 'My Degree Plan'
  },
  major: {
    type: String,
    required: [true, 'Major is required'],
    trim: true
  },
  catalogYear: {
    type: Number,
    required: [true, 'Catalog year is required']
  },
  expectedGraduation: {
    semester: {
      type: String,
      enum: ['Fall', 'Spring', 'Summer']
    },
    year: Number
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'completed', 'archived'],
    default: 'draft'
  },
  notes: {
    type: String,
    default: ''
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

planSchema.virtual('courses', {
  ref: 'PlanCourse',
  localField: '_id',
  foreignField: 'plan'
});

planSchema.pre('save', async function(next) {
  if (this.isDefault) {
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isDefault: false }
    );
  }
  next();
});

module.exports = mongoose.model('Plan', planSchema);
