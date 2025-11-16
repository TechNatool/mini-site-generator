/**
 * auth-guard.ts
 *
 * Authentication middleware for protecting routes
 */

import { NextRequest } from 'next/server';
import { getSessionFromCookies, getUserIdFromSession } from './session';
import { getUserById, type UserEntry } from './users-store';

/**
 * Require authentication for a request
 * Returns the authenticated user or null if not authenticated
 */
export async function requireAuth(request: NextRequest): Promise<UserEntry | null> {
  const cookieHeader = request.headers.get('cookie');
  const sessionToken = getSessionFromCookies(cookieHeader);
  const userId = getUserIdFromSession(sessionToken);

  if (!userId) {
    return null;
  }

  // Verify user still exists in database
  const user = await getUserById(userId);
  return user;
}

/**
 * Get the current user from a request (without throwing)
 * Returns user or null
 */
export async function getCurrentUser(request: NextRequest): Promise<UserEntry | null> {
  return requireAuth(request);
}

/**
 * Check if a user is authenticated
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const user = await requireAuth(request);
  return user !== null;
}

/**
 * Extract user ID from request without database lookup
 * Returns user ID or null
 */
export function getUserIdFromRequest(request: NextRequest): string | null {
  const cookieHeader = request.headers.get('cookie');
  const sessionToken = getSessionFromCookies(cookieHeader);
  return getUserIdFromSession(sessionToken);
}
