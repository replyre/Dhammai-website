// app/models/Job.js

import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [100, "Job title cannot exceed 100 characters"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      enum: [
        "Engineering",
        "Data Science",
        "Product",
        "Design",
        "Marketing",
        "Sales",
        "Operations",
        "Human Resources",
        "Finance",
        "Customer Success",
        "Research",
        "Other",
      ],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
      maxlength: [100, "Location cannot exceed 100 characters"],
    },
    employmentType: {
      type: String,
      required: [true, "Employment type is required"],
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
    },
    experience: {
      type: String,
      required: [true, "Experience requirement is required"],
      trim: true,
      maxlength: [100, "Experience requirement cannot exceed 100 characters"],
    },
    industry: {
      type: String,
      trim: true,
      maxlength: [100, "Industry cannot exceed 100 characters"],
      default: "Information Services",
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      maxlength: [5000, "Job description cannot exceed 5000 characters"],
    },
    responsibilities: [
      {
        type: String,
        trim: true,
        maxlength: [500, "Each responsibility cannot exceed 500 characters"],
      },
    ],
    requirements: [
      {
        type: String,
        trim: true,
        maxlength: [500, "Each requirement cannot exceed 500 characters"],
      },
    ],
    niceToHave: [
      {
        type: String,
        trim: true,
        maxlength: [500, "Each nice-to-have cannot exceed 500 characters"],
      },
    ],
    salary: {
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
    },
    contactEmail: {
      type: String,
      required: [true, "Contact email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid contact email address"],
    },
    applicationDeadline: {
      type: Date,
    },
    postedBy: {
      type: String,
      required: [true, "Posted by is required"],
      trim: true,
      maxlength: [100, "Posted by cannot exceed 100 characters"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicantCount: {
      type: Number,
      default: 0,
      min: [0, "Applicant count cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
JobSchema.index({ department: 1 });
JobSchema.index({ location: 1 });
JobSchema.index({ employmentType: 1 });
JobSchema.index({ isActive: 1 });
JobSchema.index({ createdAt: -1 });
JobSchema.index({ applicationDeadline: 1 });

// Virtual for checking if applications are still open
JobSchema.virtual("isApplicationOpen").get(function () {
  if (!this.isActive) return false;
  if (!this.applicationDeadline) return true;
  return this.applicationDeadline > new Date();
});

// Pre-save middleware to format data
JobSchema.pre("save", function (next) {
  // Capitalize first letter of title
  if (this.title) {
    this.title = this.title.replace(/\b\w/g, (l) => l.toUpperCase());
  }

  if (this.location) {
    this.location = this.location.replace(/\b\w/g, (l) => l.toUpperCase());
  }

  // Validate salary range
  if (this.salary && this.salary.min && this.salary.max) {
    if (this.salary.min > this.salary.max) {
      next(new Error("Minimum salary cannot be greater than maximum salary"));
      return;
    }
  }

  next();
});

// Instance methods
JobSchema.methods.getFormattedSalary = function () {
  if (this.salary && this.salary.min && this.salary.max) {
    return `${
      this.salary.currency
    } ${this.salary.min.toLocaleString()} - ${this.salary.max.toLocaleString()}`;
  }
  return "Competitive salary";
};

JobSchema.methods.getFormattedCreatedAt = function () {
  return this.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Static methods
JobSchema.statics.findActiveJobs = function () {
  return this.find({ isActive: true }).sort({ createdAt: -1 });
};

JobSchema.statics.findByDepartment = function (department) {
  return this.find({ department, isActive: true }).sort({ createdAt: -1 });
};

JobSchema.statics.findByLocation = function (location) {
  return this.find({ location, isActive: true }).sort({ createdAt: -1 });
};

JobSchema.statics.getJobStats = function () {
  return this.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: "$department",
        count: { $sum: 1 },
      },
    },
  ]);
};

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
