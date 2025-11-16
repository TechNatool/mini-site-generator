/**
 * AI Provider selection and routing
 */

export type AIProvider = 'claude' | 'local' | 'none';

/**
 * Détermine quel provider IA utiliser en fonction des variables d'environnement
 */
export function getAIProvider(): AIProvider {
  if (process.env.NO_AI === 'true') return 'none';

  const provider = process.env.AI_PROVIDER ?? 'claude';
  if (provider !== 'claude' && provider !== 'local') {
    console.warn(`[AI] ⚠️ Unknown provider "${provider}", fallback → claude`);
    return 'claude';
  }

  return provider;
}
