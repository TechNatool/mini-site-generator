import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, type EmailTemplate } from '@/lib/email';

/**
 * POST /api/emails/send
 *
 * Send a transactional email using a template
 *
 * Request body:
 * {
 *   to: string | string[],
 *   template: EmailTemplate,
 *   variables: Record<string, any>,
 *   subject?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, template, variables, subject } = body;

    // Validation
    if (!to || !template || !variables) {
      return NextResponse.json(
        { error: 'Missing required fields: to, template, variables' },
        { status: 400 }
      );
    }

    // Validate email format
    const emails = Array.isArray(to) ? to : [to];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const email of emails) {
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: `Invalid email format: ${email}` },
          { status: 400 }
        );
      }
    }

    // Send email
    const result = await sendEmail({
      to,
      template: template as EmailTemplate,
      variables,
      subject,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/emails/send
 *
 * List available email templates
 */
export async function GET() {
  const templates = [
    { id: 'welcome', name: 'Welcome Email', description: 'Sent when a new user signs up' },
    { id: 'verify-email', name: 'Email Verification', description: 'Email verification link' },
    { id: 'site-generated', name: 'Site Generated', description: 'Notification when site is ready' },
    { id: 'deploy-complete', name: 'Deploy Complete', description: 'Deployment success notification' },
    { id: 'password-reset', name: 'Password Reset', description: 'Password reset link' },
    { id: 'payment-success', name: 'Payment Success', description: 'Payment confirmation' },
    { id: 'payment-failed', name: 'Payment Failed', description: 'Payment failure notification' },
  ];

  return NextResponse.json({ templates });
}
