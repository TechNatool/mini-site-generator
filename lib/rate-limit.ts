/**
 * Rate Limiting System for ForgeWeb
 *
 * Implements IP-based and user-based rate limiting with persistent storage
 */

import fs from 'fs';
import path from 'path';
import { logApp } from './logger';

// Rate limit storage path
const RATE_LIMIT_FILE = path.join(process.cwd(), '.data', 'rate-limit.json');

// Rate limit configurations (requests per window)
export const RATE_LIMITS = {
  'auth/login': { maxRequests: 5, windowMs: 15 * 60 * 1000 }, // 5 requests per 15 minutes
  'auth/register': { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 requests per hour
  'emails/send': { maxRequests: 10, windowMs: 60 * 60 * 1000 }, // 10 requests per hour
  'payments': { maxRequests: 20, windowMs: 60 * 60 * 1000 }, // 20 requests per hour
  'api/general': { maxRequests: 100, windowMs: 60 * 60 * 1000 }, // 100 requests per hour (default)
};

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitData {
  [key: string]: RateLimitEntry;
}

/**
 * Ensure rate limit data directory exists
 */
function ensureDataDirectory() {
  const dataDir = path.dirname(RATE_LIMIT_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

/**
 * Load rate limit data from file
 */
function loadRateLimitData(): RateLimitData {
  ensureDataDirectory();

  if (!fs.existsSync(RATE_LIMIT_FILE)) {
    return {};
  }

  try {
    const content = fs.readFileSync(RATE_LIMIT_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    logApp('Failed to load rate limit data, using empty state', 'WARN', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return {};
  }
}

/**
 * Save rate limit data to file
 */
function saveRateLimitData(data: RateLimitData) {
  ensureDataDirectory();

  try {
    // Clean up expired entries before saving
    const now = Date.now();
    const cleanedData: RateLimitData = {};

    for (const [key, entry] of Object.entries(data)) {
      if (entry.resetTime > now) {
        cleanedData[key] = entry;
      }
    }

    fs.writeFileSync(RATE_LIMIT_FILE, JSON.stringify(cleanedData, null, 2), 'utf8');
  } catch (error) {
    logApp('Failed to save rate limit data', 'ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

/**
 * Generate a unique key for rate limiting
 */
function getRateLimitKey(identifier: string, endpoint: string): string {
  return `${endpoint}:${identifier}`;
}

/**
 * Check if a request should be rate limited
 *
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param endpoint - Endpoint being accessed (e.g., 'auth/login')
 * @returns Object with allowed status and remaining requests
 */
export function checkRateLimit(
  identifier: string,
  endpoint: keyof typeof RATE_LIMITS
): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
} {
  const config = RATE_LIMITS[endpoint] || RATE_LIMITS['api/general'];
  const key = getRateLimitKey(identifier, endpoint);
  const now = Date.now();

  // Load current data
  const data = loadRateLimitData();
  const entry = data[key];

  // If no entry or window expired, create new entry
  if (!entry || entry.resetTime <= now) {
    data[key] = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    saveRateLimitData(data);

    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: data[key].resetTime,
    };
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000); // seconds

    logApp('Rate limit exceeded', 'WARN', {
      identifier,
      endpoint,
      count: entry.count,
      maxRequests: config.maxRequests,
      retryAfter,
    });

    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfter,
    };
  }

  // Increment count
  entry.count++;
  data[key] = entry;
  saveRateLimitData(data);

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Reset rate limit for a specific identifier and endpoint
 */
export function resetRateLimit(identifier: string, endpoint: string): void {
  const key = getRateLimitKey(identifier, endpoint);
  const data = loadRateLimitData();

  delete data[key];
  saveRateLimitData(data);

  logApp('Rate limit reset', 'INFO', { identifier, endpoint });
}

/**
 * Clean up expired rate limit entries (run periodically)
 */
export function cleanupExpiredRateLimits(): number {
  const data = loadRateLimitData();
  const now = Date.now();
  let removedCount = 0;

  const cleanedData: RateLimitData = {};

  for (const [key, entry] of Object.entries(data)) {
    if (entry.resetTime > now) {
      cleanedData[key] = entry;
    } else {
      removedCount++;
    }
  }

  if (removedCount > 0) {
    saveRateLimitData(cleanedData);
    logApp('Cleaned up expired rate limits', 'DEBUG', { removedCount });
  }

  return removedCount;
}

/**
 * Get all active rate limits (for debugging/admin)
 */
export function getActiveRateLimits(): Array<{
  key: string;
  count: number;
  resetTime: number;
  expiresIn: number;
}> {
  const data = loadRateLimitData();
  const now = Date.now();

  return Object.entries(data)
    .filter(([, entry]) => entry.resetTime > now)
    .map(([key, entry]) => ({
      key,
      count: entry.count,
      resetTime: entry.resetTime,
      expiresIn: Math.ceil((entry.resetTime - now) / 1000),
    }));
}

/**
 * Express/Next.js middleware helper
 * Returns response headers for rate limiting
 */
export function getRateLimitHeaders(
  identifier: string,
  endpoint: keyof typeof RATE_LIMITS
): Record<string, string> {
  const config = RATE_LIMITS[endpoint] || RATE_LIMITS['api/general'];
  const result = checkRateLimit(identifier, endpoint);

  const headers: Record<string, string> = {
    'X-RateLimit-Limit': config.maxRequests.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': new Date(result.resetTime).toISOString(),
  };

  if (result.retryAfter) {
    headers['Retry-After'] = result.retryAfter.toString();
  }

  return headers;
}
