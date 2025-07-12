// app/api/jobs/route.js

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Job from "../../models/Job";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const department = searchParams.get("department");
    const location = searchParams.get("location");
    const employmentType = searchParams.get("employmentType");
    const isActive = searchParams.get("isActive");

    // Build query object
    const query = {};
    if (department && department !== "all") query.department = department;
    if (location && location !== "all") query.location = location;
    if (employmentType && employmentType !== "all")
      query.employmentType = employmentType;
    if (isActive !== null && isActive !== undefined) {
      query.isActive = isActive === "true";
    } else {
      query.isActive = true; // Default to active jobs only
    }

    // Execute queries
    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select("-postedBy"); // Exclude sensitive fields

    const total = await Job.countDocuments(query);

    // Get statistics
    const stats = await Job.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
    ]);

    const departmentStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      data: jobs,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit),
      },
      stats: departmentStats,
    });
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch jobs",
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
    const {
      title,
      department,
      location,
      employmentType,
      experience,
      description,
      responsibilities,
      requirements,
      contactEmail,
      postedBy,
    } = body;

    // Additional server-side validation
    if (
      !title ||
      !department ||
      !location ||
      !employmentType ||
      !experience ||
      !description ||
      !contactEmail ||
      !postedBy
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
          errors: {
            title: !title ? "Job title is required" : null,
            department: !department ? "Department is required" : null,
            location: !location ? "Location is required" : null,
            employmentType: !employmentType
              ? "Employment type is required"
              : null,
            experience: !experience
              ? "Experience requirement is required"
              : null,
            description: !description ? "Job description is required" : null,
            contactEmail: !contactEmail ? "Contact email is required" : null,
            postedBy: !postedBy ? "Posted by is required" : null,
          },
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(contactEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid contact email address",
        },
        { status: 400 }
      );
    }

    // Check for valid employment type
    const validEmploymentTypes = [
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
    ];
    if (!validEmploymentTypes.includes(employmentType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid employment type",
        },
        { status: 400 }
      );
    }

    // Create new job
    const jobData = {
      title: title.trim(),
      department: department.trim(),
      location: location.trim(),
      employmentType,
      experience: experience.trim(),
      industry: body.industry?.trim() || "",
      description: description.trim(),
      responsibilities: responsibilities || [],
      requirements: requirements || [],
      niceToHave: body.niceToHave || [],
      salary: body.salary || {},
      contactEmail: contactEmail.trim().toLowerCase(),
      applicationDeadline: body.applicationDeadline
        ? new Date(body.applicationDeadline)
        : null,
      postedBy: postedBy.trim(),
      isActive: body.isActive !== undefined ? body.isActive : true,
    };

    const newJob = new Job(jobData);
    const savedJob = await newJob.save();

    // Log successful submission
    console.log(`New job posted: ${savedJob._id} - ${savedJob.title}`);

    // Send success response
    return NextResponse.json(
      {
        success: true,
        message: "Job posted successfully",
        jobId: savedJob._id,
        data: {
          title: savedJob.title,
          department: savedJob.department,
          location: savedJob.location,
          employmentType: savedJob.employmentType,
          createdAt: savedJob.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Job posting error:", error);

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

export async function PUT(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("id");

    if (!jobId) {
      return NextResponse.json(
        {
          success: false,
          message: "Job ID is required",
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    console.error("Job update error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update job",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("id");

    if (!jobId) {
      return NextResponse.json(
        {
          success: false,
          message: "Job ID is required",
        },
        { status: 400 }
      );
    }

    // Validate ObjectId format
    if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid job ID format",
        },
        { status: 400 }
      );
    }

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return NextResponse.json(
        {
          success: false,
          message: "Job not found",
        },
        { status: 404 }
      );
    }

    console.log(`Job deleted: ${jobId} - ${deletedJob.title}`);

    return NextResponse.json({
      success: true,
      message: "Job deleted successfully",
      deletedJob: {
        id: deletedJob._id,
        title: deletedJob.title,
        department: deletedJob.department,
      },
    });
  } catch (error) {
    console.error("Job delete error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete job",
      },
      { status: 500 }
    );
  }
}
