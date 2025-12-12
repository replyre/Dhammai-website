
import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true,
    maxlength: [100, 'Full Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  phoneNumber: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone number cannot exceed 20 characters']
  },
  organizationType: {
    type: String,
    required: [true, 'Organization Type is required'],
    enum: [
      'Educational Institution',
      'Corporate',
      'Government',
      'Non-Profit',
      'Startup',
      'Other'
    ]
  },
  organizationName: {
    type: String,
    required: [true, 'Organization Name is required'],
    trim: true,
    maxlength: [200, 'Organization Name cannot exceed 200 characters']
  },
  studentCount: {
    type: String,
    enum: [
      '1-50',
      '51-100',
      '101-500',
      '501-1000',
      '1001-5000',
      '5000+',
      ''
    ]
  },
  subject: {
    type: String,
    required: [true, 'Subject/Title is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message/Details is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  meetingDate: {
    type: Date
  },
  meetingTime: {
    type: String,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)']
  },
  agreedToSendInfo: {
    type: Boolean,
    required: [true, 'You must agree to send info to Dhamm.AI'],
    validate: {
      validator: function(v) {
        return v === true;
      },
      message: 'You must agree to send info to Dhamm.AI'
    }
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed', 'closed'],
    default: 'new'
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  }
}, {
  timestamps: true // This adds createdAt and updatedAt fields
});

// Indexes for better query performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ organizationType: 1 });
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ status: 1 });

// Pre-save middleware to format data
ContactSchema.pre('save', function(next) {
  // Capitalize first letter of names
  if (this.fullName) {
    this.fullName = this.fullName.replace(/\b\w/g, l => l.toUpperCase());
  }
  
  if (this.organizationName) {
    this.organizationName = this.organizationName.replace(/\b\w/g, l => l.toUpperCase());
  }
  
  next();
});

// Instance methods
ContactSchema.methods.getFormattedCreatedAt = function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Static methods
ContactSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

ContactSchema.statics.getContactsByOrganization = function(organizationType) {
  return this.find({ organizationType }).sort({ createdAt: -1 });
};

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);