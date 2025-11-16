/**
 * POST /api/auth/logout
 *
 * Destroy user session
 */

import { NextResponse } from 'next/server';
import { destroySessionCookie } from '@/lib/session';

export async function POST() {
  try {
    // Clear session cookie
    const clearCookie = destroySessionCookie();

    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    response.headers.set('Set-Cookie', clearCookie);
    return response;
  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}
