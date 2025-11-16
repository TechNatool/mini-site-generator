/**
 * session.ts
 *
 * Secure session management with signed cookies
 * Uses HMAC SHA256 for token signing
 */

import crypto from 'crypto';

const SESSION_SECRET = process.env.SESSION_SECRET || 'default-secret-change-in-production';
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

/**
 * Create a signed session token for a user ID
 * Token format: userId.timestamp.signature
 */
export function createSession(userId: string): string {
  const timestamp = Date.now().toString();
  const payload = `${userId}.${timestamp}`;
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('hex');

  return `${payload}.${signature}`;
}

/**
 * Verify and extract user ID from a session token
 * Returns user ID if valid, null if invalid or expired
 */
export function getUserIdFromSession(token: string | null): string | null {
  if (!token) {
    return null;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const [userId, timestamp, signature] = parts;
    const payload = `${userId}.${timestamp}`;

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(payload)
      .digest('hex');

    if (signature !== expectedSignature) {
      return null;
    }

    // Check expiration
    const tokenAge = Date.now() - parseInt(timestamp, 10);
    if (tokenAge > SESSION_DURATION) {
      return null;
    }

    return userId;
  } catch (error) {
    return null;
  }
}

/**
 * Create a session cookie header for Set-Cookie
 */
export function createSessionCookie(userId: string): string {
  const token = createSession(userId);
  const maxAge = Math.floor(SESSION_DURATION / 1000); // Convert to seconds
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = [
    `session=${token}`,
    `Max-Age=${maxAge}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
  ];

  if (isProduction) {
    cookieOptions.push('Secure');
  }

  return cookieOptions.join('; ');
}

/**
 * Create a cookie header to clear the session
 */
export function destroySessionCookie(): string {
  return 'session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0';
}

/**
 * Extract session token from cookie header
 */
export function getSessionFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').map((c) => c.trim());
  const sessionCookie = cookies.find((c) => c.startsWith('session='));

  if (!sessionCookie) {
    return null;
  }

  return sessionCookie.substring('session='.length);
}

/**
 * Verify if a session is valid
 */
export function isSessionValid(token: string | null): boolean {
  return getUserIdFromSession(token) !== null;
}
