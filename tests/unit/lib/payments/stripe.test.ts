/**
 * Unit tests for Stripe payment integration
 * Tests configuration and helper functions
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  getPlanFromPriceId,
  isStripeConfigured,
} from '@/lib/payments/stripe';

describe('Stripe Payment Integration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Setup test environment variables
    process.env = {
      ...originalEnv,
      STRIPE_SECRET_KEY: 'sk_test_123',
      STRIPE_WEBHOOK_SECRET: 'whsec_test_123',
      STRIPE_PRICE_STARTER: 'price_starter_123',
      STRIPE_PRICE_PRO: 'price_pro_123',
      STRIPE_PRICE_BUSINESS: 'price_business_123',
    };
  });

  afterEach(() => {
    // Restore environment
    process.env = originalEnv;
  });

  describe('isStripeConfigured', () => {
    it('should return true when all env vars are set', () => {
      expect(isStripeConfigured()).toBe(true);
    });

    it('should return false when STRIPE_SECRET_KEY is missing', () => {
      delete process.env.STRIPE_SECRET_KEY;
      expect(isStripeConfigured()).toBe(false);
    });

    it('should return false when STRIPE_WEBHOOK_SECRET is missing', () => {
      delete process.env.STRIPE_WEBHOOK_SECRET;
      expect(isStripeConfigured()).toBe(false);
    });

    it('should return false when price IDs are missing', () => {
      delete process.env.STRIPE_PRICE_STARTER;
      expect(isStripeConfigured()).toBe(false);
    });

    it('should return false when all env vars are missing', () => {
      delete process.env.STRIPE_SECRET_KEY;
      delete process.env.STRIPE_WEBHOOK_SECRET;
      delete process.env.STRIPE_PRICE_STARTER;
      delete process.env.STRIPE_PRICE_PRO;
      delete process.env.STRIPE_PRICE_BUSINESS;
      expect(isStripeConfigured()).toBe(false);
    });
  });

  describe('getPlanFromPriceId', () => {
    it('should return "starter" for starter price ID', () => {
      const plan = getPlanFromPriceId('price_starter_123');
      expect(plan).toBe('starter');
    });

    it('should return "pro" for pro price ID', () => {
      const plan = getPlanFromPriceId('price_pro_123');
      expect(plan).toBe('pro');
    });

    it('should return "business" for business price ID', () => {
      const plan = getPlanFromPriceId('price_business_123');
      expect(plan).toBe('business');
    });

    it('should return null for unknown price ID', () => {
      const plan = getPlanFromPriceId('price_unknown_123');
      expect(plan).toBeNull();
    });

    it('should return null for empty string', () => {
      const plan = getPlanFromPriceId('');
      expect(plan).toBeNull();
    });

    it('should correctly identify all plan types', () => {
      const priceIds = [
        { id: 'price_starter_123', expected: 'starter' },
        { id: 'price_pro_123', expected: 'pro' },
        { id: 'price_business_123', expected: 'business' },
      ];

      priceIds.forEach(({ id, expected }) => {
        expect(getPlanFromPriceId(id)).toBe(expected);
      });
    });

    it('should handle different price ID formats', () => {
      // Test with different env var values
      process.env.STRIPE_PRICE_STARTER = 'price_1A2B3C4D5E6F7G8H9I0J';
      expect(getPlanFromPriceId('price_1A2B3C4D5E6F7G8H9I0J')).toBe('starter');

      process.env.STRIPE_PRICE_PRO = 'price_xyz_prod_abc123';
      expect(getPlanFromPriceId('price_xyz_prod_abc123')).toBe('pro');

      process.env.STRIPE_PRICE_BUSINESS = 'price_test_business_2024';
      expect(getPlanFromPriceId('price_test_business_2024')).toBe('business');
    });

    it('should return null when env vars are not set', () => {
      delete process.env.STRIPE_PRICE_STARTER;
      delete process.env.STRIPE_PRICE_PRO;
      delete process.env.STRIPE_PRICE_BUSINESS;

      expect(getPlanFromPriceId('price_starter_123')).toBeNull();
      expect(getPlanFromPriceId('price_pro_123')).toBeNull();
      expect(getPlanFromPriceId('price_business_123')).toBeNull();
    });
  });

  describe('Configuration validation', () => {
    it('should require all env vars for proper configuration', () => {
      const requiredVars = [
        'STRIPE_SECRET_KEY',
        'STRIPE_WEBHOOK_SECRET',
        'STRIPE_PRICE_STARTER',
        'STRIPE_PRICE_PRO',
        'STRIPE_PRICE_BUSINESS',
      ];

      // Test that missing any single var makes it unconfigured
      requiredVars.forEach((varName) => {
        const savedValue = process.env[varName];
        delete process.env[varName];
        expect(isStripeConfigured()).toBe(false);
        process.env[varName] = savedValue;
      });

      // Verify it's configured again with all vars
      expect(isStripeConfigured()).toBe(true);
    });

    it('should handle empty string env vars as missing', () => {
      process.env.STRIPE_SECRET_KEY = '';
      expect(isStripeConfigured()).toBe(false);

      process.env.STRIPE_SECRET_KEY = 'sk_test_123';
      process.env.STRIPE_WEBHOOK_SECRET = '';
      expect(isStripeConfigured()).toBe(false);
    });
  });

  describe('Plan price ID mapping', () => {
    it('should correctly map all subscription plans', () => {
      const mappings = [
        { env: 'STRIPE_PRICE_STARTER', plan: 'starter' },
        { env: 'STRIPE_PRICE_PRO', plan: 'pro' },
        { env: 'STRIPE_PRICE_BUSINESS', plan: 'business' },
      ];

      mappings.forEach(({ env, plan }) => {
        const priceId = process.env[env];
        expect(priceId).toBeDefined();
        expect(getPlanFromPriceId(priceId!)).toBe(plan);
      });
    });

    it('should not match partial price IDs', () => {
      process.env.STRIPE_PRICE_STARTER = 'price_starter_full_123';
      expect(getPlanFromPriceId('price_starter_')).toBeNull();
      expect(getPlanFromPriceId('starter_full_123')).toBeNull();
    });

    it('should be case sensitive', () => {
      process.env.STRIPE_PRICE_STARTER = 'price_STARTER_123';
      expect(getPlanFromPriceId('price_starter_123')).toBeNull();
      expect(getPlanFromPriceId('price_STARTER_123')).toBe('starter');
    });
  });
});
