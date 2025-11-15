/**
 * Utilitaires pour le nettoyage automatique des fichiers générés
 */

import fs from 'fs';
import path from 'path';

/**
 * Supprime les dossiers de sites générés plus vieux que X heures
 */
export async function cleanOldGeneratedSites(maxAgeHours: number = 24): Promise<number> {
  try {
    const generatedDir = path.join(process.cwd(), 'app', 'generated');

    // Vérifier que le dossier existe
    if (!fs.existsSync(generatedDir)) {
      console.log('[CLEANUP] Aucun dossier app/generated/ trouvé');
      return 0;
    }

    const now = Date.now();
    const maxAge = maxAgeHours * 60 * 60 * 1000; // Convertir en ms
    let deletedCount = 0;

    // Lister tous les dossiers dans app/generated/
    const entries = fs.readdirSync(generatedDir);

    for (const entry of entries) {
      // Ignorer les fichiers cachés et .gitkeep
      if (entry.startsWith('.')) continue;

      const entryPath = path.join(generatedDir, entry);

      // Vérifier que c'est un dossier
      const stats = fs.statSync(entryPath);
      if (!stats.isDirectory()) continue;

      // Vérifier l'âge du dossier
      const age = now - stats.mtimeMs;

      if (age > maxAge) {
        // Supprimer le dossier récursivement
        fs.rmSync(entryPath, { recursive: true, force: true });
        deletedCount++;
        console.log(`[CLEANUP] Dossier supprimé: ${entry} (${Math.round(age / 3600000)}h)`);
      }
    }

    if (deletedCount > 0) {
      console.log(`[CLEANUP] ${deletedCount} ancien${deletedCount > 1 ? 's' : ''} site${deletedCount > 1 ? 's' : ''} supprimé${deletedCount > 1 ? 's' : ''}`);
    }

    return deletedCount;
  } catch (error) {
    console.error('[CLEANUP] Erreur lors du nettoyage des sites:', error);
    return 0;
  }
}

/**
 * Supprime les fichiers ZIP plus vieux que X heures
 */
export async function cleanOldZipFiles(maxAgeHours: number = 24): Promise<number> {
  try {
    const downloadsDir = path.join(process.cwd(), 'public', 'downloads');

    // Vérifier que le dossier existe
    if (!fs.existsSync(downloadsDir)) {
      console.log('[CLEANUP] Aucun dossier public/downloads/ trouvé');
      return 0;
    }

    const now = Date.now();
    const maxAge = maxAgeHours * 60 * 60 * 1000; // Convertir en ms
    let deletedCount = 0;

    // Lister tous les fichiers dans public/downloads/
    const files = fs.readdirSync(downloadsDir);

    for (const file of files) {
      // Ne traiter que les fichiers .zip
      if (!file.endsWith('.zip')) continue;

      // Ignorer .gitkeep
      if (file.startsWith('.')) continue;

      const filePath = path.join(downloadsDir, file);

      // Vérifier que c'est un fichier
      const stats = fs.statSync(filePath);
      if (!stats.isFile()) continue;

      // Vérifier l'âge du fichier
      const age = now - stats.mtimeMs;

      if (age > maxAge) {
        // Supprimer le fichier
        fs.unlinkSync(filePath);
        deletedCount++;
        console.log(`[CLEANUP] Archive supprimée: ${file} (${Math.round(age / 3600000)}h)`);
      }
    }

    if (deletedCount > 0) {
      console.log(`[CLEANUP] ${deletedCount} archive${deletedCount > 1 ? 's' : ''} ZIP supprimée${deletedCount > 1 ? 's' : ''}`);
    }

    return deletedCount;
  } catch (error) {
    console.error('[CLEANUP] Erreur lors du nettoyage des ZIP:', error);
    return 0;
  }
}

/**
 * Nettoyage complet : sites + ZIP
 */
export async function cleanupOldFiles(maxAgeHours: number = 24): Promise<{
  sitesDeleted: number;
  zipsDeleted: number;
}> {
  console.log(`[CLEANUP] Démarrage du nettoyage (fichiers > ${maxAgeHours}h)...`);

  const sitesDeleted = await cleanOldGeneratedSites(maxAgeHours);
  const zipsDeleted = await cleanOldZipFiles(maxAgeHours);

  const total = sitesDeleted + zipsDeleted;

  if (total === 0) {
    console.log('[CLEANUP] Aucun fichier à nettoyer');
  } else {
    console.log(`[CLEANUP] ✓ Nettoyage terminé (${sitesDeleted} sites, ${zipsDeleted} ZIP)`);
  }

  return { sitesDeleted, zipsDeleted };
}

/**
 * Supprime un site spécifique et son ZIP associé
 */
export async function cleanupSpecificSite(clientId: string): Promise<boolean> {
  try {
    console.log(`[CLEANUP] Suppression du site: ${clientId}`);

    let deleted = false;

    // Supprimer le dossier du site
    const sitePath = path.join(process.cwd(), 'app', 'generated', clientId);
    if (fs.existsSync(sitePath)) {
      fs.rmSync(sitePath, { recursive: true, force: true });
      console.log(`[CLEANUP] Dossier supprimé: ${clientId}`);
      deleted = true;
    }

    // Supprimer le ZIP associé
    const zipPath = path.join(process.cwd(), 'public', 'downloads', `${clientId}.zip`);
    if (fs.existsSync(zipPath)) {
      fs.unlinkSync(zipPath);
      console.log(`[CLEANUP] ZIP supprimé: ${clientId}.zip`);
      deleted = true;
    }

    if (deleted) {
      console.log(`[CLEANUP] ✓ Site ${clientId} nettoyé`);
    } else {
      console.log(`[CLEANUP] Site ${clientId} non trouvé`);
    }

    return deleted;
  } catch (error) {
    console.error(`[CLEANUP] Erreur lors de la suppression de ${clientId}:`, error);
    return false;
  }
}

/**
 * Obtient les statistiques de stockage
 */
export function getStorageStats(): {
  generatedSitesCount: number;
  zipFilesCount: number;
  totalSizeBytes: number;
} {
  let generatedSitesCount = 0;
  let zipFilesCount = 0;
  let totalSizeBytes = 0;

  try {
    // Compter les sites générés
    const generatedDir = path.join(process.cwd(), 'app', 'generated');
    if (fs.existsSync(generatedDir)) {
      const entries = fs.readdirSync(generatedDir);
      for (const entry of entries) {
        if (entry.startsWith('.')) continue;
        const entryPath = path.join(generatedDir, entry);
        const stats = fs.statSync(entryPath);
        if (stats.isDirectory()) {
          generatedSitesCount++;
          // Calculer la taille du dossier (approximative)
          const files = getAllFiles(entryPath);
          for (const file of files) {
            totalSizeBytes += fs.statSync(file).size;
          }
        }
      }
    }

    // Compter les ZIP
    const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
    if (fs.existsSync(downloadsDir)) {
      const files = fs.readdirSync(downloadsDir);
      for (const file of files) {
        if (!file.endsWith('.zip')) continue;
        if (file.startsWith('.')) continue;
        zipFilesCount++;
        const filePath = path.join(downloadsDir, file);
        totalSizeBytes += fs.statSync(filePath).size;
      }
    }
  } catch (error) {
    console.error('[CLEANUP] Erreur lors du calcul des stats:', error);
  }

  return {
    generatedSitesCount,
    zipFilesCount,
    totalSizeBytes,
  };
}

/**
 * Récupère tous les fichiers d'un dossier récursivement
 */
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  }

  return arrayOfFiles;
}
