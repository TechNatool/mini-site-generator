/**
 * Configuration management for Auto-Deploy settings
 */

import fs from 'fs/promises';
import path from 'path';

const CONFIG_DIR = path.join(process.cwd(), '.config');
const CONFIG_FILE = path.join(CONFIG_DIR, 'deploy-settings.json');

export type DeployProvider = 'netlify' | 'vercel' | 'ftp' | 'local';

export interface DeploySettings {
  provider: DeployProvider;
  netlify?: {
    apiToken: string;
    siteId: string;
  };
  vercel?: {
    apiToken: string;
    projectId: string;
    teamId?: string;
  };
  ftp?: {
    host: string;
    port: number;
    username: string;
    password: string;
    remotePath: string;
    secure: boolean;
  };
  local?: {
    outputPath: string;
  };
}

/**
 * Load deploy settings from config file (async)
 */
export async function loadDeploySettings(): Promise<DeploySettings | null> {
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or invalid JSON
    return null;
  }
}

/**
 * Load deploy settings synchronously (for use in non-async contexts)
 */
export function loadDeploySettingsSync(): DeploySettings | null {
  try {
    const fs = require('fs');
    const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or invalid JSON
    console.error('[Deploy Config] Error loading deploy settings:', error);
    return null;
  }
}

/**
 * Save deploy settings to config file
 */
export async function saveDeploySettings(settings: DeploySettings): Promise<void> {
  try {
    // Create .config directory if it doesn't exist
    await fs.mkdir(CONFIG_DIR, { recursive: true });

    // Write settings to file
    await fs.writeFile(CONFIG_FILE, JSON.stringify(settings, null, 2), 'utf-8');

    console.log(`[Deploy Config] Settings saved for provider: ${settings.provider}`);
  } catch (error) {
    console.error('[Deploy Config] Error saving deploy settings:', error);
    throw error;
  }
}

/**
 * Delete deploy settings file (reset to default)
 */
export async function deleteDeploySettings(): Promise<void> {
  try {
    await fs.unlink(CONFIG_FILE);
    console.log('[Deploy Config] Settings deleted, reset to default');
  } catch (error) {
    // Ignore error if file doesn't exist
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('[Deploy Config] Error deleting deploy settings:', error);
      throw error;
    }
  }
}

/**
 * Get default deploy settings
 */
export function getDefaultDeploySettings(): DeploySettings {
  return {
    provider: 'local',
    local: {
      outputPath: './out/sites',
    },
  };
}
