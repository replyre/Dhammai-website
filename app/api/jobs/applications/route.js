// app/api/jobs/applications/route.js

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import JobApplication from "../../../models/JobApplication";
import Job from "../../../models/Job";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const jobId = searchParams.get("jobId");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    // Build query object
    const query = {};
    if (jobId && jobId !== "all") query.jobId = jobId;
    if (status && status !== "all") query.status = status;

    // Add search functionality
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { currentRole: { $regex: search, $options: "i" } },
        { currentCompany: { $regex: search, $options: "i" } },
      ];
    }

    // Execute queries with population
    const applications = await JobApplication.find(query)
      .populate("jobId", "title department location")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select("-userAgent -ipAddress"); // Exclude sensitive fields

    const total = await JobApplication.countDocuments(query);

    // Get statistics
    const stats = await JobApplication.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const statusStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      data: applications,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit),
      },
      stats: statusStats,
    });
  } catch (error) {
    console.error("Job applications fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch job applications",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Get client IP and user agent
    const clientIP =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      request.ip ||
      "127.0.0.1";

    const userAgent = request.headers.get("user-agent") || "Unknown";

    // Validate required fields
    const { jobId, fullName, email, experience, coverLetter } = body;

    // Additional server-side validation
    if (!jobId || !fullName || !email || !experience) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          errors: {
            jobId: !jobId ? "Job ID is required" : null,
            fullName: !fullName ? "Full Name is required" : null,
            email: !email ? "Email is required" : null,
            experience: !experience ? "Experience is required" : null,
          },
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        { status: 400 }
      );
    }

    // Check if job exists and is active
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found",
        },
        { status: 404 }
      );
    }

    if (!job.isActive || !job.isApplicationOpen()) {
      return NextResponse.json(
        {
          success: false,
          message: "Job application is no longer accepting applications",
        },
        { status: 400 }
      );
    }

    // Check if user has already applied for this job
    const existingApplication = await JobApplication.findOne({ jobId, email });
    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already applied for this job",
        },
        { status: 409 }
      );
    }

    // Create new job application
    const applicationData = {
      jobId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: body.phoneNumber?.trim() || "",
      currentLocation: body.currentLocation?.trim() || "",
      experience: experience.trim(),
      currentRole: body.currentRole?.trim() || "",
      currentCompany: body.currentCompany?.trim() || "",
      expectedSalary: body.expectedSalary?.trim() || "",
      noticePeriod: body.noticePeriod?.trim() || "",
      coverLetter: coverLetter?.trim() || "",
      resumeUrl: body.resumeUrl?.trim() || "",
      portfolioUrl: body.portfolioUrl?.trim() || "",
      linkedinUrl: body.linkedinUrl?.trim() || "",
      githubUrl: body.githubUrl?.trim() || "",
      skills: body.skills || [],
      ipAddress: clientIP,
      userAgent: userAgent,
    };

    const newApplication = new JobApplication(applicationData);
    const savedApplication = await newApplication.save();

    // Populate the job details for response
    await savedApplication.populate("jobId", "title department location");

    // Log successful submission
    console.log(
      `New job application: ${savedApplication._id} for job ${job.title} from ${email}`
    );

    // Send success response
    return NextResponse.json(
      {
        success: true,
        message: "Job application submitted successfully",
        applicationId: savedApplication._id,
        data: {
          fullName: savedApplication.fullName,
          email: savedApplication.email,
          jobTitle: savedApplication.jobId.title,
          department: savedApplication.jobId.department,
          createdAt: savedApplication.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job application submission error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });

      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already applied for this job",
        },
        { status: 409 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("id");

    if (!applicationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Application ID is required",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, notes } = body;

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          message: "Status is required",
        },
        { status: 400 }
      );
    }

    const validStatuses = [
      "new",
      "reviewed",
      "interview-scheduled",
      "interviewing",
      "selected",
      "rejected",
      "withdrawn",
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status value",
        },
        { status: 400 }
      );
    }

    const updateData = { status, updatedAt: new Date() };
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    const updatedApplication = await JobApplication.findByIdAndUpdate(
      applicationId,
      updateData,
      { new: true, runValidators: true }
    ).populate("jobId", "title department location");

    if (!updatedApplication) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Application status updated successfully",
      data: updatedApplication,
    });
  } catch (error) {
    console.error("Job application update error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update application",
      },
      { status: 500 }
    );
  }
}
