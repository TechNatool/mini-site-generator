import { describe, it, expect, afterEach } from 'vitest';
import {
  loadImageSettings,
  saveImageSettings,
  deleteImageSettings,
  getDefaultImageSettings,
  type ImageSettings,
} from '@/lib/image-config';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_DIR = path.join(process.cwd(), '.config');
const CONFIG_FILE = path.join(CONFIG_DIR, 'image-settings.json');

describe('Image Settings Configuration', () => {
  afterEach(async () => {
    // Nettoyer le fichier de configuration après chaque test
    try {
      await deleteImageSettings();
    } catch {
      // Ignorer si le fichier n'existe pas
    }
  });

  describe('loadImageSettings()', () => {
    it('should return null when config file does not exist', async () => {
      const settings = await loadImageSettings();
      expect(settings).toBeNull();
    });

    it('should load settings from config file when it exists', async () => {
      // Créer un fichier de configuration
      await saveImageSettings({
        provider: 'local',
        size: 1024,
        format: 'webp',
        quality: 90,
        optimize: true,
        autoAltText: false,
      });

      // Charger les paramètres
      const settings = await loadImageSettings();

      expect(settings).not.toBeNull();
      expect(settings?.provider).toBe('local');
      expect(settings?.size).toBe(1024);
      expect(settings?.format).toBe('webp');
      expect(settings?.quality).toBe(90);
      expect(settings?.optimize).toBe(true);
      expect(settings?.autoAltText).toBe(false);
    });

    it('should handle invalid JSON gracefully', async () => {
      // Créer le dossier s'il n'existe pas
      await fs.mkdir(CONFIG_DIR, { recursive: true });

      // Écrire un JSON invalide
      await fs.writeFile(CONFIG_FILE, 'invalid json{', 'utf-8');

      // Charger devrait retourner null
      const settings = await loadImageSettings();
      expect(settings).toBeNull();

      // Nettoyer
      await fs.unlink(CONFIG_FILE);
    });
  });

  describe('saveImageSettings()', () => {
    it('should save settings to config file', async () => {
      await saveImageSettings({
        provider: 'claude',
        size: 1920,
        format: 'jpg',
        quality: 85,
        optimize: false,
        autoAltText: true,
      });

      // Vérifier que le fichier existe
      const fileContent = await fs.readFile(CONFIG_FILE, 'utf-8');
      const savedSettings = JSON.parse(fileContent);

      expect(savedSettings.provider).toBe('claude');
      expect(savedSettings.size).toBe(1920);
      expect(savedSettings.format).toBe('jpg');
      expect(savedSettings.quality).toBe(85);
      expect(savedSettings.optimize).toBe(false);
      expect(savedSettings.autoAltText).toBe(true);
    });

    it('should save all provider types correctly', async () => {
      const providers = ['claude', 'local', 'none'] as const;

      for (const provider of providers) {
        await saveImageSettings({
          provider,
          size: 1080,
          format: 'webp',
          quality: 85,
          optimize: true,
          autoAltText: true,
        });

        const settings = await loadImageSettings();
        expect(settings).not.toBeNull();
        expect(settings?.provider).toBe(provider);

        // Clean up between iterations
        await deleteImageSettings();
      }
    });

    it('should save all format types correctly', async () => {
      const formats = ['webp', 'jpg', 'png'] as const;

      for (const format of formats) {
        await saveImageSettings({
          provider: 'none',
          size: 720,
          format,
          quality: 75,
          optimize: true,
          autoAltText: true,
        });

        const settings = await loadImageSettings();
        expect(settings).not.toBeNull();
        expect(settings?.format).toBe(format);

        await deleteImageSettings();
      }
    });

    it('should create .config directory if it does not exist', async () => {
      // S'assurer que le dossier n'existe pas
      try {
        await fs.rm(CONFIG_DIR, { recursive: true });
      } catch {
        // Ignorer si le dossier n'existe pas
      }

      // Sauvegarder les paramètres
      await saveImageSettings({
        provider: 'none',
        size: 512,
        format: 'png',
        quality: 100,
        optimize: false,
        autoAltText: false,
      });

      // Vérifier que le fichier a été créé
      const settings = await loadImageSettings();
      expect(settings).not.toBeNull();
      expect(settings?.provider).toBe('none');
    });
  });

  describe('deleteImageSettings()', () => {
    it('should delete config file', async () => {
      // Créer un fichier de configuration
      await saveImageSettings({
        provider: 'local',
        size: 1080,
        format: 'webp',
        quality: 85,
        optimize: true,
        autoAltText: true,
      });

      // Vérifier qu'il existe
      let settings = await loadImageSettings();
      expect(settings).not.toBeNull();

      // Supprimer
      await deleteImageSettings();

      // Vérifier qu'il n'existe plus
      settings = await loadImageSettings();
      expect(settings).toBeNull();
    });

    it('should not throw error if file does not exist', async () => {
      await expect(deleteImageSettings()).resolves.not.toThrow();
    });
  });

  describe('getDefaultImageSettings()', () => {
    it('should return default settings', () => {
      const defaults = getDefaultImageSettings();

      expect(defaults.provider).toBe('none');
      expect(defaults.size).toBe(1080);
      expect(defaults.format).toBe('webp');
      expect(defaults.quality).toBe(85);
      expect(defaults.optimize).toBe(true);
      expect(defaults.autoAltText).toBe(true);
    });
  });

  describe('API Validation', () => {
    it('should validate size range (128-4096)', async () => {
      // Valid sizes
      const validSizes = [128, 512, 1024, 1920, 4096];

      for (const size of validSizes) {
        const settings: ImageSettings = {
          provider: 'none',
          size,
          format: 'webp',
          quality: 85,
          optimize: true,
          autoAltText: true,
        };

        await expect(saveImageSettings(settings)).resolves.not.toThrow();
        await deleteImageSettings();
      }
    });

    it('should validate quality range (1-100)', async () => {
      // Valid qualities
      const validQualities = [1, 25, 50, 75, 100];

      for (const quality of validQualities) {
        const settings: ImageSettings = {
          provider: 'none',
          size: 1080,
          format: 'webp',
          quality,
          optimize: true,
          autoAltText: true,
        };

        await expect(saveImageSettings(settings)).resolves.not.toThrow();
        await deleteImageSettings();
      }
    });

    it('should handle boolean flags correctly', async () => {
      // Ensure .config directory exists
      await fs.mkdir(CONFIG_DIR, { recursive: true });

      const combinations = [
        { optimize: true, autoAltText: true },
        { optimize: true, autoAltText: false },
        { optimize: false, autoAltText: true },
        { optimize: false, autoAltText: false },
      ];

      for (const { optimize, autoAltText } of combinations) {
        await saveImageSettings({
          provider: 'none',
          size: 1080,
          format: 'webp',
          quality: 85,
          optimize,
          autoAltText,
        });

        const settings = await loadImageSettings();
        expect(settings?.optimize).toBe(optimize);
        expect(settings?.autoAltText).toBe(autoAltText);

        await deleteImageSettings();
      }
    });
  });
});
