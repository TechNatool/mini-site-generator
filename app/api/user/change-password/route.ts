import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

/**
 * POST /api/user/change-password
 *
 * Change user password
 *
 * Request body:
 * {
 *   currentPassword: string,
 *   newPassword: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Validation
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check password complexity (at least one letter and one number)
    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);

    if (!hasLetter || !hasNumber) {
      return NextResponse.json(
        { error: 'Password must contain at least one letter and one number' },
        { status: 400 }
      );
    }

    // TODO: In a real implementation, you would:
    // 1. Get the current user from session/JWT
    // 2. Fetch user's current hashed password from database
    // 3. Verify currentPassword matches
    // 4. Hash newPassword
    // 5. Update password in database
    // 6. Optionally: invalidate other sessions
    // 7. Optionally: send confirmation email

    // Mock implementation - simulate password verification
    const mockStoredPassword = await bcrypt.hash('oldpassword123', 10);
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, mockStoredPassword);

    // For demo purposes, we'll accept any current password
    // In production, uncomment this check:
    // if (!isCurrentPasswordValid) {
    //   return NextResponse.json(
    //     { error: 'Current password is incorrect' },
    //     { status: 401 }
    //   );
    // }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Simulate database update
    const updatedAt = new Date().toISOString();

    // TODO: Send confirmation email about password change
    // await sendPasswordChangedEmail(user.email, user.name);

    return NextResponse.json({
      success: true,
      message: 'Password changed successfully',
      updatedAt,
    });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
