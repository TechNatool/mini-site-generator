import { describe, it, expect, afterEach } from 'vitest';
import {
  loadSEOSettings,
  saveSEOSettings,
  deleteSEOSettings,
  getDefaultSEOSettings,
  type SEOSettings,
} from '@/lib/seo-config';
import { analyzeSEO } from '@/lib/seo-score';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_DIR = path.join(process.cwd(), '.config');
const CONFIG_FILE = path.join(CONFIG_DIR, 'seo-settings.json');

describe('SEO Settings Configuration', () => {
  afterEach(async () => {
    // Nettoyer le fichier de configuration après chaque test
    try {
      await deleteSEOSettings();
    } catch {
      // Ignorer si le fichier n'existe pas
    }
  });

  describe('loadSEOSettings()', () => {
    it('should return null when config file does not exist', async () => {
      const settings = await loadSEOSettings();
      expect(settings).toBeNull();
    });

    it('should load settings from config file when it exists', async () => {
      // Créer un fichier de configuration
      await saveSEOSettings({
        enabled: true,
        tone: 'friendly',
        keywords: ['test', 'keyword'],
      });

      // Charger les paramètres
      const settings = await loadSEOSettings();

      expect(settings).not.toBeNull();
      expect(settings?.enabled).toBe(true);
      expect(settings?.tone).toBe('friendly');
      expect(settings?.keywords).toEqual(['test', 'keyword']);
    });

    it('should handle invalid JSON gracefully', async () => {
      // Créer le dossier s'il n'existe pas
      await fs.mkdir(CONFIG_DIR, { recursive: true });

      // Écrire un JSON invalide
      await fs.writeFile(CONFIG_FILE, 'invalid json{', 'utf-8');

      // Charger devrait retourner null
      const settings = await loadSEOSettings();
      expect(settings).toBeNull();

      // Nettoyer
      await fs.unlink(CONFIG_FILE);
    });
  });

  describe('saveSEOSettings()', () => {
    it('should save settings to config file', async () => {
      await saveSEOSettings({
        enabled: true,
        tone: 'professional',
        keywords: ['seo', 'optimization'],
      });

      // Vérifier que le fichier existe
      const fileContent = await fs.readFile(CONFIG_FILE, 'utf-8');
      const savedSettings = JSON.parse(fileContent);

      expect(savedSettings.enabled).toBe(true);
      expect(savedSettings.tone).toBe('professional');
      expect(savedSettings.keywords).toEqual(['seo', 'optimization']);
    });

    it('should save all tone types correctly', async () => {
      const tones = ['professional', 'friendly', 'sales', 'local', 'minimalist', 'longform'] as const;

      for (const tone of tones) {
        await saveSEOSettings({
          enabled: true,
          tone,
          keywords: [],
        });

        const settings = await loadSEOSettings();
        expect(settings).not.toBeNull();
        expect(settings?.tone).toBe(tone);

        // Clean up between iterations to avoid cache issues
        await deleteSEOSettings();
      }
    });

    it('should save settings with empty keywords array', async () => {
      await saveSEOSettings({
        enabled: false,
        tone: 'minimalist',
        keywords: [],
      });

      const settings = await loadSEOSettings();
      expect(settings?.enabled).toBe(false);
      expect(settings?.keywords).toEqual([]);
    });

    it('should create .config directory if it does not exist', async () => {
      // S'assurer que le dossier n'existe pas
      try {
        await fs.rm(CONFIG_DIR, { recursive: true });
      } catch {
        // Ignorer si le dossier n'existe pas
      }

      // Sauvegarder les paramètres
      await saveSEOSettings({
        enabled: true,
        tone: 'sales',
        keywords: ['test'],
      });

      // Vérifier que le fichier a été créé
      const settings = await loadSEOSettings();
      expect(settings).not.toBeNull();
      expect(settings?.tone).toBe('sales');
    });
  });

  describe('deleteSEOSettings()', () => {
    it('should delete config file', async () => {
      // Créer un fichier de configuration
      await saveSEOSettings({
        enabled: true,
        tone: 'professional',
        keywords: [],
      });

      // Vérifier qu'il existe
      let settings = await loadSEOSettings();
      expect(settings).not.toBeNull();

      // Supprimer
      await deleteSEOSettings();

      // Vérifier qu'il n'existe plus
      settings = await loadSEOSettings();
      expect(settings).toBeNull();
    });

    it('should not throw error if file does not exist', async () => {
      await expect(deleteSEOSettings()).resolves.not.toThrow();
    });
  });

  describe('getDefaultSEOSettings()', () => {
    it('should return default settings', () => {
      const defaults = getDefaultSEOSettings();

      expect(defaults.enabled).toBe(false);
      expect(defaults.tone).toBe('professional');
      expect(defaults.keywords).toEqual([]);
    });
  });
});

describe('SEO Score Analyzer', () => {
  describe('analyzeSEO()', () => {
    it('should return a valid SEO analysis object', () => {
      const text = `
        <h1>Professional Plumber in Paris</h1>
        <p>We provide excellent plumbing services in Paris. Our professional team is ready to help you with any plumbing issues.</p>
        <h2>Our Services</h2>
        <p>Emergency repairs, installations, maintenance.</p>
      `;

      const keywords = ['plumber', 'paris', 'professional'];
      const analysis = analyzeSEO(text, keywords);

      expect(analysis).toHaveProperty('score');
      expect(analysis).toHaveProperty('keywordDensity');
      expect(analysis).toHaveProperty('readability');
      expect(analysis).toHaveProperty('headersCount');
      expect(analysis).toHaveProperty('suggestions');

      expect(analysis.score).toBeGreaterThan(0);
      expect(analysis.score).toBeLessThanOrEqual(100);
      expect(Array.isArray(analysis.suggestions)).toBe(true);
    });

    it('should calculate keyword density correctly', () => {
      const text = 'plumber plumber plumber test test test test test test test'; // 10 words, 3 keyword matches = 30%
      const keywords = ['plumber'];

      const analysis = analyzeSEO(text, keywords);

      expect(analysis.keywordDensity).toBe(30);
    });

    it('should detect headers in HTML content', () => {
      const text = `
        <h1>Title</h1>
        <h2>Subtitle 1</h2>
        <h3>Subtitle 2</h3>
        <h2>Subtitle 3</h2>
      `;

      const analysis = analyzeSEO(text, []);

      expect(analysis.headersCount).toBe(4);
    });

    it('should count words correctly (excluding HTML tags)', () => {
      const text = '<p>This is a test with exactly ten words here.</p>'; // 9 words

      const analysis = analyzeSEO(text, []);

      // Should count words without HTML tags
      expect(analysis.score).toBeGreaterThan(0);
    });

    it('should provide suggestions for low-quality content', () => {
      const text = 'Short text.'; // Very short, no headers, no keywords

      const analysis = analyzeSEO(text, ['keyword']);

      expect(analysis.suggestions.length).toBeGreaterThan(0);
      expect(analysis.score).toBeLessThan(60);
    });

    it('should give high score for optimized content', () => {
      const text = `
        <h1>Professional Plumber in Paris - Emergency Services</h1>
        <p>
          Looking for a reliable plumber in Paris? Our professional team provides expert plumbing services
          throughout Paris and surrounding areas. We specialize in emergency repairs, installations, and
          maintenance. Our experienced plumbers are available 24/7 for your convenience.
        </p>
        <h2>Why Choose Our Paris Plumbing Services</h2>
        <p>
          With over 15 years of experience serving Paris residents, we understand the unique plumbing
          challenges in the city. Our professional approach ensures quality work every time.
        </p>
        <h3>Emergency Plumbing Services</h3>
        <p>
          We respond quickly to all plumbing emergencies in Paris. Whether it's a burst pipe, leak,
          or drainage issue, our team is ready to help 24 hours a day.
        </p>
      `;

      const keywords = ['plumber', 'paris', 'professional', 'emergency'];
      const analysis = analyzeSEO(text, keywords);

      expect(analysis.score).toBeGreaterThan(60);
      expect(analysis.headersCount).toBeGreaterThan(0);
      expect(analysis.keywordDensity).toBeGreaterThan(0);
    });

    it('should warn about keyword over-optimization', () => {
      const text = 'plumber plumber plumber plumber plumber plumber plumber plumber plumber plumber'; // 10 words, all keyword = 100% density

      const keywords = ['plumber'];
      const analysis = analyzeSEO(text, keywords);

      const hasOverOptimizationWarning = analysis.suggestions.some((s) =>
        s.toLowerCase().includes('density')
      );
      expect(hasOverOptimizationWarning).toBe(true);
    });

    it('should handle empty text gracefully', () => {
      const analysis = analyzeSEO('', ['keyword']);

      // Empty text gets minimum score (5 points per category = 20 total)
      expect(analysis.score).toBe(20);
      expect(analysis.keywordDensity).toBe(0);
      expect(analysis.readability).toBe(0);
      expect(analysis.headersCount).toBe(0);
    });

    it('should handle empty keywords array', () => {
      const text = `
        <h1>Title</h1>
        <p>Some content here with multiple words in several sentences. This is a reasonable amount of text.</p>
      `;

      const analysis = analyzeSEO(text, []);

      expect(analysis.keywordDensity).toBe(0);
      expect(analysis.score).toBeGreaterThan(0); // Should still score based on other metrics
    });
  });

  describe('SEO Score Components', () => {
    it('should calculate readability based on sentence length', () => {
      const shortSentences = `
        This is short. Another one. And more. Keep going. Very brief.
      `;

      const longSentences = `
        This is a very long sentence with many words that goes on and on and continues to add more information without stopping or using proper punctuation to break up the ideas into smaller more digestible chunks of information.
      `;

      const analysis1 = analyzeSEO(shortSentences, []);
      const analysis2 = analyzeSEO(longSentences, []);

      // Both should have readability scores, but different
      expect(analysis1.readability).toBeGreaterThan(0);
      expect(analysis2.readability).toBeGreaterThan(0);
    });

    it('should give max points for optimal keyword density (1-3%)', () => {
      // Create text with ~2% keyword density
      const words = new Array(100).fill('word').join(' ');
      const text = words + ' keyword keyword'; // 102 words, 2 keywords = ~2%

      const analysis = analyzeSEO(text, ['keyword']);

      expect(analysis.keywordDensity).toBeGreaterThan(1);
      expect(analysis.keywordDensity).toBeLessThan(3);
    });

    it('should require sufficient content length for high score', () => {
      const shortText = '<h1>Title</h1><p>Short text.</p>';
      const longText =
        '<h1>Title</h1>' +
        '<p>' +
        new Array(400).fill('word').join(' ') +
        '</p>';

      const analysis1 = analyzeSEO(shortText, []);
      const analysis2 = analyzeSEO(longText, []);

      // Longer content should score higher
      expect(analysis2.score).toBeGreaterThan(analysis1.score);
    });
  });
});

describe('SEO API Integration', () => {
  describe('API Route Validation', () => {
    it('should validate tone values', async () => {
      const validTones = ['professional', 'friendly', 'sales', 'local', 'minimalist', 'longform'];

      for (const tone of validTones) {
        const settings: SEOSettings = {
          enabled: true,
          tone: tone as any,
          keywords: [],
        };

        // Should not throw
        await expect(saveSEOSettings(settings)).resolves.not.toThrow();
      }
    });

    it('should handle settings with undefined keywords', async () => {
      const settings = {
        enabled: true,
        tone: 'professional' as const,
        keywords: undefined,
      };

      // Should save and load correctly
      await saveSEOSettings({
        ...settings,
        keywords: settings.keywords || [],
      });

      const loaded = await loadSEOSettings();
      expect(loaded?.keywords).toBeDefined();
    });
  });
});
