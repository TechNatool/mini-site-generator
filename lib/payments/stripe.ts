/**
 * Stripe Payment Integration
 *
 * Handles Stripe Checkout, Customer Portal, and Subscriptions
 */

import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-10-29.clover',
});

export type SubscriptionPlan = 'starter' | 'pro' | 'business';

/**
 * Get Stripe Price ID for a given plan
 */
function getPriceId(plan: SubscriptionPlan): string {
  const priceIds: Record<SubscriptionPlan, string> = {
    starter: process.env.STRIPE_PRICE_STARTER || '',
    pro: process.env.STRIPE_PRICE_PRO || '',
    business: process.env.STRIPE_PRICE_BUSINESS || '',
  };

  const priceId = priceIds[plan];

  if (!priceId) {
    throw new Error(`No Stripe Price ID configured for plan: ${plan}`);
  }

  return priceId;
}

/**
 * Create a Stripe Checkout Session for subscribing to a plan
 */
export async function createCheckoutSession(
  userId: string,
  plan: SubscriptionPlan,
  successUrl: string,
  cancelUrl: string
): Promise<Stripe.Checkout.Session> {
  const priceId = getPriceId(plan);

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId, // Link session to user
    metadata: {
      userId,
      plan,
    },
  });

  return session;
}

/**
 * Create a Stripe Customer Portal Session for managing subscriptions
 */
export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<Stripe.BillingPortal.Session> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

/**
 * Verify Stripe Webhook Signature
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );
    return event;
  } catch (err) {
    throw new Error(`Webhook signature verification failed: ${err}`);
  }
}

/**
 * Get customer ID from subscription
 */
export async function getCustomerIdFromSubscription(
  subscriptionId: string
): Promise<string> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return typeof subscription.customer === 'string'
    ? subscription.customer
    : subscription.customer.id;
}

/**
 * Get subscription plan from Stripe Price ID
 */
export function getPlanFromPriceId(priceId: string): SubscriptionPlan | null {
  const starterPrice = process.env.STRIPE_PRICE_STARTER;
  const proPrice = process.env.STRIPE_PRICE_PRO;
  const businessPrice = process.env.STRIPE_PRICE_BUSINESS;

  if (priceId === starterPrice) return 'starter';
  if (priceId === proPrice) return 'pro';
  if (priceId === businessPrice) return 'business';

  return null;
}

/**
 * Check if Stripe is properly configured
 */
export function isStripeConfigured(): boolean {
  return !!(
    process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_WEBHOOK_SECRET &&
    process.env.STRIPE_PRICE_STARTER &&
    process.env.STRIPE_PRICE_PRO &&
    process.env.STRIPE_PRICE_BUSINESS
  );
}

/**
 * Get subscription status from Stripe
 */
export async function getSubscriptionStatus(
  customerId: string
): Promise<{
  active: boolean;
  plan: SubscriptionPlan | null;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: Date | null;
}> {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return {
        active: false,
        plan: null,
        cancelAtPeriodEnd: false,
        currentPeriodEnd: null,
      };
    }

    const subscription = subscriptions.data[0];
    const priceId = subscription.items.data[0]?.price.id || '';
    const plan = getPlanFromPriceId(priceId);

    // Type assertion for Stripe subscription properties
    const sub = subscription as any;

    return {
      active: subscription.status === 'active',
      plan,
      cancelAtPeriodEnd: sub.cancel_at_period_end || false,
      currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
    };
  } catch (error) {
    console.error('[Stripe] Error fetching subscription status:', error);
    return {
      active: false,
      plan: null,
      cancelAtPeriodEnd: false,
      currentPeriodEnd: null,
    };
  }
}

export { stripe };
