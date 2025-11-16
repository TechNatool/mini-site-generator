/**
 * Sites Store - Gestion persistante des sites générés
 * Stockage dans .data/sites.json
 */

import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data');
const SITES_FILE = path.join(DATA_DIR, 'sites.json');

/**
 * Types
 */

export type DeploymentLog = {
  timestamp: string;
  provider: string;
  status: 'success' | 'error';
  message: string;
};

export type SiteEntry = {
  id: string;
  createdAt: string;
  updatedAt: string;
  inputs: Record<string, any>;

  generation: {
    success: boolean;
    zipPath: string | null;
    html: Record<string, string> | null;
    logs: string[];
  };

  deployment: {
    provider: string | null;
    url: string | null;
    timestamp: string | null;
    logs: DeploymentLog[];
  };
};

/**
 * Load sites from .data/sites.json (async)
 */
export async function loadSites(): Promise<SiteEntry[]> {
  try {
    // Check if file exists
    try {
      await fs.access(SITES_FILE);
    } catch {
      // File doesn't exist, return empty array
      return [];
    }

    const fileContent = await fs.readFile(SITES_FILE, 'utf-8');
    const sites = JSON.parse(fileContent);

    if (!Array.isArray(sites)) {
      console.error('[Sites Store] Invalid sites file format, expected array');
      return [];
    }

    return sites;
  } catch (error) {
    console.error('[Sites Store] Error loading sites:', error);
    return [];
  }
}

/**
 * Load sites synchronously
 */
export function loadSitesSync(): SiteEntry[] {
  try {
    // Check if file exists
    try {
      const stats = require('fs').statSync(SITES_FILE);
      if (!stats.isFile()) {
        return [];
      }
    } catch {
      return [];
    }

    const fileContent = require('fs').readFileSync(SITES_FILE, 'utf-8');
    const sites = JSON.parse(fileContent);

    if (!Array.isArray(sites)) {
      console.error('[Sites Store] Invalid sites file format, expected array');
      return [];
    }

    return sites;
  } catch (error) {
    console.error('[Sites Store] Error loading sites sync:', error);
    return [];
  }
}

/**
 * Save sites to .data/sites.json
 */
export async function saveSites(sites: SiteEntry[]): Promise<void> {
  try {
    // Create .data directory if it doesn't exist
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Write sites to file
    await fs.writeFile(SITES_FILE, JSON.stringify(sites, null, 2), 'utf-8');

    console.log(`[Sites Store] Saved ${sites.length} site(s)`);
  } catch (error) {
    console.error('[Sites Store] Error saving sites:', error);
    throw new Error('Failed to save sites');
  }
}

/**
 * Get a single site by ID
 */
export async function getSiteById(id: string): Promise<SiteEntry | null> {
  const sites = await loadSites();
  const site = sites.find((s) => s.id === id);

  return site || null;
}

/**
 * Add a new site
 */
export async function addSite(entry: SiteEntry): Promise<void> {
  const sites = await loadSites();

  // Check if site with this ID already exists
  const existingIndex = sites.findIndex((s) => s.id === entry.id);

  if (existingIndex !== -1) {
    throw new Error(`Site with ID ${entry.id} already exists`);
  }

  sites.push(entry);
  await saveSites(sites);

  console.log(`[Sites Store] Added site: ${entry.id}`);
}

/**
 * Update an existing site
 */
export async function updateSite(
  id: string,
  updates: Partial<SiteEntry>
): Promise<SiteEntry | null> {
  const sites = await loadSites();
  const index = sites.findIndex((s) => s.id === id);

  if (index === -1) {
    console.error(`[Sites Store] Site not found: ${id}`);
    return null;
  }

  // Update the site
  sites[index] = {
    ...sites[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  await saveSites(sites);

  console.log(`[Sites Store] Updated site: ${id}`);
  return sites[index];
}

/**
 * Append a deployment log to a site
 */
export async function appendDeploymentLog(
  id: string,
  log: DeploymentLog
): Promise<void> {
  const sites = await loadSites();
  const index = sites.findIndex((s) => s.id === id);

  if (index === -1) {
    throw new Error(`Site not found: ${id}`);
  }

  // Append log
  sites[index].deployment.logs.push(log);
  sites[index].updatedAt = new Date().toISOString();

  await saveSites(sites);

  console.log(`[Sites Store] Appended deployment log to site: ${id}`);
}

/**
 * Delete a site by ID
 */
export async function deleteSite(id: string): Promise<boolean> {
  const sites = await loadSites();
  const index = sites.findIndex((s) => s.id === id);

  if (index === -1) {
    return false;
  }

  sites.splice(index, 1);
  await saveSites(sites);

  console.log(`[Sites Store] Deleted site: ${id}`);
  return true;
}

/**
 * Get all deployment logs across all sites
 */
export async function getAllDeploymentLogs(): Promise<
  Array<DeploymentLog & { siteId: string; siteName: string }>
> {
  const sites = await loadSites();
  const logs: Array<DeploymentLog & { siteId: string; siteName: string }> = [];

  for (const site of sites) {
    const siteName = site.inputs.name || site.id;

    for (const log of site.deployment.logs) {
      logs.push({
        ...log,
        siteId: site.id,
        siteName,
      });
    }
  }

  // Sort by timestamp descending (most recent first)
  logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return logs;
}

/**
 * Get stats for dashboard
 */
export async function getSiteStats(): Promise<{
  totalSites: number;
  successfulGenerations: number;
  successfulDeployments: number;
  latestSites: SiteEntry[];
}> {
  const sites = await loadSites();

  const successfulGenerations = sites.filter((s) => s.generation.success).length;

  const successfulDeployments = sites.filter((s) =>
    s.deployment.logs.some((log) => log.status === 'success')
  ).length;

  // Get latest 5 sites
  const latestSites = sites
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return {
    totalSites: sites.length,
    successfulGenerations,
    successfulDeployments,
    latestSites,
  };
}
