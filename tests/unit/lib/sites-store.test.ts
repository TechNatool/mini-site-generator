import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  loadSites,
  saveSites,
  getSiteById,
  addSite,
  updateSite,
  appendDeploymentLog,
  deleteSite,
  type SiteEntry,
  type DeploymentLog,
} from '@/lib/sites-store';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data');
const SITES_FILE = path.join(DATA_DIR, 'sites.json');

describe('Sites Store', () => {
  beforeEach(async () => {
    // Create .data directory
    await fs.mkdir(DATA_DIR, { recursive: true });
  });

  afterEach(async () => {
    // Clean up test data
    try {
      await fs.unlink(SITES_FILE);
    } catch {
      // Ignore if file doesn't exist
    }
  });

  describe('loadSites()', () => {
    it('should return empty array when file does not exist', async () => {
      const sites = await loadSites();
      expect(sites).toEqual([]);
    });

    it('should load sites from file', async () => {
      const testSites: SiteEntry[] = [
        {
          id: 'site-1',
          ownerId: 'user-1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          inputs: { name: 'Test Site' },
          generation: { success: true, zipPath: '/test.zip', html: {}, logs: [] },
          deployment: { provider: null, url: null, timestamp: null, logs: [] },
        },
      ];

      await saveSites(testSites);

      const loaded = await loadSites();
      expect(loaded).toHaveLength(1);
      expect(loaded[0].id).toBe('site-1');
    });

    it('should handle invalid JSON gracefully', async () => {
      await fs.writeFile(SITES_FILE, 'invalid json{', 'utf-8');

      const sites = await loadSites();
      expect(sites).toEqual([]);
    });
  });

  describe('saveSites()', () => {
    it('should save sites to file', async () => {
      const testSites: SiteEntry[] = [
        {
          id: 'site-test',
          ownerId: 'user-test',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          inputs: { name: 'Save Test' },
          generation: { success: true, zipPath: null, html: null, logs: [] },
          deployment: { provider: null, url: null, timestamp: null, logs: [] },
        },
      ];

      await saveSites(testSites);

      const fileContent = await fs.readFile(SITES_FILE, 'utf-8');
      const saved = JSON.parse(fileContent);

      expect(saved).toHaveLength(1);
      expect(saved[0].id).toBe('site-test');
    });

    it('should create .data directory if it does not exist', async () => {
      // Remove directory
      await fs.rm(DATA_DIR, { recursive: true, force: true });

      await saveSites([]);

      // Verify directory was created
      const stats = await fs.stat(DATA_DIR);
      expect(stats.isDirectory()).toBe(true);
    });
  });

  describe('getSiteById()', () => {
    it('should return site by ID', async () => {
      const testSites: SiteEntry[] = [
        {
          id: 'site-123',
          ownerId: 'user-test',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          inputs: { name: 'Test' },
          generation: { success: true, zipPath: null, html: null, logs: [] },
          deployment: { provider: null, url: null, timestamp: null, logs: [] },
        },
      ];

      await saveSites(testSites);

      const site = await getSiteById('site-123');
      expect(site).not.toBeNull();
      expect(site?.id).toBe('site-123');
    });

    it('should return null if site not found', async () => {
      await saveSites([]);

      const site = await getSiteById('non-existent');
      expect(site).toBeNull();
    });
  });

  describe('addSite()', () => {
    it('should add new site', async () => {
      const newSite: SiteEntry = {
        id: 'new-site',
        ownerId: 'user-test',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        inputs: { name: 'New Site' },
        generation: { success: true, zipPath: null, html: null, logs: [] },
        deployment: { provider: null, url: null, timestamp: null, logs: [] },
      };

      await addSite(newSite);

      const sites = await loadSites();
      expect(sites).toHaveLength(1);
      expect(sites[0].id).toBe('new-site');
    });

    it('should throw error if site with ID already exists', async () => {
      const site: SiteEntry = {
        id: 'duplicate',
        ownerId: 'user-test',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        inputs: {},
        generation: { success: true, zipPath: null, html: null, logs: [] },
        deployment: { provider: null, url: null, timestamp: null, logs: [] },
      };

      await addSite(site);

      await expect(addSite(site)).rejects.toThrow('already exists');
    });
  });

  describe('updateSite()', () => {
    it('should update existing site', async () => {
      const site: SiteEntry = {
        id: 'update-test',
        ownerId: 'user-test',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        inputs: { name: 'Original' },
        generation: { success: false, zipPath: null, html: null, logs: [] },
        deployment: { provider: null, url: null, timestamp: null, logs: [] },
      };

      await addSite(site);

      const updated = await updateSite('update-test', {
        generation: { success: true, zipPath: '/new.zip', html: {}, logs: ['Updated'] },
      });

      expect(updated).not.toBeNull();
      expect(updated?.generation.success).toBe(true);
      expect(updated?.generation.zipPath).toBe('/new.zip');
    });

    it('should return null if site not found', async () => {
      const result = await updateSite('non-existent', {});
      expect(result).toBeNull();
    });
  });

  describe('appendDeploymentLog()', () => {
    it('should append deployment log to site', async () => {
      const site: SiteEntry = {
        id: 'log-test',
        ownerId: 'user-test',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        inputs: {},
        generation: { success: true, zipPath: null, html: null, logs: [] },
        deployment: { provider: null, url: null, timestamp: null, logs: [] },
      };

      await addSite(site);

      const log: DeploymentLog = {
        timestamp: new Date().toISOString(),
        provider: 'netlify',
        status: 'success',
        message: 'Deployed successfully',
      };

      await appendDeploymentLog('log-test', log);

      const updated = await getSiteById('log-test');
      expect(updated?.deployment.logs).toHaveLength(1);
      expect(updated?.deployment.logs[0].provider).toBe('netlify');
    });

    it('should throw error if site not found', async () => {
      const log: DeploymentLog = {
        timestamp: new Date().toISOString(),
        provider: 'netlify',
        status: 'success',
        message: 'Test',
      };

      await expect(appendDeploymentLog('non-existent', log)).rejects.toThrow('not found');
    });
  });

  describe('deleteSite()', () => {
    it('should delete site by ID', async () => {
      const site: SiteEntry = {
        id: 'delete-test',
        ownerId: 'user-test',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        inputs: {},
        generation: { success: true, zipPath: null, html: null, logs: [] },
        deployment: { provider: null, url: null, timestamp: null, logs: [] },
      };

      await addSite(site);

      const deleted = await deleteSite('delete-test');
      expect(deleted).toBe(true);

      const sites = await loadSites();
      expect(sites).toHaveLength(0);
    });

    it('should return false if site not found', async () => {
      const deleted = await deleteSite('non-existent');
      expect(deleted).toBe(false);
    });
  });
});
