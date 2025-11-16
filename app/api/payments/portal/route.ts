/**
 * GET /api/payments/portal
 *
 * Create a Stripe Customer Portal Session
 */

import { NextRequest, NextResponse } from 'next/server';
import { createPortalSession } from '@/lib/payments/stripe';
import { getUserIdFromSession } from '@/lib/session';
import { getUserById } from '@/lib/users-store';

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const sessionToken = request.cookies.get('session')?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const userId = getUserIdFromSession(sessionToken);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Invalid session' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has Stripe customer ID
    if (!user.stripeCustomerId) {
      return NextResponse.json(
        { success: false, error: 'No active subscription found' },
        { status: 400 }
      );
    }

    // Create portal session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const returnUrl = `${baseUrl}/dashboard/billing`;

    const portalSession = await createPortalSession(
      user.stripeCustomerId,
      returnUrl
    );

    return NextResponse.json({
      success: true,
      url: portalSession.url,
    });
  } catch (error: any) {
    console.error('[API] Error creating portal session:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
