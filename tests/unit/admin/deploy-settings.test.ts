import { describe, it, expect, afterEach } from 'vitest';
import { GET, PUT, DELETE } from '@/app/api/admin/deploy-settings/route';
import {
  loadDeploySettings,
  deleteDeploySettings,
  type DeploySettings,
} from '@/lib/deploy-config';

describe('Deploy Settings API Route', () => {
  afterEach(async () => {
    // Nettoyer le fichier de configuration après chaque test
    try {
      await deleteDeploySettings();
    } catch {
      // Ignorer si le fichier n'existe pas
    }
  });

  describe('GET /api/admin/deploy-settings', () => {
    it('should return default settings when config file does not exist', async () => {
      // S'assurer qu'il n'y a pas de fichier de configuration
      await deleteDeploySettings();

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.source).toBe('default');
      expect(data.settings).toBeDefined();
      expect(data.settings.provider).toBe('local');
      expect(data.settings.local?.outputPath).toBe('./out/sites');
    });

    it('should return config file settings when they exist', async () => {
      // Créer une configuration
      const mockRequest = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'netlify',
          netlify: {
            apiToken: 'test-token',
            siteId: 'test-site-id',
          },
        }),
      });

      await PUT(mockRequest);

      // Charger les paramètres
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.source).toBe('config-file');
      expect(data.settings.provider).toBe('netlify');
      expect(data.settings.netlify?.apiToken).toBe('test-token');
      expect(data.settings.netlify?.siteId).toBe('test-site-id');
    });
  });

  describe('PUT /api/admin/deploy-settings', () => {
    it('should save valid Netlify settings', async () => {
      const request = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'netlify',
          netlify: {
            apiToken: 'my-netlify-token',
            siteId: 'my-site-id',
          },
        }),
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.settings.provider).toBe('netlify');
      expect(data.settings.netlify?.apiToken).toBe('my-netlify-token');
      expect(data.settings.netlify?.siteId).toBe('my-site-id');

      // Vérifier que les paramètres ont été sauvegardés
      const saved = await loadDeploySettings();
      expect(saved?.provider).toBe('netlify');
    });

    it('should save valid Vercel settings', async () => {
      const request = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'vercel',
          vercel: {
            apiToken: 'my-vercel-token',
            projectId: 'my-project-id',
            teamId: 'my-team-id',
          },
        }),
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.settings.provider).toBe('vercel');
      expect(data.settings.vercel?.apiToken).toBe('my-vercel-token');
      expect(data.settings.vercel?.projectId).toBe('my-project-id');
      expect(data.settings.vercel?.teamId).toBe('my-team-id');
    });

    it('should save valid FTP settings', async () => {
      const request = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'ftp',
          ftp: {
            host: 'ftp.example.com',
            port: 21,
            username: 'user',
            password: 'pass',
            remotePath: '/public_html',
            secure: false,
          },
        }),
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.settings.provider).toBe('ftp');
      expect(data.settings.ftp?.host).toBe('ftp.example.com');
      expect(data.settings.ftp?.port).toBe(21);
      expect(data.settings.ftp?.secure).toBe(false);
    });

    it('should save valid Local settings', async () => {
      const request = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'local',
          local: {
            outputPath: './custom/path',
          },
        }),
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.settings.provider).toBe('local');
      expect(data.settings.local?.outputPath).toBe('./custom/path');
    });

    it('should return 400 for invalid provider', async () => {
      const request = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'invalid-provider',
        }),
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
      expect(data.error).toContain('provider');
    });

    it('should return 400 for Netlify without required fields', async () => {
      // Missing apiToken
      const request1 = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'netlify',
          netlify: {
            siteId: 'test-site-id',
          },
        }),
      });

      const response1 = await PUT(request1);
      const data1 = await response1.json();

      expect(response1.status).toBe(400);
      expect(data1.error).toContain('apiToken');

      // Missing siteId
      const request2 = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'netlify',
          netlify: {
            apiToken: 'test-token',
          },
        }),
      });

      const response2 = await PUT(request2);
      const data2 = await response2.json();

      expect(response2.status).toBe(400);
      expect(data2.error).toContain('siteId');
    });

    it('should return 400 for Vercel without required fields', async () => {
      // Missing apiToken
      const request1 = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'vercel',
          vercel: {
            projectId: 'test-project-id',
          },
        }),
      });

      const response1 = await PUT(request1);
      const data1 = await response1.json();

      expect(response1.status).toBe(400);
      expect(data1.error).toContain('apiToken');

      // Missing projectId
      const request2 = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'vercel',
          vercel: {
            apiToken: 'test-token',
          },
        }),
      });

      const response2 = await PUT(request2);
      const data2 = await response2.json();

      expect(response2.status).toBe(400);
      expect(data2.error).toContain('projectId');
    });

    it('should return 400 for FTP without required fields', async () => {
      // Missing host
      const request1 = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'ftp',
          ftp: {
            port: 21,
            username: 'user',
            password: 'pass',
            remotePath: '/',
            secure: false,
          },
        }),
      });

      const response1 = await PUT(request1);
      const data1 = await response1.json();

      expect(response1.status).toBe(400);
      expect(data1.error).toContain('host');

      // Invalid port
      const request2 = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'ftp',
          ftp: {
            host: 'ftp.example.com',
            port: 99999,
            username: 'user',
            password: 'pass',
            remotePath: '/',
            secure: false,
          },
        }),
      });

      const response2 = await PUT(request2);
      const data2 = await response2.json();

      expect(response2.status).toBe(400);
      expect(data2.error).toContain('port');

      // Invalid secure (not boolean)
      const request3 = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'ftp',
          ftp: {
            host: 'ftp.example.com',
            port: 21,
            username: 'user',
            password: 'pass',
            remotePath: '/',
            secure: 'yes', // Should be boolean
          },
        }),
      });

      const response3 = await PUT(request3);
      const data3 = await response3.json();

      expect(response3.status).toBe(400);
      expect(data3.error).toContain('secure');
    });

    it('should return 400 for Local without required fields', async () => {
      const request = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'local',
          local: {},
        }),
      });

      const response = await PUT(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('outputPath');
    });
  });

  describe('DELETE /api/admin/deploy-settings', () => {
    it('should delete config file and return success', async () => {
      // Créer une configuration d'abord
      const createRequest = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'netlify',
          netlify: {
            apiToken: 'test',
            siteId: 'test',
          },
        }),
      });

      await PUT(createRequest);

      // Vérifier qu'elle existe
      let settings = await loadDeploySettings();
      expect(settings).not.toBeNull();

      // Supprimer
      const response = await DELETE();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBeDefined();

      // Vérifier qu'elle n'existe plus
      settings = await loadDeploySettings();
      expect(settings).toBeNull();
    });

    it('should succeed even if config file does not exist', async () => {
      // S'assurer qu'il n'y a pas de fichier
      await deleteDeploySettings();

      const response = await DELETE();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should return to default settings after deletion', async () => {
      // Créer une configuration custom
      const createRequest = new Request('http://localhost/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'netlify',
          netlify: {
            apiToken: 'test',
            siteId: 'test',
          },
        }),
      });

      await PUT(createRequest);

      // Supprimer
      await DELETE();

      // Vérifier que GET retourne les defaults
      const response = await GET();
      const data = await response.json();

      expect(data.source).toBe('default');
      expect(data.settings.provider).toBe('local');
      expect(data.settings.local?.outputPath).toBe('./out/sites');
    });
  });

  describe('All providers validation', () => {
    it('should accept all valid provider types', async () => {
      const providers: Array<{
        provider: string;
        config: DeploySettings;
      }> = [
        {
          provider: 'netlify',
          config: {
            provider: 'netlify',
            netlify: { apiToken: 'test', siteId: 'test' },
          },
        },
        {
          provider: 'vercel',
          config: {
            provider: 'vercel',
            vercel: { apiToken: 'test', projectId: 'test' },
          },
        },
        {
          provider: 'ftp',
          config: {
            provider: 'ftp',
            ftp: {
              host: 'test.com',
              port: 21,
              username: 'user',
              password: 'pass',
              remotePath: '/',
              secure: false,
            },
          },
        },
        {
          provider: 'local',
          config: {
            provider: 'local',
            local: { outputPath: './test' },
          },
        },
      ];

      for (const { provider, config } of providers) {
        const request = new Request('http://localhost/api/admin/deploy-settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(config),
        });

        const response = await PUT(request);
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.success).toBe(true);
        expect(data.settings.provider).toBe(provider);

        // Nettoyer entre les itérations
        await deleteDeploySettings();
      }
    });
  });
});
