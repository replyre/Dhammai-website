import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import Contact from '../../../models/Contact';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const organizationType = searchParams.get('organizationType');
    const search = searchParams.get('search');

    // Build query object
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (organizationType && organizationType !== 'all') query.organizationType = organizationType;
    
    // Add search functionality
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { organizationName: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute queries
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-userAgent -ipAddress'); // Exclude sensitive fields

    const total = await Contact.countDocuments(query);

    // Get statistics
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const statusStats = stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        limit: parseInt(limit)
      },
      stats: statusStats
    });

  } catch (error) {
    console.error('Admin contacts fetch error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch contacts'
    }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('id');
    
    if (!contactId) {
      return NextResponse.json({
        success: false,
        message: 'Contact ID is required'
      }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({
        success: false,
        message: 'Status is required'
      }, { status: 400 });
    }

    const validStatuses = ['new', 'contacted', 'in-progress', 'completed', 'closed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid status value'
      }, { status: 400 });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return NextResponse.json({
        success: false,
        message: 'Contact not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Contact status updated successfully',
      data: updatedContact
    });

  } catch (error) {
    console.error('Admin contact update error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update contact'
    }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get('id');
    
    if (!contactId) {
      return NextResponse.json({
        success: false,
        message: 'Contact ID is required'
      }, { status: 400 });
    }

    // Validate ObjectId format
    if (!contactId.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid contact ID format'
      }, { status: 400 });
    }

    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return NextResponse.json({
        success: false,
        message: 'Contact not found'
      }, { status: 404 });
    }

    console.log(`Contact deleted: ${contactId} - ${deletedContact.email}`);

    return NextResponse.json({
      success: true,
      message: 'Contact deleted successfully',
      deletedContact: {
        id: deletedContact._id,
        name: deletedContact.fullName,
        email: deletedContact.email
      }
    });

  } catch (error) {
    console.error('Admin contact delete error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete contact'
    }, { status: 500 });
  }
}