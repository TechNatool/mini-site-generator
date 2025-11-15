/**
 * Vitest global setup
 */

import { beforeAll, afterAll, afterEach, vi } from 'vitest';

// Setup before all tests
beforeAll(() => {
  // Set test environment variables
  process.env = { ...process.env, NODE_ENV: 'test', ANTHROPIC_API_KEY: 'test-api-key' };
});

// Cleanup after each test
afterEach(() => {
  // Clear mocks
  vi.clearAllMocks();
});

// Cleanup after all tests
afterAll(() => {
  // Restore environment
});
