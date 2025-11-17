import { NextRequest, NextResponse } from 'next/server';
import { logAction, logApp } from '@/lib/logger';
import { sendEmail } from '@/lib/email';

/**
 * POST /api/support/report
 *
 * Submit a support report/issue
 *
 * Request body:
 * {
 *   userId: string,
 *   category: 'bug' | 'feature' | 'question' | 'other',
 *   subject: string,
 *   description: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, category, subject, description } = body;

    // Validation
    if (!userId || !category || !subject || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, category, subject, description' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['bug', 'feature', 'question', 'other'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Log the support report
    logAction(userId, 'support_report_submitted', {
      category,
      subject,
      descriptionLength: description.length,
    });

    logApp(`Support report submitted by user ${userId}: ${subject}`, 'INFO', {
      userId,
      category,
      subject,
    });

    // TODO: In production, you would:
    // 1. Store the report in a database
    // 2. Create a support ticket in your ticketing system
    // 3. Send notification email to support team
    // 4. Optionally send confirmation email to user

    // For now, just send a notification email to support team (if email is configured)
    try {
      if (process.env.RESEND_API_KEY) {
        // This would be a custom template for support notifications
        // For now, we'll skip the actual email send
        logApp('Support notification email would be sent here', 'DEBUG');
      }
    } catch (emailError) {
      // Don't fail the request if email fails
      logApp('Failed to send support notification email', 'WARN', {
        error: emailError instanceof Error ? emailError.message : 'Unknown error',
      });
    }

    // Generate a mock ticket ID
    const ticketId = `TICKET-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      message: 'Support report submitted successfully',
      ticketId,
      estimatedResponse: '24 hours',
    });
  } catch (error) {
    logApp('Support report API error', 'ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
