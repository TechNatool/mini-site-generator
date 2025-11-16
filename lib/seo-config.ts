/**
 * Gestion de la configuration SEO persistée
 */

import fs from 'fs/promises';
import path from 'path';

const CONFIG_DIR = path.join(process.cwd(), '.config');
const CONFIG_FILE = path.join(CONFIG_DIR, 'seo-settings.json');

export type SEOTone =
  | 'professional'
  | 'friendly'
  | 'sales'
  | 'local'
  | 'minimalist'
  | 'longform';

export interface SEOSettings {
  enabled: boolean;
  tone: SEOTone;
  keywords?: string[];
}

/**
 * Charge les paramètres SEO depuis le fichier de configuration
 */
export async function loadSEOSettings(): Promise<SEOSettings | null> {
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf-8');
    const settings = JSON.parse(data) as SEOSettings;
    console.log(`[SEO Config] Loaded SEO settings: enabled=${settings.enabled}, tone=${settings.tone}`);
    return settings;
  } catch (error) {
    // Fichier inexistant ou erreur de lecture
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.log('[SEO Config] No SEO settings file found, using defaults');
      return null;
    }
    console.error('[SEO Config] Error loading SEO settings:', error);
    return null;
  }
}

/**
 * Charge les paramètres SEO de manière synchrone
 */
export function loadSEOSettingsSync(): SEOSettings | null {
  try {
    const fs = require('fs');
    const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
    const settings = JSON.parse(data) as SEOSettings;
    console.log(`[SEO Config] Loaded SEO settings: enabled=${settings.enabled}, tone=${settings.tone}`);
    return settings;
  } catch (error) {
    // Fichier inexistant ou erreur de lecture
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.log('[SEO Config] No SEO settings file found, using defaults');
      return null;
    }
    console.error('[SEO Config] Error loading SEO settings:', error);
    return null;
  }
}

/**
 * Sauvegarde les paramètres SEO dans le fichier de configuration
 */
export async function saveSEOSettings(settings: SEOSettings): Promise<void> {
  try {
    // Créer le dossier .config s'il n'existe pas
    await fs.mkdir(CONFIG_DIR, { recursive: true });

    // Écrire le fichier
    await fs.writeFile(CONFIG_FILE, JSON.stringify(settings, null, 2), 'utf-8');

    console.log(`[SEO Config] Saved SEO settings: enabled=${settings.enabled}, tone=${settings.tone}`);
  } catch (error) {
    console.error('[SEO Config] Error saving SEO settings:', error);
    throw new Error('Failed to save SEO settings');
  }
}

/**
 * Supprime le fichier de configuration SEO
 */
export async function deleteSEOSettings(): Promise<void> {
  try {
    await fs.unlink(CONFIG_FILE);
    console.log('[SEO Config] Deleted SEO settings file');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('[SEO Config] Error deleting SEO settings:', error);
      throw new Error('Failed to delete SEO settings');
    }
  }
}

/**
 * Retourne les paramètres SEO par défaut
 */
export function getDefaultSEOSettings(): SEOSettings {
  return {
    enabled: false,
    tone: 'professional',
    keywords: [],
  };
}
