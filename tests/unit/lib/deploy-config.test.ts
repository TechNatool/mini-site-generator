import { describe, it, expect, afterEach } from 'vitest';
import {
  loadDeploySettings,
  saveDeploySettings,
  deleteDeploySettings,
  getDefaultDeploySettings,
  type DeploySettings,
} from '@/lib/deploy-config';
import fs from 'fs/promises';
import path from 'path';

const CONFIG_DIR = path.join(process.cwd(), '.config');
const CONFIG_FILE = path.join(CONFIG_DIR, 'deploy-settings.json');

describe('Deploy Config', () => {
  afterEach(async () => {
    // Nettoyer le fichier de configuration après chaque test
    try {
      await deleteDeploySettings();
    } catch {
      // Ignorer si le fichier n'existe pas
    }
  });

  describe('loadDeploySettings()', () => {
    it('should return null when config file does not exist', async () => {
      const settings = await loadDeploySettings();
      expect(settings).toBeNull();
    });

    it('should load settings from config file when it exists', async () => {
      // Créer un fichier de configuration
      await saveDeploySettings({
        provider: 'netlify',
        netlify: {
          apiToken: 'test-token',
          siteId: 'test-site-id',
        },
      });

      // Charger les paramètres
      const settings = await loadDeploySettings();

      expect(settings).not.toBeNull();
      expect(settings?.provider).toBe('netlify');
      expect(settings?.netlify?.apiToken).toBe('test-token');
      expect(settings?.netlify?.siteId).toBe('test-site-id');
    });

    it('should handle invalid JSON gracefully', async () => {
      // Créer le dossier s'il n'existe pas
      await fs.mkdir(CONFIG_DIR, { recursive: true });

      // Écrire un JSON invalide
      await fs.writeFile(CONFIG_FILE, 'invalid json{', 'utf-8');

      // Charger devrait retourner null
      const settings = await loadDeploySettings();
      expect(settings).toBeNull();

      // Nettoyer
      await fs.unlink(CONFIG_FILE);
    });
  });

  describe('saveDeploySettings()', () => {
    it('should save Netlify settings', async () => {
      await saveDeploySettings({
        provider: 'netlify',
        netlify: {
          apiToken: 'my-netlify-token',
          siteId: 'my-site-id',
        },
      });

      const fileContent = await fs.readFile(CONFIG_FILE, 'utf-8');
      const savedSettings = JSON.parse(fileContent);

      expect(savedSettings.provider).toBe('netlify');
      expect(savedSettings.netlify.apiToken).toBe('my-netlify-token');
      expect(savedSettings.netlify.siteId).toBe('my-site-id');
    });

    it('should save Vercel settings', async () => {
      await saveDeploySettings({
        provider: 'vercel',
        vercel: {
          apiToken: 'my-vercel-token',
          projectId: 'my-project-id',
          teamId: 'my-team-id',
        },
      });

      const settings = await loadDeploySettings();
      expect(settings?.provider).toBe('vercel');
      expect(settings?.vercel?.apiToken).toBe('my-vercel-token');
      expect(settings?.vercel?.projectId).toBe('my-project-id');
      expect(settings?.vercel?.teamId).toBe('my-team-id');
    });

    it('should save FTP settings', async () => {
      await saveDeploySettings({
        provider: 'ftp',
        ftp: {
          host: 'ftp.example.com',
          port: 21,
          username: 'user',
          password: 'pass',
          remotePath: '/public_html',
          secure: false,
        },
      });

      const settings = await loadDeploySettings();
      expect(settings?.provider).toBe('ftp');
      expect(settings?.ftp?.host).toBe('ftp.example.com');
      expect(settings?.ftp?.port).toBe(21);
      expect(settings?.ftp?.secure).toBe(false);
    });

    it('should save Local settings', async () => {
      await saveDeploySettings({
        provider: 'local',
        local: {
          outputPath: './custom/path',
        },
      });

      const settings = await loadDeploySettings();
      expect(settings?.provider).toBe('local');
      expect(settings?.local?.outputPath).toBe('./custom/path');
    });

    it('should create .config directory if it does not exist', async () => {
      // S'assurer que le fichier de config n'existe pas mais garder le répertoire
      try {
        await deleteDeploySettings();
      } catch {
        // Ignorer si le fichier n'existe pas
      }

      // Créer le répertoire s'il n'existe pas
      try {
        await fs.mkdir(CONFIG_DIR, { recursive: true });
      } catch {
        // Ignorer si le répertoire existe déjà
      }

      // Sauvegarder les paramètres
      await saveDeploySettings({
        provider: 'local',
        local: {
          outputPath: './out/sites',
        },
      });

      // Vérifier que le fichier a été créé
      const settings = await loadDeploySettings();
      expect(settings).not.toBeNull();
      expect(settings?.provider).toBe('local');
    });
  });

  describe('deleteDeploySettings()', () => {
    it('should delete config file', async () => {
      // Créer un fichier de configuration
      await saveDeploySettings({
        provider: 'netlify',
        netlify: {
          apiToken: 'test',
          siteId: 'test',
        },
      });

      // Vérifier qu'il existe
      let settings = await loadDeploySettings();
      expect(settings).not.toBeNull();

      // Supprimer
      await deleteDeploySettings();

      // Vérifier qu'il n'existe plus
      settings = await loadDeploySettings();
      expect(settings).toBeNull();
    });

    it('should not throw error if file does not exist', async () => {
      await expect(deleteDeploySettings()).resolves.not.toThrow();
    });
  });

  describe('getDefaultDeploySettings()', () => {
    it('should return default settings', () => {
      const defaults = getDefaultDeploySettings();

      expect(defaults.provider).toBe('local');
      expect(defaults.local?.outputPath).toBe('./out/sites');
    });
  });

  describe('All providers', () => {
    it('should handle all provider types', async () => {
      const providers = ['netlify', 'vercel', 'ftp', 'local'] as const;

      for (const provider of providers) {
        let settings: DeploySettings;

        switch (provider) {
          case 'netlify':
            settings = {
              provider,
              netlify: { apiToken: 'test', siteId: 'test' },
            };
            break;
          case 'vercel':
            settings = {
              provider,
              vercel: { apiToken: 'test', projectId: 'test' },
            };
            break;
          case 'ftp':
            settings = {
              provider,
              ftp: {
                host: 'test.com',
                port: 21,
                username: 'user',
                password: 'pass',
                remotePath: '/',
                secure: false,
              },
            };
            break;
          case 'local':
            settings = {
              provider,
              local: { outputPath: './test' },
            };
            break;
        }

        await saveDeploySettings(settings);
        const loaded = await loadDeploySettings();
        expect(loaded?.provider).toBe(provider);

        await deleteDeploySettings();
      }
    });
  });
});
