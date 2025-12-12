// app/api/jobs/[id]/route.js

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Job from "../../../models/Job";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Job ID is required",
        },
        { status: 400 }
      );
    }

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid job ID format",
        },
        { status: 400 }
      );
    }

    const job = await Job.findById(id);

    if (!job) {
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
      data: job,
    });
  } catch (error) {
    console.error("Single job fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch job details",
      },
      { status: 500 }
    );
  }
}
