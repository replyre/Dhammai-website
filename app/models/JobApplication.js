// app/models/JobApplication.js

import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job ID is required"],
      index: true,
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
      minlength: [2, "Full Name must be at least 2 characters"],
      maxlength: [100, "Full Name cannot exceed 100 characters"],
      match: [
        /^[a-zA-Z\s.'-]+$/,
        "Full Name can only contain letters, spaces, periods, apostrophes, and hyphens",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      unique: false,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      index: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      maxlength: [20, "Phone number cannot exceed 20 characters"],
      match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
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
      enum: {
        values: [
          "0-1 years",
          "1-2 years",
          "2-3 years",
          "3-5 years",
          "5-7 years",
          "7-10 years",
          "10+ years",
        ],
        message: "Please select a valid experience range",
      },
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
      min: {
        type: Number,
        min: [0, "Minimum salary cannot be negative"],
      },
      max: {
        type: Number,
        min: [0, "Maximum salary cannot be negative"],
      },
      currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "INR", "CAD", "AUD"],
        default: "USD",
      },
      negotiable: {
        type: Boolean,
        default: true,
      },
    },
    noticePeriod: {
      type: String,
      trim: true,
      enum: {
        values: [
          "Immediate",
          "1 week",
          "2 weeks",
          "1 month",
          "2 months",
          "3 months",
          "More than 3 months",
        ],
        message: "Please select a valid notice period",
      },
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: [2000, "Cover letter cannot exceed 2000 characters"],
    },
    resumeUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^https?:\/\/.+\..+/.test(v);
        },
        message: "Please enter a valid URL for resume",
      },
    },
    portfolioUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^https?:\/\/.+\..+/.test(v);
        },
        message: "Please enter a valid URL for portfolio",
      },
    },
    linkedinUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^https?:\/\/(www\.)?linkedin\.com\//.test(v);
        },
        message: "Please enter a valid LinkedIn URL",
      },
    },
    githubUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return /^https?:\/\/(www\.)?github\.com\//.test(v);
        },
        message: "Please enter a valid GitHub URL",
      },
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
        "technical-round",
        "final-round",
        "offer-extended",
        "selected",
        "rejected",
        "withdrawn",
        "on-hold",
      ],
      default: "new",
      index: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
    interviewHistory: [
      {
        round: {
          type: String,
          enum: ["screening", "technical", "hr", "final", "group", "other"],
          required: true,
        },
        interviewer: {
          type: String,
          trim: true,
        },
        scheduledAt: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          enum: ["scheduled", "completed", "cancelled", "rescheduled"],
          default: "scheduled",
        },
        feedback: {
          type: String,
          trim: true,
          maxlength: [1000, "Feedback cannot exceed 1000 characters"],
        },
        rating: {
          type: Number,
          min: 1,
          max: 10,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    applicationSource: {
      type: String,
      enum: ["website", "linkedin", "referral", "job-board", "email", "other"],
      default: "website",
    },
    referrer: {
      name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      relationship: {
        type: String,
        trim: true,
      },
    },
    screening: {
      passedInitial: {
        type: Boolean,
        default: null,
      },
      techAssessmentScore: {
        type: Number,
        min: 0,
        max: 100,
      },
      overallScore: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
    documents: [
      {
        type: {
          type: String,
          enum: ["resume", "cover-letter", "portfolio", "certificate", "other"],
          required: true,
        },
        url: {
          type: String,
          required: true,
          trim: true,
        },
        filename: {
          type: String,
          trim: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tracking: {
      ipAddress: {
        type: String,
      },
      userAgent: {
        type: String,
      },
      source: {
        type: String,
      },
      medium: {
        type: String,
      },
      campaign: {
        type: String,
      },
      viewedAt: [
        {
          timestamp: {
            type: Date,
            default: Date.now,
          },
          action: {
            type: String,
            enum: ["viewed", "downloaded", "contacted"],
          },
        },
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    withdrawnAt: {
      type: Date,
    },
    rejectedAt: {
      type: Date,
    },
    selectedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound Indexes for better query performance
JobApplicationSchema.index({ jobId: 1, status: 1 });
JobApplicationSchema.index({ email: 1, jobId: 1 });
JobApplicationSchema.index({ status: 1, createdAt: -1 });
JobApplicationSchema.index({ createdAt: -1 });
JobApplicationSchema.index({
  "expectedSalary.min": 1,
  "expectedSalary.max": 1,
});
JobApplicationSchema.index({ skills: 1 });
JobApplicationSchema.index({ experience: 1 });
JobApplicationSchema.index({ isActive: 1 });

// Virtual properties
JobApplicationSchema.virtual("fullSalaryRange").get(function () {
  if (this.expectedSalary?.min && this.expectedSalary?.max) {
    return `${
      this.expectedSalary.currency
    } ${this.expectedSalary.min.toLocaleString()} - ${this.expectedSalary.max.toLocaleString()}`;
  }
  return null;
});

JobApplicationSchema.virtual("timeToRespond").get(function () {
  if (this.status === "new") return null;

  const statusDates = {
    reviewed: this.updatedAt,
    rejected: this.rejectedAt,
    selected: this.selectedAt,
  };

  const responseDate = statusDates[this.status];
  if (!responseDate) return null;

  const diffTime = Math.abs(responseDate - this.createdAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

JobApplicationSchema.virtual("interviewCount").get(function () {
  return this.interviewHistory?.length || 0;
});

JobApplicationSchema.virtual("lastInterviewDate").get(function () {
  if (!this.interviewHistory?.length) return null;
  return this.interviewHistory.sort(
    (a, b) => b.scheduledAt - a.scheduledAt
  )[0].scheduledAt;
});

// Pre-save middleware
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

  // Set status-specific timestamps
  if (this.isModified("status")) {
    const now = new Date();
    switch (this.status) {
      case "rejected":
        this.rejectedAt = now;
        this.isActive = false;
        break;
      case "selected":
        this.selectedAt = now;
        this.isActive = false;
        break;
      case "withdrawn":
        this.withdrawnAt = now;
        this.isActive = false;
        break;
      default:
        this.isActive = true;
    }
  }

  // Validate salary range
  if (this.expectedSalary?.min && this.expectedSalary?.max) {
    if (this.expectedSalary.min > this.expectedSalary.max) {
      return next(
        new Error("Minimum salary cannot be greater than maximum salary")
      );
    }
  }

  next();
});

// Instance methods
JobApplicationSchema.methods.updateStatus = function (newStatus, notes = "") {
  this.status = newStatus;
  if (notes) {
    this.notes = this.notes ? `${this.notes}\n\n${notes}` : notes;
  }
  return this.save();
};

JobApplicationSchema.methods.addInterview = function (interviewData) {
  this.interviewHistory.push(interviewData);
  return this.save();
};

JobApplicationSchema.methods.withdraw = function (reason = "") {
  this.status = "withdrawn";
  this.withdrawnAt = new Date();
  this.isActive = false;
  if (reason) {
    this.notes = this.notes
      ? `${this.notes}\n\nWithdrawn: ${reason}`
      : `Withdrawn: ${reason}`;
  }
  return this.save();
};

JobApplicationSchema.methods.getAverageInterviewRating = function () {
  if (!this.interviewHistory?.length) return null;

  const ratingsSum = this.interviewHistory
    .filter((interview) => interview.rating)
    .reduce((sum, interview) => sum + interview.rating, 0);

  const ratingsCount = this.interviewHistory.filter(
    (interview) => interview.rating
  ).length;

  return ratingsCount > 0 ? (ratingsSum / ratingsCount).toFixed(1) : null;
};

JobApplicationSchema.methods.canScheduleInterview = function () {
  return ["reviewed", "interview-scheduled", "interviewing"].includes(
    this.status
  );
};

// Static methods
JobApplicationSchema.statics.findByJob = function (jobId, options = {}) {
  const query = { jobId, isActive: true };
  if (options.status) query.status = options.status;

  return this.find(query)
    .populate("jobId", "title company department")
    .sort({ createdAt: -1 });
};

JobApplicationSchema.statics.findByStatus = function (status, limit = null) {
  const query = this.find({ status, isActive: true })
    .populate("jobId", "title company department")
    .sort({ createdAt: -1 });

  return limit ? query.limit(limit) : query;
};

JobApplicationSchema.statics.findByEmail = function (email) {
  return this.find({ email: email.toLowerCase() })
    .populate("jobId", "title company department")
    .sort({ createdAt: -1 });
};

JobApplicationSchema.statics.getApplicationStats = function (jobId = null) {
  const matchStage = jobId
    ? { $match: { jobId: mongoose.Types.ObjectId(jobId), isActive: true } }
    : { $match: { isActive: true } };

  return this.aggregate([
    matchStage,
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        avgSalaryMin: { $avg: "$expectedSalary.min" },
        avgSalaryMax: { $avg: "$expectedSalary.max" },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$count" },
        byStatus: {
          $push: {
            status: "$_id",
            count: "$count",
            avgSalaryMin: "$avgSalaryMin",
            avgSalaryMax: "$avgSalaryMax",
          },
        },
      },
    },
  ]);
};

JobApplicationSchema.statics.getTopSkills = function (limit = 10) {
  return this.aggregate([
    { $match: { isActive: true } },
    { $unwind: "$skills" },
    {
      $group: {
        _id: "$skills",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: limit },
    {
      $project: {
        skill: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);
};

JobApplicationSchema.statics.getApplicationTrends = function (days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate },
        isActive: true,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt",
          },
        },
        count: { $sum: 1 },
        newApplications: {
          $sum: { $cond: [{ $eq: ["$status", "new"] }, 1, 0] },
        },
        reviewedApplications: {
          $sum: { $cond: [{ $eq: ["$status", "reviewed"] }, 1, 0] },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};

JobApplicationSchema.statics.findDuplicateApplications = function () {
  return this.aggregate([
    {
      $group: {
        _id: { email: "$email", jobId: "$jobId" },
        applications: { $push: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
    {
      $match: {
        count: { $gt: 1 },
      },
    },
  ]);
};

// Pre-remove middleware
JobApplicationSchema.pre("remove", function (next) {
  // Clean up any related data if needed
  // For example, remove associated files from storage
  next();
});

// Export the model
export default mongoose.models.JobApplication ||
  mongoose.model("JobApplication", JobApplicationSchema);
