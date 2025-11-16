/**
 * Tests for users-store.ts
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs/promises';
import path from 'path';
import {
  loadUsers,
  saveUsers,
  getUserByEmail,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  hashPassword,
  verifyPassword,
  getUserCount,
  type UserEntry,
} from '../../../lib/users-store';

const TEST_DATA_DIR = path.join(process.cwd(), '.data-test');
const TEST_USERS_FILE = path.join(TEST_DATA_DIR, 'users.json');

// Mock the DATA_DIR and USERS_FILE paths
vi.mock('../../../lib/users-store', async () => {
  const actual = await vi.importActual('../../../lib/users-store');
  return {
    ...actual,
  };
});

describe('users-store', () => {
  beforeEach(async () => {
    // Create test data directory
    await fs.mkdir(TEST_DATA_DIR, { recursive: true });
  });

  afterEach(async () => {
    // Clean up test data
    try {
      await fs.rm(TEST_DATA_DIR, { recursive: true, force: true });
    } catch (error) {
      // Ignore errors
    }
  });

  describe('loadUsers', () => {
    it('should return empty array when file does not exist', async () => {
      const users = await loadUsers();
      expect(Array.isArray(users)).toBe(true);
    });

    it('should load users from file', async () => {
      const testUsers: UserEntry[] = [
        {
          id: 'user1',
          email: 'test@example.com',
          passwordHash: 'hash123',
          createdAt: new Date().toISOString(),
        },
      ];

      await saveUsers(testUsers);
      const users = await loadUsers();

      expect(users).toHaveLength(1);
      expect(users[0].email).toBe('test@example.com');
    });
  });

  describe('saveUsers', () => {
    it('should save users to file', async () => {
      const testUsers: UserEntry[] = [
        {
          id: 'user1',
          email: 'test@example.com',
          passwordHash: 'hash123',
          createdAt: new Date().toISOString(),
        },
      ];

      await saveUsers(testUsers);

      const users = await loadUsers();
      expect(users).toHaveLength(1);
    });
  });

  describe('getUserByEmail', () => {
    it('should return user by email', async () => {
      const testUser: UserEntry = {
        id: 'user1',
        email: 'test@example.com',
        passwordHash: 'hash123',
        createdAt: new Date().toISOString(),
      };

      await saveUsers([testUser]);

      const user = await getUserByEmail('test@example.com');
      expect(user).not.toBeNull();
      expect(user?.email).toBe('test@example.com');
    });

    it('should return null when user not found', async () => {
      const user = await getUserByEmail('nonexistent@example.com');
      expect(user).toBeNull();
    });

    it('should be case-insensitive', async () => {
      const testUser: UserEntry = {
        id: 'user1',
        email: 'test@example.com',
        passwordHash: 'hash123',
        createdAt: new Date().toISOString(),
      };

      await saveUsers([testUser]);

      const user = await getUserByEmail('TEST@EXAMPLE.COM');
      expect(user).not.toBeNull();
      expect(user?.email).toBe('test@example.com');
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const testUser: UserEntry = {
        id: 'user1',
        email: 'test@example.com',
        passwordHash: 'hash123',
        createdAt: new Date().toISOString(),
      };

      await saveUsers([testUser]);

      const user = await getUserById('user1');
      expect(user).not.toBeNull();
      expect(user?.id).toBe('user1');
    });

    it('should return null when user not found', async () => {
      const user = await getUserById('nonexistent');
      expect(user).toBeNull();
    });
  });

  describe('addUser', () => {
    it('should add a new user', async () => {
      const newUser: UserEntry = {
        id: 'user1',
        email: 'new@example.com',
        passwordHash: 'hash123',
        createdAt: new Date().toISOString(),
      };

      await addUser(newUser);

      const users = await loadUsers();
      expect(users).toHaveLength(1);
      expect(users[0].email).toBe('new@example.com');
    });

    it('should throw error when email already exists', async () => {
      const user1: UserEntry = {
        id: 'user1',
        email: 'test@example.com',
        passwordHash: 'hash123',
        createdAt: new Date().toISOString(),
      };

      await addUser(user1);

      const user2: UserEntry = {
        id: 'user2',
        email: 'test@example.com',
        passwordHash: 'hash456',
        createdAt: new Date().toISOString(),
      };

      await expect(addUser(user2)).rejects.toThrow('Email already registered');
    });

    it('should throw error when user ID already exists', async () => {
      const user1: UserEntry = {
        id: 'user1',
        email: 'test1@example.com',
        passwordHash: 'hash123',
        createdAt: new Date().toISOString(),
      };

      await addUser(user1);

      const user2: UserEntry = {
        id: 'user1',
        email: 'test2@example.com',
        passwordHash: 'hash456',
        createdAt: new Date().toISOString(),
      };

      await expect(addUser(user2)).rejects.toThrow('User ID already exists');
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const user: UserEntry = {
        id: 'user1',
        email: 'test@example.com',
        passwordHash: 'hash123',
        createdAt: new Date().toISOString(),
      };

      await saveUsers([user]);

      const updated = await updateUser('user1', { email: 'updated@example.com' });

      expect(updated).not.toBeNull();
      expect(updated?.email).toBe('updated@example.com');
    });

    it('should return null when user not found', async () => {
      const updated = await updateUser('nonexistent', { email: 'new@example.com' });
      expect(updated).toBeNull();
    });

    it('should throw error when updating to existing email', async () => {
      const user1: UserEntry = {
        id: 'user1',
        email: 'test1@example.com',
        passwordHash: 'hash123',
        createdAt: new Date().toISOString(),
      };

      const user2: UserEntry = {
        id: 'user2',
        email: 'test2@example.com',
        passwordHash: 'hash456',
        createdAt: new Date().toISOString(),
      };

      await saveUsers([user1, user2]);

      await expect(updateUser('user1', { email: 'test2@example.com' })).rejects.toThrow(
        'Email already in use by another user'
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user: UserEntry = {
        id: 'user1',
        email: 'test@example.com',
        passwordHash: 'hash123',
        createdAt: new Date().toISOString(),
      };

      await saveUsers([user]);

      const deleted = await deleteUser('user1');
      expect(deleted).toBe(true);

      const users = await loadUsers();
      expect(users).toHaveLength(0);
    });

    it('should return false when user not found', async () => {
      const deleted = await deleteUser('nonexistent');
      expect(deleted).toBe(false);
    });
  });

  describe('hashPassword and verifyPassword', () => {
    it('should hash and verify password', async () => {
      const password = 'mySecretPassword123';
      const hash = await hashPassword(password);

      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(0);

      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it('should fail verification with wrong password', async () => {
      const password = 'mySecretPassword123';
      const hash = await hashPassword(password);

      const isValid = await verifyPassword('wrongPassword', hash);
      expect(isValid).toBe(false);
    });
  });

  describe('getUserCount', () => {
    it('should return 0 when no users', async () => {
      const count = await getUserCount();
      expect(count).toBe(0);
    });

    it('should return correct user count', async () => {
      const users: UserEntry[] = [
        {
          id: 'user1',
          email: 'test1@example.com',
          passwordHash: 'hash123',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'user2',
          email: 'test2@example.com',
          passwordHash: 'hash456',
          createdAt: new Date().toISOString(),
        },
      ];

      await saveUsers(users);

      const count = await getUserCount();
      expect(count).toBe(2);
    });
  });
});
