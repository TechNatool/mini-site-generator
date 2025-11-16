/**
 * POST /api/payments/create-checkout
 *
 * Create a Stripe Checkout Session for subscription
 */

import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, type SubscriptionPlan } from '@/lib/payments/stripe';
import { getUserIdFromSession } from '@/lib/session';

export async function POST(request: NextRequest) {
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

    // Parse request body
    const body = await request.json();
    const { plan } = body;

    // Validate plan
    const validPlans: SubscriptionPlan[] = ['starter', 'pro', 'business'];
    if (!plan || !validPlans.includes(plan)) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan specified' },
        { status: 400 }
      );
    }

    // Create checkout session
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const successUrl = `${baseUrl}/dashboard/billing?success=true`;
    const cancelUrl = `${baseUrl}/dashboard/billing?canceled=true`;

    const session = await createCheckoutSession(
      userId,
      plan as SubscriptionPlan,
      successUrl,
      cancelUrl
    );

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('[API] Error creating checkout session:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
