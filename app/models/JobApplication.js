// app/models/JobApplication.js

import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job ID is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
      maxlength: [100, "Full Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
    },
    currentLocation: {
      type: String,
      trim: true,
      maxlength: [100, "Current location cannot exceed 100 characters"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
      trim: true,
      maxlength: [50, "Experience cannot exceed 50 characters"],
    },
    currentRole: {
      type: String,
      trim: true,
      maxlength: [100, "Current role cannot exceed 100 characters"],
    },
    currentCompany: {
      type: String,
      trim: true,
      maxlength: [100, "Current company cannot exceed 100 characters"],
    },
    expectedSalary: {
      type: String,
      trim: true,
      maxlength: [50, "Expected salary cannot exceed 50 characters"],
    },
    noticePeriod: {
      type: String,
      trim: true,
      maxlength: [50, "Notice period cannot exceed 50 characters"],
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: [2000, "Cover letter cannot exceed 2000 characters"],
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
    portfolioUrl: {
      type: String,
      trim: true,
    },
    linkedinUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    skills: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Each skill cannot exceed 50 characters"],
      },
    ],
    status: {
      type: String,
      enum: [
        "new",
        "reviewed",
        "interview-scheduled",
        "interviewing",
        "selected",
        "rejected",
        "withdrawn",
      ],
      default: "new",
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
JobApplicationSchema.index({ jobId: 1 });
JobApplicationSchema.index({ email: 1 });
JobApplicationSchema.index({ status: 1 });
JobApplicationSchema.index({ createdAt: -1 });

// Pre-save middleware to format data
JobApplicationSchema.pre("save", function (next) {
  // Capitalize first letter of names
  if (this.fullName) {
    this.fullName = this.fullName.replace(/\b\w/g, (l) => l.toUpperCase());
  }

  if (this.currentRole) {
    this.currentRole = this.currentRole.replace(/\b\w/g, (l) =>
      l.toUpperCase()
    );
  }

  if (this.currentCompany) {
    this.currentCompany = this.currentCompany.replace(/\b\w/g, (l) =>
      l.toUpperCase()
    );
  }

  next();
});

// Static methods
JobApplicationSchema.statics.findByJob = function (jobId) {
  return this.find({ jobId }).sort({ createdAt: -1 });
};

JobApplicationSchema.statics.findByStatus = function (status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

export default mongoose.models.JobApplication ||
  mongoose.model("JobApplication", JobApplicationSchema);
