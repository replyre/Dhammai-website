import { NextResponse } from 'next/server';

// This API is now optional since authentication is handled on frontend
// Keeping it simple for future extensibility

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Since we're doing frontend auth, just return success for any valid request
    return NextResponse.json({
      success: true,
      message: 'Authentication handled on frontend',
      token: 'frontend-token',
      user: { username }
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Invalid request'
    }, { status: 400 });
  }
}

export async function DELETE(request) {
  // Simple logout response
  return NextResponse.json({
    success: true,
    message: 'Logout handled on frontend'
  });
}

export async function GET(request) {
  // Simple verification response
  return NextResponse.json({
    success: true,
    message: 'Authentication handled on frontend'
  });
}