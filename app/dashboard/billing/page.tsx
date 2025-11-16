'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  getPlanDisplayName,
  getPlanPrice,
  getFeatures,
} from '@/lib/auth/permissions';
import type { SubscriptionPlan } from '@/lib/users-store';

export default function BillingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    // Check for success/cancel params from Stripe redirect
    if (searchParams.get('success') === 'true') {
      setSuccess('Payment successful! Your subscription is now active.');
      // Remove query params
      router.replace('/dashboard/billing');
    }
    if (searchParams.get('canceled') === 'true') {
      setError('Payment canceled. Your subscription was not changed.');
      // Remove query params
      router.replace('/dashboard/billing');
    }

    // Load user data (in real app, would fetch from API)
    // For now, we'll use a placeholder
    fetchUserData();
  }, [searchParams, router]);

  async function fetchUserData() {
    try {
      // In production, this would be an API call
      // For now, placeholder data
      setUser({
        email: 'user@example.com',
        subscriptionPlan: null as SubscriptionPlan | null,
      });
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  }

  async function handleUpgrade(plan: SubscriptionPlan) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (data.success && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to create checkout session');
        setLoading(false);
      }
    } catch (err: any) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  async function handleManageSubscription() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/portal');
      const data = await response.json();

      if (data.success && data.url) {
        // Redirect to Stripe Customer Portal
        window.location.href = data.url;
      } else {
        setError(data.error || 'Failed to access customer portal');
        setLoading(false);
      }
    } catch (err: any) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  }

  const currentPlan = user?.subscriptionPlan;

  const plans = [
    {
      id: 'starter' as SubscriptionPlan,
      name: 'Starter',
      price: '$9',
      period: '/month',
      features: [
        'AI Text Generation',
        'Up to 10 Sites',
        'Basic Templates',
        'Email Support',
      ],
    },
    {
      id: 'pro' as SubscriptionPlan,
      name: 'Pro',
      price: '$29',
      period: '/month',
      popular: true,
      features: [
        'Everything in Starter',
        'SEO Boost',
        'Up to 50 Sites',
        'Priority Support',
      ],
    },
    {
      id: 'business' as SubscriptionPlan,
      name: 'Business',
      price: '$99',
      period: '/month',
      features: [
        'Everything in Pro',
        'Auto Images AI',
        'AutoDeploy',
        'Premium Templates Unlimited',
        'Unlimited Sites',
        'Dedicated Support',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Billing & Subscription
          </h1>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-md">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">{error}</div>
        )}

        {/* Current Plan */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Current Plan
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {getPlanDisplayName(currentPlan)}
              </p>
              {currentPlan && (
                <p className="text-gray-600">{getPlanPrice(currentPlan)}/month</p>
              )}
              {!currentPlan && (
                <p className="text-gray-600">Free tier - Upgrade to unlock more features</p>
              )}
            </div>
            {currentPlan && (
              <button
                onClick={handleManageSubscription}
                disabled={loading}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Manage Subscription'}
              </button>
            )}
          </div>

          {currentPlan && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Your Features
              </h3>
              <ul className="space-y-2">
                {getFeatures(currentPlan).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Available Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {currentPlan ? 'Upgrade or Change Plan' : 'Choose a Plan'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-semibold">
                    POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={loading || currentPlan === plan.id}
                    className={`w-full px-6 py-3 rounded-md font-semibold transition-colors ${
                      currentPlan === plan.id
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    } disabled:opacity-50`}
                  >
                    {currentPlan === plan.id
                      ? 'Current Plan'
                      : loading
                      ? 'Loading...'
                      : currentPlan
                      ? 'Switch Plan'
                      : 'Subscribe'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History Placeholder */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Payment History
          </h2>
          <p className="text-gray-600 text-sm">
            View your complete payment history in the{' '}
            <button
              onClick={handleManageSubscription}
              disabled={!currentPlan || loading}
              className="text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Customer Portal
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
