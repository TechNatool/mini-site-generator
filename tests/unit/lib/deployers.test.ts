import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { deploySite, createDummyZip, type DeployResult } from '@/lib/deployers';
import { type DeploySettings } from '@/lib/deploy-config';
import fs from 'fs/promises';
import path from 'path';
import AdmZip from 'adm-zip';

// Mock global fetch
const mockFetch = vi.fn();

describe('Deployers', () => {
  let zipBuffer: Buffer;

  beforeEach(async () => {
    // Créer un ZIP de test
    zipBuffer = await createDummyZip();

    // Mock fetch globally
    vi.stubGlobal('fetch', mockFetch);
  });

  afterEach(() => {
    // Nettoyer les mocks
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  describe('createDummyZip()', () => {
    it('should create a valid ZIP buffer', async () => {
      const buffer = await createDummyZip();

      expect(buffer).toBeInstanceOf(Buffer);
      expect(buffer.length).toBeGreaterThan(0);

      // Vérifier que le ZIP contient index.html
      const zip = new AdmZip(buffer);
      const entries = zip.getEntries();

      const indexEntry = entries.find((e) => e.entryName === 'index.html');
      expect(indexEntry).toBeDefined();

      const content = indexEntry!.getData().toString('utf-8');
      expect(content).toContain('<!DOCTYPE html>');
      expect(content).toContain('Mini Site Généré');
    });
  });

  describe('deploySite() - Netlify', () => {
    it('should deploy successfully to Netlify', async () => {
      const settings: DeploySettings = {
        provider: 'netlify',
        netlify: {
          apiToken: 'test-netlify-token',
          siteId: 'test-site-id',
        },
      };

      // Mock successful Netlify response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'deploy-123',
          ssl_url: 'https://test-site.netlify.app',
          subdomain: 'test-site',
        }),
      });

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(true);
      expect(result.provider).toBe('netlify');
      expect(result.url).toBe('https://test-site.netlify.app');
      expect(result.details).toContain('deploy-123');

      // Vérifier l'appel fetch
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.netlify.com/api/v1/sites/test-site-id/deploys',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/zip',
            Authorization: 'Bearer test-netlify-token',
          },
          body: zipBuffer,
        })
      );
    });

    it('should handle Netlify API errors', async () => {
      const settings: DeploySettings = {
        provider: 'netlify',
        netlify: {
          apiToken: 'invalid-token',
          siteId: 'invalid-site',
        },
      };

      // Mock failed Netlify response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        text: async () => 'Unauthorized',
      });

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.provider).toBe('netlify');
      expect(result.details).toContain('401');
    });

    it('should fail if Netlify config is missing', async () => {
      const settings: DeploySettings = {
        provider: 'netlify',
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.provider).toBe('netlify');
      expect(result.details).toContain('missing');
    });

    it('should fail if Netlify apiToken is missing', async () => {
      const settings: DeploySettings = {
        provider: 'netlify',
        netlify: {
          apiToken: '',
          siteId: 'test-site-id',
        },
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.provider).toBe('netlify');
      expect(result.details).toContain('required');
    });

    it('should use fallback URL if ssl_url is missing', async () => {
      const settings: DeploySettings = {
        provider: 'netlify',
        netlify: {
          apiToken: 'test-token',
          siteId: 'test-site-id',
        },
      };

      // Mock response without ssl_url
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'deploy-456',
          subdomain: 'fallback-site',
        }),
      });

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(true);
      expect(result.url).toBe('https://fallback-site.netlify.app');
    });
  });

  describe('deploySite() - Vercel', () => {
    it('should deploy successfully to Vercel', async () => {
      const settings: DeploySettings = {
        provider: 'vercel',
        vercel: {
          apiToken: 'test-vercel-token',
          projectId: 'test-project',
        },
      };

      // Mock successful Vercel response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'dpl_123',
          url: 'test-project-xyz.vercel.app',
        }),
      });

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(true);
      expect(result.provider).toBe('vercel');
      expect(result.url).toBe('https://test-project-xyz.vercel.app');
      expect(result.details).toContain('dpl_123');

      // Vérifier l'appel fetch
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.vercel.com/v13/deployments',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-vercel-token',
          },
        })
      );
    });

    it('should deploy to Vercel with teamId', async () => {
      const settings: DeploySettings = {
        provider: 'vercel',
        vercel: {
          apiToken: 'test-token',
          projectId: 'test-project',
          teamId: 'team_123',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'dpl_456',
          url: 'test.vercel.app',
        }),
      });

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.vercel.com/v13/deployments?teamId=team_123',
        expect.any(Object)
      );
    });

    it('should handle Vercel API errors', async () => {
      const settings: DeploySettings = {
        provider: 'vercel',
        vercel: {
          apiToken: 'invalid-token',
          projectId: 'test-project',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        text: async () => 'Forbidden',
      });

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.provider).toBe('vercel');
      expect(result.details).toContain('403');
    });

    it('should fail if Vercel config is missing', async () => {
      const settings: DeploySettings = {
        provider: 'vercel',
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.provider).toBe('vercel');
      expect(result.details).toContain('missing');
    });

    it('should fail if Vercel projectId is missing', async () => {
      const settings: DeploySettings = {
        provider: 'vercel',
        vercel: {
          apiToken: 'test-token',
          projectId: '',
        },
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.provider).toBe('vercel');
      expect(result.details).toContain('required');
    });

    it('should convert ZIP files to base64 for Vercel', async () => {
      const settings: DeploySettings = {
        provider: 'vercel',
        vercel: {
          apiToken: 'test-token',
          projectId: 'test-project',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          id: 'dpl_789',
          url: 'test.vercel.app',
        }),
      });

      await deploySite(zipBuffer, settings);

      // Vérifier que le body contient des fichiers en base64
      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);

      expect(body.files).toBeDefined();
      expect(body.files['index.html']).toBeDefined();
      expect(body.files['index.html'].file).toMatch(/^[A-Za-z0-9+/=]+$/); // Base64
    });
  });

  describe('deploySite() - FTP', () => {
    it('should deploy successfully via FTP', async () => {
      const settings: DeploySettings = {
        provider: 'ftp',
        ftp: {
          host: 'ftp.example.com',
          port: 21,
          username: 'testuser',
          password: 'testpass',
          remotePath: '/public_html',
          secure: false,
        },
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(true);
      expect(result.provider).toBe('ftp');
      expect(result.url).toBe('ftp://ftp.example.com/public_html');
      expect(result.details).toContain('public_html');
    });

    it('should deploy successfully via SFTP', async () => {
      const settings: DeploySettings = {
        provider: 'ftp',
        ftp: {
          host: 'sftp.example.com',
          port: 22,
          username: 'testuser',
          password: 'testpass',
          remotePath: '/var/www',
          secure: true,
        },
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(true);
      expect(result.provider).toBe('ftp');
      expect(result.url).toBe('sftp://sftp.example.com/var/www');
    });

    it('should fail if FTP config is missing', async () => {
      const settings: DeploySettings = {
        provider: 'ftp',
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.provider).toBe('ftp');
      expect(result.details).toContain('missing');
    });

    it('should fail if FTP host is missing', async () => {
      const settings: DeploySettings = {
        provider: 'ftp',
        ftp: {
          host: '',
          port: 21,
          username: 'user',
          password: 'pass',
          remotePath: '/',
          secure: false,
        },
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.provider).toBe('ftp');
      expect(result.details).toContain('required');
    });
  });

  describe('deploySite() - Local', () => {
    let testOutputDir: string;

    beforeEach(async () => {
      testOutputDir = path.join(process.cwd(), '.test-deploy');
      // Créer le répertoire de test
      await fs.mkdir(testOutputDir, { recursive: true });
    });

    afterEach(async () => {
      // Nettoyer le répertoire de test
      try {
        await fs.rm(testOutputDir, { recursive: true, force: true });
      } catch {
        // Ignorer si le répertoire n'existe pas
      }
    });

    it('should deploy successfully to local filesystem', async () => {
      const settings: DeploySettings = {
        provider: 'local',
        local: {
          outputPath: testOutputDir,
        },
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(true);
      expect(result.provider).toBe('local');
      expect(result.url).toContain('file://');
      expect(result.url).toContain('index.html');
      expect(result.details).toContain('site-');

      // Vérifier que le fichier a été extrait
      const files = await fs.readdir(testOutputDir);
      expect(files.length).toBeGreaterThan(0);

      const siteDir = files[0];
      const indexPath = path.join(testOutputDir, siteDir, 'index.html');
      const content = await fs.readFile(indexPath, 'utf-8');

      expect(content).toContain('<!DOCTYPE html>');
      expect(content).toContain('Mini Site Généré');
    });

    it('should create output directory if it does not exist', async () => {
      // Utiliser un chemin qui n'existe pas encore
      const nestedPath = path.join(testOutputDir, 'nested', 'path');

      const settings: DeploySettings = {
        provider: 'local',
        local: {
          outputPath: nestedPath,
        },
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(true);

      // Vérifier qu'au moins un répertoire site-* a été créé
      const exists = await fs
        .readdir(nestedPath)
        .then((files) => files.some((f) => f.startsWith('site-')))
        .catch(() => false);

      expect(exists).toBe(true);
    });

    it('should create unique directory with timestamp', async () => {
      const settings: DeploySettings = {
        provider: 'local',
        local: {
          outputPath: testOutputDir,
        },
      };

      // Déployer deux fois
      const result1 = await deploySite(zipBuffer, settings);
      const result2 = await deploySite(zipBuffer, settings);

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);

      // Les URLs doivent être différentes (timestamps différents)
      expect(result1.url).not.toBe(result2.url);

      // Deux répertoires doivent exister
      const files = await fs.readdir(testOutputDir);
      expect(files.length).toBe(2);
    });

    it('should fail if Local config is missing', async () => {
      const settings: DeploySettings = {
        provider: 'local',
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.provider).toBe('local');
      expect(result.details).toContain('missing');
    });

    it('should fail if outputPath is missing', async () => {
      const settings: DeploySettings = {
        provider: 'local',
        local: {
          outputPath: '',
        },
      };

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.provider).toBe('local');
      expect(result.details).toContain('required');
    });
  });

  describe('deploySite() - Error handling', () => {
    it('should handle unknown provider', async () => {
      const settings = {
        provider: 'unknown-provider',
      } as any;

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.details).toContain('Unknown provider');
    });

    it('should catch and return errors gracefully', async () => {
      const settings: DeploySettings = {
        provider: 'netlify',
        netlify: {
          apiToken: 'test-token',
          siteId: 'test-site',
        },
      };

      // Mock fetch to throw an error
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await deploySite(zipBuffer, settings);

      expect(result.success).toBe(false);
      expect(result.provider).toBe('netlify');
      expect(result.details).toContain('Network error');
    });
  });

  describe('All providers integration', () => {
    it('should handle all provider types', async () => {
      const providers = [
        {
          name: 'netlify',
          settings: {
            provider: 'netlify' as const,
            netlify: {
              apiToken: 'test-token',
              siteId: 'test-site',
            },
          },
          mockResponse: {
            ok: true,
            json: async () => ({
              id: 'deploy-123',
              ssl_url: 'https://test.netlify.app',
            }),
          },
        },
        {
          name: 'vercel',
          settings: {
            provider: 'vercel' as const,
            vercel: {
              apiToken: 'test-token',
              projectId: 'test-project',
            },
          },
          mockResponse: {
            ok: true,
            json: async () => ({
              id: 'dpl_123',
              url: 'test.vercel.app',
            }),
          },
        },
        {
          name: 'ftp',
          settings: {
            provider: 'ftp' as const,
            ftp: {
              host: 'ftp.example.com',
              port: 21,
              username: 'user',
              password: 'pass',
              remotePath: '/',
              secure: false,
            },
          },
        },
        {
          name: 'local',
          settings: {
            provider: 'local' as const,
            local: {
              outputPath: '.test-deploy',
            },
          },
        },
      ];

      for (const provider of providers) {
        // Mock fetch pour netlify et vercel
        if (provider.mockResponse) {
          mockFetch.mockResolvedValueOnce(provider.mockResponse);
        }

        const result = await deploySite(zipBuffer, provider.settings);

        expect(result.success).toBe(true);
        expect(result.provider).toBe(provider.name);
        expect(result.url).toBeDefined();

        // Nettoyer le répertoire local
        if (provider.name === 'local') {
          await fs.rm('.test-deploy', { recursive: true, force: true });
        }
      }
    });
  });
});
