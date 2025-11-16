/**
 * Permissions System
 *
 * Controls feature access based on subscription plans
 */

import type { SubscriptionPlan } from '@/lib/users-store';

// Re-export SubscriptionPlan type for convenience
export type { SubscriptionPlan };

/**
 * Feature permissions by plan
 *
 * Starter: Basic AI text generation
 * Pro: AI + SEO Boost
 * Business: All features (AI + SEO + Images + Deploy + Premium Templates)
 */

/**
 * Check if user can use SEO Boost feature
 */
export function canUseSEOBoost(plan?: SubscriptionPlan): boolean {
  if (!plan) return false;
  return ['pro', 'business'].includes(plan);
}

/**
 * Check if user can use Auto Images feature
 */
export function canUseAutoImages(plan?: SubscriptionPlan): boolean {
  if (!plan) return false;
  return plan === 'business';
}

/**
 * Check if user can use AutoDeploy feature
 */
export function canUseDeploy(plan?: SubscriptionPlan): boolean {
  if (!plan) return false;
  return plan === 'business';
}

/**
 * Check if user can use Premium Templates
 */
export function canUsePremiumTemplates(plan?: SubscriptionPlan): boolean {
  if (!plan) return false;
  return plan === 'business';
}

/**
 * Check if user can generate AI content
 * All plans (including free trial) can use basic AI
 */
export function canUseAI(_plan?: SubscriptionPlan): boolean {
  // Everyone can use AI, even without a plan (free tier)
  return true;
}

/**
 * Get max sites per user based on plan
 */
export function getMaxSites(plan?: SubscriptionPlan): number {
  if (!plan) return 3; // Free tier: 3 sites
  if (plan === 'starter') return 10;
  if (plan === 'pro') return 50;
  if (plan === 'business') return -1; // Unlimited
  return 3;
}

/**
 * Get all features for a plan
 */
export function getFeatures(plan?: SubscriptionPlan): string[] {
  const features: string[] = ['AI Text Generation', 'Basic Templates'];

  if (canUseSEOBoost(plan)) {
    features.push('SEO Boost');
  }

  if (canUseAutoImages(plan)) {
    features.push('Auto Images AI');
  }

  if (canUseDeploy(plan)) {
    features.push('AutoDeploy (Netlify, Vercel, FTP)');
  }

  if (canUsePremiumTemplates(plan)) {
    features.push('Premium Templates Unlimited');
  }

  const maxSites = getMaxSites(plan);
  if (maxSites === -1) {
    features.push('Unlimited Sites');
  } else {
    features.push(`Up to ${maxSites} Sites`);
  }

  return features;
}

/**
 * Get plan display name
 */
export function getPlanDisplayName(plan?: SubscriptionPlan): string {
  if (!plan) return 'Free';
  if (plan === 'starter') return 'Starter';
  if (plan === 'pro') return 'Pro';
  if (plan === 'business') return 'Business';
  return 'Unknown';
}

/**
 * Get plan price (monthly)
 */
export function getPlanPrice(plan: SubscriptionPlan): string {
  if (plan === 'starter') return '$9';
  if (plan === 'pro') return '$29';
  if (plan === 'business') return '$99';
  return '$0';
}

/**
 * Check if a feature requires upgrade
 */
export function requiresUpgrade(
  feature: 'seo' | 'images' | 'deploy' | 'templates',
  currentPlan?: SubscriptionPlan
): boolean {
  switch (feature) {
    case 'seo':
      return !canUseSEOBoost(currentPlan);
    case 'images':
      return !canUseAutoImages(currentPlan);
    case 'deploy':
      return !canUseDeploy(currentPlan);
    case 'templates':
      return !canUsePremiumTemplates(currentPlan);
    default:
      return false;
  }
}
