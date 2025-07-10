import { NextResponse } from 'next/server';

// Hard-coded admin credentials (in production, use environment variables)
const ADMIN_CREDENTIALS = {
  username: 'DhammAdmin',
  password: 'Admin@123'
};

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Validate credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Create a simple token
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        token,
        user: { username }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Invalid credentials'
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json({
      success: false,
      message: 'Authentication failed'
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    // Logout endpoint - client will handle localStorage clearing
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Logout failed'
    }, { status: 500 });
  }
}

// Verify token endpoint - simplified since we're using localStorage
export async function GET(request) {
  try {
    // For localStorage approach, we'll validate token on client side
    // This endpoint can be used for additional server-side validation if needed
    return NextResponse.json({
      success: true,
      message: 'Token verification endpoint ready'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}