import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../lib/mongodb';
import Contact from '../../models/Contact';

export async function POST(request) {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const body = await request.json();

    // Get client IP and user agent
    const clientIP = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    request.ip ||
                    '127.0.0.1';

    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Validate required fields
    const {
      fullName,
      email,
      phoneNumber,
      organizationType,
      organizationName,
      studentCount,
      subject,
      message,
      meetingDate,
      meetingTime,
      agreedToSendInfo
    } = body;

    // Additional server-side validation
    if (!fullName || !email || !organizationType || !organizationName || !subject || !message) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields',
        errors: {
          fullName: !fullName ? 'Full Name is required' : null,
          email: !email ? 'Email is required' : null,
          organizationType: !organizationType ? 'Organization Type is required' : null,
          organizationName: !organizationName ? 'Organization Name is required' : null,
          subject: !subject ? 'Subject is required' : null,
          message: !message ? 'Message is required' : null
        }
      }, { status: 400 });
    }

    if (!agreedToSendInfo) {
      return NextResponse.json({
        success: false,
        message: 'You must agree to send info to Dhamm.AI'
      }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: 'Please enter a valid email address'
      }, { status: 400 });
    }

    // Check for valid organization type
    const validOrgTypes = [
      'Educational Institution',
      'Corporate',
      'Government',
      'Non-Profit',
      'Startup',
      'Other'
    ];

    if (!validOrgTypes.includes(organizationType)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid organization type'
      }, { status: 400 });
    }

    // Optional: Check if contact with this email already exists
    const existingContact = await Contact.findByEmail(email);
    if (existingContact) {
      console.log(`Duplicate submission attempt from: ${email}`);
      // You can either prevent duplicates or allow them
      // For now, we'll allow them but log the attempt
    }

    // Create new contact
    const contactData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber?.trim() || '',
      organizationType,
      organizationName: organizationName.trim(),
      studentCount: studentCount || '',
      subject: subject.trim(),
      message: message.trim(),
      meetingDate: meetingDate ? new Date(meetingDate) : null,
      meetingTime: meetingTime || '',
      agreedToSendInfo,
      ipAddress: clientIP,
      userAgent: userAgent
    };

    const newContact = new Contact(contactData);
    const savedContact = await newContact.save();

    // Log successful submission
    console.log(`New contact form submission: ${savedContact._id} from ${email}`);

    // Send success response
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: savedContact._id,
      data: {
        fullName: savedContact.fullName,
        email: savedContact.email,
        organizationType: savedContact.organizationType,
        organizationName: savedContact.organizationName,
        subject: savedContact.subject,
        createdAt: savedContact.createdAt
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Contact form submission error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      Object.keys(error.errors).forEach(key => {
        validationErrors[key] = error.errors[key].message;
      });

      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      }, { status: 400 });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        message: 'A contact with this email already exists'
      }, { status: 409 });
    }

    // Generic error response
    return NextResponse.json({
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    }, { status: 500 });
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed. Use POST to submit contact form.'
  }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed. Use POST to submit contact form.'
  }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({
    success: false,
    message: 'Method not allowed. Use POST to submit contact form.'
  }, { status: 405 });
}