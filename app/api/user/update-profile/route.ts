import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/lib/email';

/**
 * POST /api/user/update-profile
 *
 * Update user profile information
 *
 * Request body:
 * {
 *   name: string,
 *   email: string,
 *   company?: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // TODO: In a real implementation, you would:
    // 1. Get the current user from session/JWT
    // 2. Check if email has changed
    // 3. If email changed, send verification email
    // 4. Update user in database
    // 5. Return updated user data

    // Mock implementation
    const currentEmail = 'jean.dupont@example.com'; // This would come from session
    const emailChanged = email !== currentEmail;

    if (emailChanged) {
      // Send verification email
      const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email?token=mock-token`;

      await sendVerificationEmail(
        email,
        name,
        verificationUrl,
        '123456' // Mock verification code
      );
    }

    // Simulate database update
    const updatedUser = {
      id: '1',
      name,
      email,
      company,
      emailVerified: !emailChanged, // If email changed, needs re-verification
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: emailChanged
        ? 'Profile updated. Please check your email to verify your new address.'
        : 'Profile updated successfully',
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
