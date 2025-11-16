/**
 * Gestion de la configuration IA persistée
 */

import fs from 'fs/promises';
import path from 'path';
import type { AIProvider } from './ai-provider';

const CONFIG_DIR = path.join(process.cwd(), '.config');
const CONFIG_FILE = path.join(CONFIG_DIR, 'ai-settings.json');

export interface AISettings {
  provider: AIProvider;
  model?: string;
}

/**
 * Charge les paramètres IA depuis le fichier de configuration
 */
export async function loadAISettings(): Promise<AISettings | null> {
  try {
    const data = await fs.readFile(CONFIG_FILE, 'utf-8');
    const settings = JSON.parse(data) as AISettings;
    console.log(`[Config] Loaded AI settings from file: provider=${settings.provider}`);
    return settings;
  } catch (error) {
    // Fichier inexistant ou erreur de lecture
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.log('[Config] No AI settings file found, using environment variables');
      return null;
    }
    console.error('[Config] Error loading AI settings:', error);
    return null;
  }
}

/**
 * Charge les paramètres IA de manière synchrone (pour getAIProvider)
 */
export function loadAISettingsSync(): AISettings | null {
  try {
    const fs = require('fs');
    const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
    const settings = JSON.parse(data) as AISettings;
    console.log(`[Config] Loaded AI settings from file: provider=${settings.provider}`);
    return settings;
  } catch (error) {
    // Fichier inexistant ou erreur de lecture
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.log('[Config] No AI settings file found, using environment variables');
      return null;
    }
    console.error('[Config] Error loading AI settings:', error);
    return null;
  }
}

/**
 * Sauvegarde les paramètres IA dans le fichier de configuration
 */
export async function saveAISettings(settings: AISettings): Promise<void> {
  try {
    // Créer le dossier .config s'il n'existe pas
    await fs.mkdir(CONFIG_DIR, { recursive: true });

    // Écrire le fichier
    await fs.writeFile(CONFIG_FILE, JSON.stringify(settings, null, 2), 'utf-8');

    console.log(`[Config] Saved AI settings: provider=${settings.provider}`);
  } catch (error) {
    console.error('[Config] Error saving AI settings:', error);
    throw new Error('Failed to save AI settings');
  }
}

/**
 * Supprime le fichier de configuration
 */
export async function deleteAISettings(): Promise<void> {
  try {
    await fs.unlink(CONFIG_FILE);
    console.log('[Config] Deleted AI settings file');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('[Config] Error deleting AI settings:', error);
      throw new Error('Failed to delete AI settings');
    }
  }
}
