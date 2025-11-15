import { describe, it, expect } from 'vitest';
import { generateClientId } from '@/lib/generator';

describe('Generator Module', () => {
  describe('generateClientId', () => {
    it('should generate ID with correct format', () => {
      const id = generateClientId();
      expect(id).toMatch(/^site-\d+-[a-z0-9]+$/);
    });

    it('should generate unique IDs', () => {
      const id1 = generateClientId();
      const id2 = generateClientId();
      expect(id1).not.toBe(id2);
    });

    it('should start with "site-" prefix', () => {
      const id = generateClientId();
      expect(id).toMatch(/^site-/);
    });

    it('should include timestamp', () => {
      const beforeTimestamp = Date.now();
      const id = generateClientId();
      const afterTimestamp = Date.now();

      const match = id.match(/^site-(\d+)-/);
      expect(match).not.toBeNull();

      if (match) {
        const timestamp = parseInt(match[1]);
        expect(timestamp).toBeGreaterThanOrEqual(beforeTimestamp);
        expect(timestamp).toBeLessThanOrEqual(afterTimestamp);
      }
    });
  });
});
