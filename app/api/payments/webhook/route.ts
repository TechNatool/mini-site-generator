/**
 * POST /api/payments/webhook
 *
 * Handle Stripe Webhook Events
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  verifyWebhookSignature,
  getPlanFromPriceId,
} from '@/lib/payments/stripe';
import {
  updateUserSubscription,
  updateUserStripeCustomerId,
  getUserByStripeCustomerId,
} from '@/lib/users-store';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = verifyWebhookSignature(body, signature);
    } catch (err: any) {
      console.error('[Webhook] Signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Signature verification failed' },
        { status: 400 }
      );
    }

    console.log('[Webhook] Received event:', event.type);

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        console.log('[Webhook] Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[Webhook] Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle checkout.session.completed event
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id || session.metadata?.userId;
  const customerId = session.customer as string;

  if (!userId) {
    console.error('[Webhook] No userId in checkout session');
    return;
  }

  console.log('[Webhook] Checkout completed for user:', userId);

  // Save Stripe customer ID to user
  await updateUserStripeCustomerId(userId, customerId);

  // If subscription is included, handle it
  if (session.subscription) {
    const subscriptionId = session.subscription as string;
    const subscription = await getSubscriptionDetails(subscriptionId);
    if (subscription) {
      await handleSubscriptionChange(subscription);
    }
  }
}

/**
 * Handle subscription created/updated events
 */
async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer.id;

  // Find user by Stripe customer ID
  const user = await getUserByStripeCustomerId(customerId);
  if (!user) {
    console.error('[Webhook] User not found for customer:', customerId);
    return;
  }

  // Get plan from price ID
  const priceId = subscription.items.data[0]?.price.id;
  if (!priceId) {
    console.error('[Webhook] No price ID in subscription');
    return;
  }

  const plan = getPlanFromPriceId(priceId);
  if (!plan) {
    console.error('[Webhook] Unknown plan for price:', priceId);
    return;
  }

  // Update user subscription
  if (subscription.status === 'active') {
    console.log(`[Webhook] Activating ${plan} plan for user:`, user.id);
    await updateUserSubscription(user.id, plan);
  } else {
    console.log(`[Webhook] Subscription status ${subscription.status} for user:`, user.id);
    // Only update if subscription is no longer active
    if (['canceled', 'unpaid', 'incomplete_expired'].includes(subscription.status)) {
      await updateUserSubscription(user.id, null);
    }
  }
}

/**
 * Handle subscription deleted event
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId =
    typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer.id;

  // Find user by Stripe customer ID
  const user = await getUserByStripeCustomerId(customerId);
  if (!user) {
    console.error('[Webhook] User not found for customer:', customerId);
    return;
  }

  console.log('[Webhook] Subscription deleted for user:', user.id);

  // Remove subscription from user
  await updateUserSubscription(user.id, null);
}

/**
 * Helper: Get subscription details from Stripe
 */
async function getSubscriptionDetails(
  subscriptionId: string
): Promise<Stripe.Subscription | null> {
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    return await stripe.subscriptions.retrieve(subscriptionId);
  } catch (error) {
    console.error('[Webhook] Error fetching subscription:', error);
    return null;
  }
}
