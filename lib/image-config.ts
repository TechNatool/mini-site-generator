/**
 * Configuration management for Image AI settings
 */

import fs from 'fs/promises';
import path from 'path';

const CONFIG_DIR = path.join(process.cwd(), '.config');
const CONFIG_FILE = path.join(CONFIG_DIR, 'image-settings.json');

export type ImageProvider = 'claude' | 'local' | 'none';
export type ImageFormat = 'webp' | 'jpg' | 'png';

export interface ImageSettings {
  provider: ImageProvider;
  size: number; // 512 / 720 / 1080 / 1920
  format: ImageFormat;
  quality: number; // 1-100
  optimize: boolean;
  autoAltText: boolean;
}

/**
 * Load image settings from config file (async)
 */
export async function loadImageSettings(): Promise<ImageSettings | null> {
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or invalid JSON
    return null;
  }
}

/**
 * Load image settings synchronously (for use in non-async contexts)
 */
export function loadImageSettingsSync(): ImageSettings | null {
  try {
    const fs = require('fs');
    const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // File doesn't exist or invalid JSON
    console.error('[Image Config] Error loading image settings:', error);
    return null;
  }
}

/**
 * Save image settings to config file
 */
export async function saveImageSettings(settings: ImageSettings): Promise<void> {
  try {
    // Create .config directory if it doesn't exist
    await fs.mkdir(CONFIG_DIR, { recursive: true });

    // Write settings to file
    await fs.writeFile(CONFIG_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (error) {
    console.error('[Image Config] Error saving image settings:', error);
    throw error;
  }
}

/**
 * Delete image settings file (reset to default)
 */
export async function deleteImageSettings(): Promise<void> {
  try {
    await fs.unlink(CONFIG_FILE);
  } catch (error) {
    // Ignore error if file doesn't exist
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('[Image Config] Error deleting image settings:', error);
      throw error;
    }
  }
}

/**
 * Get default image settings
 */
export function getDefaultImageSettings(): ImageSettings {
  return {
    provider: 'none', // Default to placeholder images
    size: 1080,
    format: 'webp',
    quality: 85,
    optimize: true,
    autoAltText: true,
  };
}
