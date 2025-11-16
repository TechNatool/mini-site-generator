/**
 * Unit tests for subscription permissions system
 * Tests feature access control based on subscription plans
 */

import { describe, it, expect } from 'vitest';
import {
  canUseSEOBoost,
  canUseAutoImages,
  canUseDeploy,
  canUsePremiumTemplates,
  getMaxSites,
  getFeatures,
  getPlanDisplayName,
  getPlanPrice,
  requiresUpgrade,
  type SubscriptionPlan,
} from '@/lib/auth/permissions';

describe('Subscription Permissions System', () => {
  describe('canUseSEOBoost', () => {
    it('should return false for users without subscription', () => {
      expect(canUseSEOBoost()).toBe(false);
      expect(canUseSEOBoost(undefined)).toBe(false);
    });

    it('should return false for starter plan', () => {
      expect(canUseSEOBoost('starter')).toBe(false);
    });

    it('should return true for pro plan', () => {
      expect(canUseSEOBoost('pro')).toBe(true);
    });

    it('should return true for business plan', () => {
      expect(canUseSEOBoost('business')).toBe(true);
    });
  });

  describe('canUseAutoImages', () => {
    it('should return false for users without subscription', () => {
      expect(canUseAutoImages()).toBe(false);
      expect(canUseAutoImages(undefined)).toBe(false);
    });

    it('should return false for starter plan', () => {
      expect(canUseAutoImages('starter')).toBe(false);
    });

    it('should return false for pro plan', () => {
      expect(canUseAutoImages('pro')).toBe(false);
    });

    it('should return true for business plan', () => {
      expect(canUseAutoImages('business')).toBe(true);
    });
  });

  describe('canUseDeploy', () => {
    it('should return false for users without subscription', () => {
      expect(canUseDeploy()).toBe(false);
      expect(canUseDeploy(undefined)).toBe(false);
    });

    it('should return false for starter plan', () => {
      expect(canUseDeploy('starter')).toBe(false);
    });

    it('should return false for pro plan', () => {
      expect(canUseDeploy('pro')).toBe(false);
    });

    it('should return true for business plan', () => {
      expect(canUseDeploy('business')).toBe(true);
    });
  });

  describe('canUsePremiumTemplates', () => {
    it('should return false for users without subscription', () => {
      expect(canUsePremiumTemplates()).toBe(false);
      expect(canUsePremiumTemplates(undefined)).toBe(false);
    });

    it('should return false for starter plan', () => {
      expect(canUsePremiumTemplates('starter')).toBe(false);
    });

    it('should return false for pro plan', () => {
      expect(canUsePremiumTemplates('pro')).toBe(false);
    });

    it('should return true for business plan', () => {
      expect(canUsePremiumTemplates('business')).toBe(true);
    });
  });

  describe('getMaxSites', () => {
    it('should return 3 sites for users without subscription', () => {
      expect(getMaxSites()).toBe(3);
      expect(getMaxSites(undefined)).toBe(3);
    });

    it('should return 10 sites for starter plan', () => {
      expect(getMaxSites('starter')).toBe(10);
    });

    it('should return 50 sites for pro plan', () => {
      expect(getMaxSites('pro')).toBe(50);
    });

    it('should return unlimited (-1) for business plan', () => {
      expect(getMaxSites('business')).toBe(-1);
    });
  });

  describe('getFeatures', () => {
    it('should return basic features for free tier', () => {
      const features = getFeatures();
      expect(features).toContain('AI Text Generation');
      expect(features).toContain('Basic Templates');
      expect(features).toContain('Up to 3 Sites');
      expect(features.length).toBeGreaterThan(0);
    });

    it('should return starter features', () => {
      const features = getFeatures('starter');
      expect(features).toContain('AI Text Generation');
      expect(features).toContain('Up to 10 Sites');
      expect(features).toContain('Basic Templates');
      expect(features).toContain('Email Support');
    });

    it('should return pro features including SEO Boost', () => {
      const features = getFeatures('pro');
      expect(features).toContain('Everything in Starter');
      expect(features).toContain('SEO Boost');
      expect(features).toContain('Up to 50 Sites');
      expect(features).toContain('Priority Support');
    });

    it('should return business features including all premium features', () => {
      const features = getFeatures('business');
      expect(features).toContain('Everything in Pro');
      expect(features).toContain('Auto Images AI');
      expect(features).toContain('AutoDeploy');
      expect(features).toContain('Premium Templates');
      expect(features).toContain('Unlimited Sites');
      expect(features).toContain('Dedicated Support');
    });

    it('should return different feature sets for different plans', () => {
      const freeFeaturesCount = getFeatures().length;
      const starterFeaturesCount = getFeatures('starter').length;
      const proFeaturesCount = getFeatures('pro').length;
      const businessFeaturesCount = getFeatures('business').length;

      // Higher tier plans should have more features
      expect(starterFeaturesCount).toBeGreaterThanOrEqual(freeFeaturesCount);
      expect(proFeaturesCount).toBeGreaterThanOrEqual(starterFeaturesCount);
      expect(businessFeaturesCount).toBeGreaterThanOrEqual(proFeaturesCount);
    });
  });

  describe('getPlanDisplayName', () => {
    it('should return "Free" for undefined plan', () => {
      expect(getPlanDisplayName()).toBe('Free');
      expect(getPlanDisplayName(undefined)).toBe('Free');
    });

    it('should return "Starter" for starter plan', () => {
      expect(getPlanDisplayName('starter')).toBe('Starter');
    });

    it('should return "Pro" for pro plan', () => {
      expect(getPlanDisplayName('pro')).toBe('Pro');
    });

    it('should return "Business" for business plan', () => {
      expect(getPlanDisplayName('business')).toBe('Business');
    });

    it('should capitalize plan names correctly', () => {
      const plans: SubscriptionPlan[] = ['starter', 'pro', 'business'];
      plans.forEach((plan) => {
        const displayName = getPlanDisplayName(plan);
        expect(displayName[0]).toBe(displayName[0].toUpperCase());
      });
    });
  });

  describe('getPlanPrice', () => {
    it('should return "$9" for starter plan', () => {
      expect(getPlanPrice('starter')).toBe('$9');
    });

    it('should return "$29" for pro plan', () => {
      expect(getPlanPrice('pro')).toBe('$29');
    });

    it('should return "$99" for business plan', () => {
      expect(getPlanPrice('business')).toBe('$99');
    });

    it('should return prices in correct format', () => {
      const plans: SubscriptionPlan[] = ['starter', 'pro', 'business'];
      plans.forEach((plan) => {
        const price = getPlanPrice(plan);
        expect(price).toMatch(/^\$\d+$/);
      });
    });
  });

  describe('requiresUpgrade', () => {
    it('should require upgrade for SEO Boost on free tier', () => {
      expect(requiresUpgrade('seo', undefined)).toBe(true);
    });

    it('should require upgrade for SEO Boost on starter plan', () => {
      expect(requiresUpgrade('seo', 'starter')).toBe(true);
    });

    it('should not require upgrade for SEO Boost on pro plan', () => {
      expect(requiresUpgrade('seo', 'pro')).toBe(false);
    });

    it('should not require upgrade for SEO Boost on business plan', () => {
      expect(requiresUpgrade('seo', 'business')).toBe(false);
    });

    it('should require upgrade for Auto Images on free tier', () => {
      expect(requiresUpgrade('images', undefined)).toBe(true);
    });

    it('should require upgrade for Auto Images on starter plan', () => {
      expect(requiresUpgrade('images', 'starter')).toBe(true);
    });

    it('should require upgrade for Auto Images on pro plan', () => {
      expect(requiresUpgrade('images', 'pro')).toBe(true);
    });

    it('should not require upgrade for Auto Images on business plan', () => {
      expect(requiresUpgrade('images', 'business')).toBe(false);
    });

    it('should require upgrade for Deploy on free tier', () => {
      expect(requiresUpgrade('deploy', undefined)).toBe(true);
    });

    it('should require upgrade for Deploy on starter plan', () => {
      expect(requiresUpgrade('deploy', 'starter')).toBe(true);
    });

    it('should require upgrade for Deploy on pro plan', () => {
      expect(requiresUpgrade('deploy', 'pro')).toBe(true);
    });

    it('should not require upgrade for Deploy on business plan', () => {
      expect(requiresUpgrade('deploy', 'business')).toBe(false);
    });

    it('should require upgrade for Premium Templates on free tier', () => {
      expect(requiresUpgrade('templates', undefined)).toBe(true);
    });

    it('should require upgrade for Premium Templates on starter plan', () => {
      expect(requiresUpgrade('templates', 'starter')).toBe(true);
    });

    it('should require upgrade for Premium Templates on pro plan', () => {
      expect(requiresUpgrade('templates', 'pro')).toBe(true);
    });

    it('should not require upgrade for Premium Templates on business plan', () => {
      expect(requiresUpgrade('templates', 'business')).toBe(false);
    });
  });

  describe('Feature matrix validation', () => {
    it('should have consistent permissions across all features', () => {
      const plans: (SubscriptionPlan | undefined)[] = [undefined, 'starter', 'pro', 'business'];

      plans.forEach((plan) => {
        // Business plan should have all features
        if (plan === 'business') {
          expect(canUseSEOBoost(plan)).toBe(true);
          expect(canUseAutoImages(plan)).toBe(true);
          expect(canUseDeploy(plan)).toBe(true);
          expect(canUsePremiumTemplates(plan)).toBe(true);
        }

        // Pro plan should have SEO but not images/deploy/templates
        if (plan === 'pro') {
          expect(canUseSEOBoost(plan)).toBe(true);
          expect(canUseAutoImages(plan)).toBe(false);
          expect(canUseDeploy(plan)).toBe(false);
          expect(canUsePremiumTemplates(plan)).toBe(false);
        }

        // Starter and free should have no premium features
        if (plan === 'starter' || plan === undefined) {
          expect(canUseSEOBoost(plan)).toBe(false);
          expect(canUseAutoImages(plan)).toBe(false);
          expect(canUseDeploy(plan)).toBe(false);
          expect(canUsePremiumTemplates(plan)).toBe(false);
        }
      });
    });

    it('should have increasing site limits across plans', () => {
      const freeSites = getMaxSites();
      const starterSites = getMaxSites('starter');
      const proSites = getMaxSites('pro');
      const businessSites = getMaxSites('business');

      expect(starterSites).toBeGreaterThan(freeSites);
      expect(proSites).toBeGreaterThan(starterSites);
      // Business is unlimited (-1), so it's technically less than pro's number
      // but represents unlimited
      expect(businessSites).toBe(-1);
    });

    it('should correctly identify upgrade requirements across all tiers', () => {
      // Free tier needs upgrade for everything
      expect(requiresUpgrade('seo', undefined)).toBe(true);
      expect(requiresUpgrade('images', undefined)).toBe(true);
      expect(requiresUpgrade('deploy', undefined)).toBe(true);
      expect(requiresUpgrade('templates', undefined)).toBe(true);

      // Starter needs upgrade for everything
      expect(requiresUpgrade('seo', 'starter')).toBe(true);
      expect(requiresUpgrade('images', 'starter')).toBe(true);
      expect(requiresUpgrade('deploy', 'starter')).toBe(true);
      expect(requiresUpgrade('templates', 'starter')).toBe(true);

      // Pro has SEO but needs upgrade for others
      expect(requiresUpgrade('seo', 'pro')).toBe(false);
      expect(requiresUpgrade('images', 'pro')).toBe(true);
      expect(requiresUpgrade('deploy', 'pro')).toBe(true);
      expect(requiresUpgrade('templates', 'pro')).toBe(true);

      // Business doesn't need upgrade for anything
      expect(requiresUpgrade('seo', 'business')).toBe(false);
      expect(requiresUpgrade('images', 'business')).toBe(false);
      expect(requiresUpgrade('deploy', 'business')).toBe(false);
      expect(requiresUpgrade('templates', 'business')).toBe(false);
    });
  });

  describe('Edge cases and type safety', () => {
    it('should handle undefined plan gracefully across all functions', () => {
      expect(() => canUseSEOBoost(undefined)).not.toThrow();
      expect(() => canUseAutoImages(undefined)).not.toThrow();
      expect(() => canUseDeploy(undefined)).not.toThrow();
      expect(() => canUsePremiumTemplates(undefined)).not.toThrow();
      expect(() => getMaxSites(undefined)).not.toThrow();
      expect(() => getFeatures(undefined)).not.toThrow();
      expect(() => getPlanDisplayName(undefined)).not.toThrow();
    });

    it('should return consistent results for same plan', () => {
      const plan: SubscriptionPlan = 'pro';

      const result1 = canUseSEOBoost(plan);
      const result2 = canUseSEOBoost(plan);
      expect(result1).toBe(result2);

      const features1 = getFeatures(plan);
      const features2 = getFeatures(plan);
      expect(features1).toEqual(features2);
    });

    it('should handle all subscription plan types', () => {
      const plans: SubscriptionPlan[] = ['starter', 'pro', 'business'];

      plans.forEach((plan) => {
        expect(() => canUseSEOBoost(plan)).not.toThrow();
        expect(() => getMaxSites(plan)).not.toThrow();
        expect(() => getFeatures(plan)).not.toThrow();
        expect(() => getPlanDisplayName(plan)).not.toThrow();
        expect(() => getPlanPrice(plan)).not.toThrow();
      });
    });
  });
});
