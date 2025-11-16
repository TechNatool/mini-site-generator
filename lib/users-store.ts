/**
 * users-store.ts
 *
 * Persistent storage for user accounts
 * Stores user data in .data/users.json
 */

import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';

const DATA_DIR = path.join(process.cwd(), '.data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

export type UserEntry = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
};

/**
 * Load all users from storage (async)
 */
export async function loadUsers(): Promise<UserEntry[]> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist yet, return empty array
      return [];
    }
    // Invalid JSON or other error
    console.error('Error loading users:', error);
    return [];
  }
}

/**
 * Load all users from storage (sync)
 */
export function loadUsersSync(): UserEntry[] {
  try {
    const fsSync = require('fs');
    const data = fsSync.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return [];
    }
    console.error('Error loading users (sync):', error);
    return [];
  }
}

/**
 * Save all users to storage
 */
export async function saveUsers(users: UserEntry[]): Promise<void> {
  // Ensure .data directory exists
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }

  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<UserEntry | null> {
  const users = await loadUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Get user by ID
 */
export async function getUserById(id: string): Promise<UserEntry | null> {
  const users = await loadUsers();
  return users.find((u) => u.id === id) || null;
}

/**
 * Add a new user
 * Throws error if email already exists
 */
export async function addUser(entry: UserEntry): Promise<UserEntry> {
  const users = await loadUsers();

  // Check if email already exists
  const existing = users.find((u) => u.email.toLowerCase() === entry.email.toLowerCase());
  if (existing) {
    throw new Error('Email already registered');
  }

  // Check if ID already exists
  const existingId = users.find((u) => u.id === entry.id);
  if (existingId) {
    throw new Error('User ID already exists');
  }

  users.push(entry);
  await saveUsers(users);
  return entry;
}

/**
 * Update an existing user
 * Returns updated user or null if not found
 */
export async function updateUser(
  id: string,
  updates: Partial<UserEntry>
): Promise<UserEntry | null> {
  const users = await loadUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return null;
  }

  // If updating email, check it's not already taken by another user
  if (updates.email) {
    const existingEmail = users.find(
      (u) => u.id !== id && u.email.toLowerCase() === updates.email!.toLowerCase()
    );
    if (existingEmail) {
      throw new Error('Email already in use by another user');
    }
  }

  users[index] = { ...users[index], ...updates };
  await saveUsers(users);
  return users[index];
}

/**
 * Delete a user by ID
 * Returns true if deleted, false if not found
 */
export async function deleteUser(id: string): Promise<boolean> {
  const users = await loadUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return false;
  }

  users.splice(index, 1);
  await saveUsers(users);
  return true;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Get total number of users
 */
export async function getUserCount(): Promise<number> {
  const users = await loadUsers();
  return users.length;
}
