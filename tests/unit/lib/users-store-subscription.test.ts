/**
 * Unit tests for user store subscription functions
 * Tests subscription plan management and Stripe customer ID handling
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import {
  updateUserSubscription,
  updateUserStripeCustomerId,
  getUserByStripeCustomerId,
  getUserById,
  saveUsers,
  type UserEntry,
  type SubscriptionPlan,
} from '@/lib/users-store';

const DATA_DIR = path.join(process.cwd(), '.data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

describe('User Store - Subscription Functions', () => {
  // Test users for testing
  const testUsers: UserEntry[] = [
    {
      id: 'user-sub-1',
      email: 'user1-sub@example.com',
      passwordHash: '$2a$10$abcdefghijklmnopqrstuv',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'user-sub-2',
      email: 'user2-sub@example.com',
      passwordHash: '$2a$10$wxyzabcdefghijklmnopqr',
      createdAt: new Date().toISOString(),
      subscriptionPlan: 'pro' as SubscriptionPlan,
      stripeCustomerId: 'cus_existing_123',
    },
    {
      id: 'user-sub-3',
      email: 'user3-sub@example.com',
      passwordHash: '$2a$10$zyxwvutsrqponmlkjihgfe',
      createdAt: new Date().toISOString(),
      subscriptionPlan: 'business' as SubscriptionPlan,
      stripeCustomerId: 'cus_business_456',
    },
  ];

  beforeEach(async () => {
    // Create .data directory and initialize with test users
    await fs.mkdir(DATA_DIR, { recursive: true });
    await saveUsers(testUsers);
  });

  afterEach(async () => {
    // Clean up test data
    try {
      await fs.unlink(USERS_FILE);
    } catch {
      // Ignore if file doesn't exist
    }
  });

  describe('updateUserSubscription', () => {
    it('should update user subscription plan to starter', async () => {
      const result = await updateUserSubscription('user-sub-1', 'starter');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.id).toBe('user-sub-1');
        expect(result.subscriptionPlan).toBe('starter');
      }
    });

    it('should update user subscription plan to pro', async () => {
      const result = await updateUserSubscription('user-sub-1', 'pro');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.subscriptionPlan).toBe('pro');
      }
    });

    it('should update user subscription plan to business', async () => {
      const result = await updateUserSubscription('user-sub-1', 'business');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.subscriptionPlan).toBe('business');
      }
    });

    it('should upgrade existing subscription plan', async () => {
      const result = await updateUserSubscription('user-sub-2', 'business');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.id).toBe('user-sub-2');
        expect(result.subscriptionPlan).toBe('business');
        expect(result.stripeCustomerId).toBe('cus_existing_123'); // Should preserve existing customer ID
      }
    });

    it('should downgrade existing subscription plan', async () => {
      const result = await updateUserSubscription('user-sub-3', 'starter');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.id).toBe('user-sub-3');
        expect(result.subscriptionPlan).toBe('starter');
        expect(result.stripeCustomerId).toBe('cus_business_456'); // Should preserve existing customer ID
      }
    });

    it('should remove subscription plan when null is passed', async () => {
      const result = await updateUserSubscription('user-sub-2', null);

      expect(result).not.toBeNull();
      if (result) {
        expect(result.id).toBe('user-sub-2');
        expect(result.subscriptionPlan).toBeUndefined();
        expect(result.stripeCustomerId).toBe('cus_existing_123'); // Should preserve customer ID
      }
    });

    it('should return null for non-existent user', async () => {
      const result = await updateUserSubscription('non-existent-user', 'pro');

      expect(result).toBeNull();
    });

    it('should preserve other user properties when updating subscription', async () => {
      const result = await updateUserSubscription('user-sub-1', 'pro');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.email).toBe('user1-sub@example.com');
        expect(result.passwordHash).toBe('$2a$10$abcdefghijklmnopqrstuv');
        expect(result.createdAt).toBeDefined();
      }
    });
  });

  describe('updateUserStripeCustomerId', () => {
    it('should add Stripe customer ID to user without one', async () => {
      const result = await updateUserStripeCustomerId('user-sub-1', 'cus_new_123');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.id).toBe('user-sub-1');
        expect(result.stripeCustomerId).toBe('cus_new_123');
      }
    });

    it('should update existing Stripe customer ID', async () => {
      const result = await updateUserStripeCustomerId('user-sub-2', 'cus_updated_789');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.id).toBe('user-sub-2');
        expect(result.stripeCustomerId).toBe('cus_updated_789');
        expect(result.subscriptionPlan).toBe('pro'); // Should preserve subscription
      }
    });

    it('should return null for non-existent user', async () => {
      const result = await updateUserStripeCustomerId('non-existent', 'cus_123');

      expect(result).toBeNull();
    });

    it('should handle different customer ID formats', async () => {
      const customerId = 'cus_AbCdEf123456789';
      const result = await updateUserStripeCustomerId('user-sub-1', customerId);

      expect(result).not.toBeNull();
      if (result) {
        expect(result.stripeCustomerId).toBe(customerId);
      }
    });

    it('should preserve all other user properties', async () => {
      const result = await updateUserStripeCustomerId('user-sub-1', 'cus_preserve_123');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.email).toBe('user1-sub@example.com');
        expect(result.passwordHash).toBe('$2a$10$abcdefghijklmnopqrstuv');
        expect(result.createdAt).toBeDefined();
      }
    });
  });

  describe('getUserByStripeCustomerId', () => {
    it('should find user by Stripe customer ID', async () => {
      const result = await getUserByStripeCustomerId('cus_existing_123');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.id).toBe('user-sub-2');
        expect(result.email).toBe('user2-sub@example.com');
        expect(result.subscriptionPlan).toBe('pro');
      }
    });

    it('should find business user by customer ID', async () => {
      const result = await getUserByStripeCustomerId('cus_business_456');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.id).toBe('user-sub-3');
        expect(result.subscriptionPlan).toBe('business');
      }
    });

    it('should return null for non-existent customer ID', async () => {
      const result = await getUserByStripeCustomerId('cus_nonexistent_999');

      expect(result).toBeNull();
    });

    it('should return null for empty string', async () => {
      const result = await getUserByStripeCustomerId('');

      expect(result).toBeNull();
    });

    it('should return correct user among multiple users', async () => {
      const result = await getUserByStripeCustomerId('cus_existing_123');

      expect(result).not.toBeNull();
      if (result) {
        expect(result.id).toBe('user-sub-2');
        expect(result.email).toBe('user2-sub@example.com');
        // Should not match other users
        expect(result.id).not.toBe('user-sub-1');
        expect(result.id).not.toBe('user-sub-3');
      }
    });
  });

  describe('Integration - Complete subscription flow', () => {
    it('should handle complete new subscription flow', async () => {
      // Step 1: User starts without subscription
      let user = await getUserById('user-sub-1');
      expect(user?.subscriptionPlan).toBeUndefined();
      expect(user?.stripeCustomerId).toBeUndefined();

      // Step 2: Add Stripe customer ID after checkout
      user = await updateUserStripeCustomerId('user-sub-1', 'cus_flow_123');
      expect(user?.stripeCustomerId).toBe('cus_flow_123');

      // Step 3: Activate subscription after webhook
      user = await updateUserSubscription('user-sub-1', 'pro');
      expect(user?.subscriptionPlan).toBe('pro');

      // Step 4: Verify user can be found by customer ID
      const foundUser = await getUserByStripeCustomerId('cus_flow_123');
      expect(foundUser?.id).toBe('user-sub-1');
      expect(foundUser?.subscriptionPlan).toBe('pro');
    });

    it('should handle subscription upgrade flow', async () => {
      // Start with starter plan
      let user = await updateUserSubscription('user-sub-1', 'starter');
      expect(user?.subscriptionPlan).toBe('starter');

      // Upgrade to pro
      user = await updateUserSubscription('user-sub-1', 'pro');
      expect(user?.subscriptionPlan).toBe('pro');

      // Upgrade to business
      user = await updateUserSubscription('user-sub-1', 'business');
      expect(user?.subscriptionPlan).toBe('business');
    });

    it('should handle subscription cancellation flow', async () => {
      // User with active subscription
      let user = await getUserById('user-sub-2');
      expect(user?.subscriptionPlan).toBe('pro');
      expect(user?.stripeCustomerId).toBe('cus_existing_123');

      // Cancel subscription (remove plan but keep customer ID)
      user = await updateUserSubscription('user-sub-2', null);
      expect(user?.subscriptionPlan).toBeUndefined();
      expect(user?.stripeCustomerId).toBe('cus_existing_123'); // Customer ID preserved

      // User should still be findable by customer ID
      const foundUser = await getUserByStripeCustomerId('cus_existing_123');
      expect(foundUser).not.toBeNull();
      expect(foundUser?.id).toBe('user-sub-2');
    });

    it('should handle subscription reactivation flow', async () => {
      // Cancel subscription first
      let user = await updateUserSubscription('user-sub-2', null);
      expect(user?.subscriptionPlan).toBeUndefined();

      // Reactivate with same plan
      user = await updateUserSubscription('user-sub-2', 'pro');
      expect(user?.subscriptionPlan).toBe('pro');
      expect(user?.stripeCustomerId).toBe('cus_existing_123');
    });
  });

  describe('Type safety and validation', () => {
    it('should accept valid subscription plan types', async () => {
      const plans: SubscriptionPlan[] = ['starter', 'pro', 'business'];

      for (const plan of plans) {
        const result = await updateUserSubscription('user-sub-1', plan);
        expect(result).not.toBeNull();
        if (result) {
          expect(result.subscriptionPlan).toBe(plan);
        }
      }
    });

    it('should preserve user entry structure', async () => {
      const result = await updateUserStripeCustomerId('user-sub-1', 'cus_test');

      expect(result).not.toBeNull();
      if (result) {
        // Check all required UserEntry fields
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('passwordHash');
        expect(result).toHaveProperty('createdAt');
        expect(typeof result.id).toBe('string');
        expect(typeof result.email).toBe('string');
        expect(typeof result.passwordHash).toBe('string');
        expect(typeof result.createdAt).toBe('string');
      }
    });
  });
});
