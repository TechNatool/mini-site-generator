/**
 * AI Provider selection and routing
 */

import { loadAISettingsSync } from './config';

export type AIProvider = 'claude' | 'local' | 'none';

/**
 * Détermine quel provider IA utiliser en fonction de la configuration
 * Ordre de priorité:
 * 1. NO_AI=true → 'none'
 * 2. Fichier .config/ai-settings.json → provider du fichier
 * 3. Variable d'environnement AI_PROVIDER → provider de l'env
 * 4. Défaut → 'claude'
 */
export function getAIProvider(): AIProvider {
  // Priorité 1: NO_AI=true force le mode none
  if (process.env.NO_AI === 'true') {
    console.log('[AI] NO_AI=true detected, using fallback mode');
    return 'none';
  }

  // Priorité 2: Lire depuis le fichier de configuration
  const configSettings = loadAISettingsSync();
  if (configSettings && configSettings.provider) {
    console.log(`[AI] Using provider from config file: ${configSettings.provider}`);
    return configSettings.provider;
  }

  // Priorité 3: Variable d'environnement AI_PROVIDER
  const provider = process.env.AI_PROVIDER ?? 'claude';
  if (provider !== 'claude' && provider !== 'local') {
    console.warn(`[AI] ⚠️ Unknown provider "${provider}", fallback → claude`);
    return 'claude';
  }

  console.log(`[AI] Using provider from environment: ${provider}`);
  return provider;
}
