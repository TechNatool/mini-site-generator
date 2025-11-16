import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { loadAISettings, saveAISettings, deleteAISettings } from '@/lib/config';
import { getAIProvider } from '@/lib/ai-provider';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_DIR = path.join(process.cwd(), '.config');
const CONFIG_FILE = path.join(CONFIG_DIR, 'ai-settings.json');

describe('AI Settings Configuration', () => {
  let originalEnv: {
    NO_AI?: string;
    AI_PROVIDER?: string;
  };

  beforeEach(() => {
    // Sauvegarder les valeurs originales
    originalEnv = {
      NO_AI: process.env.NO_AI,
      AI_PROVIDER: process.env.AI_PROVIDER,
    };
  });

  afterEach(async () => {
    // Restaurer les valeurs originales
    if (originalEnv.NO_AI === undefined) {
      delete process.env.NO_AI;
    } else {
      process.env.NO_AI = originalEnv.NO_AI;
    }
    if (originalEnv.AI_PROVIDER === undefined) {
      delete process.env.AI_PROVIDER;
    } else {
      process.env.AI_PROVIDER = originalEnv.AI_PROVIDER;
    }

    // Nettoyer le fichier de configuration
    try {
      await deleteAISettings();
    } catch {
      // Ignorer si le fichier n'existe pas
    }
  });

  describe('loadAISettings()', () => {
    it('should return null when config file does not exist', async () => {
      const settings = await loadAISettings();
      expect(settings).toBeNull();
    });

    it('should load settings from config file when it exists', async () => {
      // Créer un fichier de configuration
      await saveAISettings({ provider: 'local', model: 'llama2' });

      // Charger les paramètres
      const settings = await loadAISettings();

      expect(settings).not.toBeNull();
      expect(settings?.provider).toBe('local');
      expect(settings?.model).toBe('llama2');
    });

    it('should handle invalid JSON gracefully', async () => {
      // Créer le dossier s'il n'existe pas
      await fs.mkdir(CONFIG_DIR, { recursive: true });

      // Écrire un JSON invalide
      await fs.writeFile(CONFIG_FILE, 'invalid json{', 'utf-8');

      // Charger devrait retourner null
      const settings = await loadAISettings();
      expect(settings).toBeNull();

      // Nettoyer
      await fs.unlink(CONFIG_FILE);
    });
  });

  describe('saveAISettings()', () => {
    it('should save settings to config file', async () => {
      await saveAISettings({ provider: 'claude' });

      // Vérifier que le fichier existe
      const fileContent = await fs.readFile(CONFIG_FILE, 'utf-8');
      const savedSettings = JSON.parse(fileContent);

      expect(savedSettings.provider).toBe('claude');
    });

    it('should save settings with model', async () => {
      await saveAISettings({ provider: 'local', model: 'deepseek-coder-v2' });

      const settings = await loadAISettings();
      expect(settings?.provider).toBe('local');
      expect(settings?.model).toBe('deepseek-coder-v2');
    });

    it('should create .config directory if it does not exist', async () => {
      // S'assurer que le dossier n'existe pas
      try {
        await fs.rm(CONFIG_DIR, { recursive: true });
      } catch {
        // Ignorer si le dossier n'existe pas
      }

      // Sauvegarder les paramètres
      await saveAISettings({ provider: 'none' });

      // Vérifier que le fichier a été créé
      const settings = await loadAISettings();
      expect(settings?.provider).toBe('none');
    });
  });

  describe('deleteAISettings()', () => {
    it('should delete config file', async () => {
      // Créer un fichier de configuration
      await saveAISettings({ provider: 'claude' });

      // Vérifier qu'il existe
      let settings = await loadAISettings();
      expect(settings).not.toBeNull();

      // Supprimer
      await deleteAISettings();

      // Vérifier qu'il n'existe plus
      settings = await loadAISettings();
      expect(settings).toBeNull();
    });

    it('should not throw error if file does not exist', async () => {
      await expect(deleteAISettings()).resolves.not.toThrow();
    });
  });

  describe('getAIProvider() with config file', () => {
    it('should return "none" when NO_AI=true regardless of config file', async () => {
      process.env.NO_AI = 'true';
      await saveAISettings({ provider: 'claude' });

      const provider = getAIProvider();
      expect(provider).toBe('none');
    });

    it('should read from config file when NO_AI is not set', async () => {
      delete process.env.NO_AI;
      delete process.env.AI_PROVIDER;

      await saveAISettings({ provider: 'local' });

      const provider = getAIProvider();
      expect(provider).toBe('local');
    });

    it('should prioritize config file over environment variable', async () => {
      delete process.env.NO_AI;
      process.env.AI_PROVIDER = 'claude';

      await saveAISettings({ provider: 'local' });

      const provider = getAIProvider();
      expect(provider).toBe('local');
    });

    it('should fallback to environment variable when config file does not exist', async () => {
      delete process.env.NO_AI;
      process.env.AI_PROVIDER = 'local';

      // S'assurer qu'il n'y a pas de fichier de configuration
      await deleteAISettings();

      const provider = getAIProvider();
      expect(provider).toBe('local');
    });

    it('should default to "claude" when neither config nor env is set', async () => {
      delete process.env.NO_AI;
      delete process.env.AI_PROVIDER;

      await deleteAISettings();

      const provider = getAIProvider();
      expect(provider).toBe('claude');
    });

    it('should handle all three provider types from config', async () => {
      delete process.env.NO_AI;

      // Test claude
      await saveAISettings({ provider: 'claude' });
      expect(getAIProvider()).toBe('claude');

      // Test local
      await saveAISettings({ provider: 'local' });
      expect(getAIProvider()).toBe('local');

      // Test none
      await saveAISettings({ provider: 'none' });
      expect(getAIProvider()).toBe('none');
    });
  });

  describe('Priority Order', () => {
    it('should respect priority: NO_AI > config file > env var > default', async () => {
      // Scénario 1: NO_AI=true (priorité absolue)
      process.env.NO_AI = 'true';
      process.env.AI_PROVIDER = 'claude';
      await saveAISettings({ provider: 'local' });
      expect(getAIProvider()).toBe('none');

      // Scénario 2: Config file (priorité 2)
      delete process.env.NO_AI;
      process.env.AI_PROVIDER = 'claude';
      await saveAISettings({ provider: 'local' });
      expect(getAIProvider()).toBe('local');

      // Scénario 3: Env var (priorité 3)
      await deleteAISettings();
      process.env.AI_PROVIDER = 'local';
      expect(getAIProvider()).toBe('local');

      // Scénario 4: Default (priorité 4)
      delete process.env.AI_PROVIDER;
      await deleteAISettings();
      expect(getAIProvider()).toBe('claude');
    });
  });
});
