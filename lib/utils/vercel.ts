/**
 * Utilitaires pour le déploiement sur Vercel
 */

/**
 * Déploie un site sur Vercel via l'API
 * Note: Nécessite un token Vercel et la configuration appropriée
 */
export async function deployToVercel(
  sitePath: string,
  _projectName: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const vercelToken = process.env.VERCEL_TOKEN;

    if (!vercelToken) {
      console.warn('[Vercel] VERCEL_TOKEN non défini');
      return {
        success: false,
        error: 'Token Vercel non configuré',
      };
    }

    // TODO: Implémenter le déploiement via l'API Vercel
    // Documentation: https://vercel.com/docs/rest-api

    console.log('[Vercel] Déploiement en cours...', { sitePath, projectName: _projectName });

    // Pour l'instant, retourner un placeholder
    return {
      success: false,
      error: 'Déploiement Vercel non encore implémenté',
    };
  } catch (error) {
    console.error('[Vercel] Erreur lors du déploiement:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

/**
 * Crée un nouveau projet Vercel
 */
export async function createVercelProject(
  _projectName: string
): Promise<{ success: boolean; projectId?: string; error?: string }> {
  try {
    const vercelToken = process.env.VERCEL_TOKEN;

    if (!vercelToken) {
      return {
        success: false,
        error: 'Token Vercel non configuré',
      };
    }

    // TODO: Implémenter la création de projet via l'API Vercel

    return {
      success: false,
      error: 'Création de projet Vercel non encore implémentée',
    };
  } catch (error) {
    console.error('[Vercel] Erreur lors de la création du projet:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

/**
 * Génère un nom de projet Vercel valide
 */
export function generateVercelProjectName(clientName: string, activity: string): string {
  // Normaliser le nom (lowercase, sans espaces ni caractères spéciaux)
  const normalized = `${clientName}-${activity}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9-]/g, '-') // Remplacer les caractères spéciaux par des tirets
    .replace(/-+/g, '-') // Supprimer les tirets multiples
    .replace(/^-|-$/g, ''); // Supprimer les tirets en début/fin

  // Limiter à 63 caractères (limite Vercel)
  return normalized.substring(0, 63);
}
