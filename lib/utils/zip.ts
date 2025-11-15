/**
 * Utilitaires pour créer des archives ZIP
 */

import archiver from 'archiver';
import fs from 'fs';
import path from 'path';

/**
 * Crée un fichier ZIP à partir d'un dossier
 */
export async function createZipFromDirectory(
  sourceDir: string,
  outputPath: string,
  clientId?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log('[ZIP] Dossier compressé:', sourceDir);

    // Créer le dossier de destination s'il n'existe pas
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      console.log('[ZIP] Création du dossier de destination:', outputDir);
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Créer le flux de sortie
    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Niveau de compression maximum
    });

    // Gestion des événements
    output.on('close', () => {
      const sizeInBytes = archive.pointer();
      const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);
      console.log(`[ZIP] Archive créée: ${sizeInBytes} bytes (${sizeInMB} MB)`);

      // Générer l'URL publique
      const fileName = path.basename(outputPath);
      const publicUrl = `/downloads/${fileName}`;
      console.log('[ZIP] URL publique prête:', publicUrl);

      resolve(outputPath);
    });

    archive.on('error', (err) => {
      console.error('[ZIP] Erreur lors de la création:', err);
      reject(err);
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('[ZIP] Warning:', err);
      } else {
        reject(err);
      }
    });

    // Connecter l'archive au flux de sortie
    archive.pipe(output);

    // Ajouter tous les fichiers du dossier
    archive.directory(sourceDir, false);

    // Finaliser l'archive
    archive.finalize();
  });
}

/**
 * Crée un ZIP à partir d'une liste de fichiers
 */
export async function createZipFromFiles(
  files: Array<{ path: string; content: string | Buffer }>,
  outputPath: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const output = fs.createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    output.on('close', () => {
      console.log(`[ZIP] Archive créée: ${archive.pointer()} bytes`);
      resolve(outputPath);
    });

    archive.on('error', (err) => {
      console.error('[ZIP] Erreur:', err);
      reject(err);
    });

    archive.pipe(output);

    // Ajouter chaque fichier
    for (const file of files) {
      archive.append(file.content, { name: file.path });
    }

    archive.finalize();
  });
}

/**
 * Obtient la taille d'un fichier ZIP en Mo
 */
export async function getZipSize(zipPath: string): Promise<number> {
  try {
    const stats = fs.statSync(zipPath);
    return Math.round((stats.size / 1024 / 1024) * 100) / 100; // Mo avec 2 décimales
  } catch (error) {
    console.error('[ZIP] Erreur lors de la lecture de la taille:', error);
    return 0;
  }
}

/**
 * Nettoie les anciens fichiers ZIP (plus de X jours)
 */
export async function cleanOldZips(directory: string, maxAgeDays: number = 7): Promise<number> {
  try {
    const files = fs.readdirSync(directory);
    const now = Date.now();
    const maxAge = maxAgeDays * 24 * 60 * 60 * 1000; // Convertir en ms
    let deletedCount = 0;

    for (const file of files) {
      if (!file.endsWith('.zip')) continue;

      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      const age = now - stats.mtimeMs;

      if (age > maxAge) {
        fs.unlinkSync(filePath);
        deletedCount++;
        console.log('[ZIP] Fichier supprimé:', file);
      }
    }

    console.log(`[ZIP] ${deletedCount} fichiers ZIP supprimés`);
    return deletedCount;
  } catch (error) {
    console.error('[ZIP] Erreur lors du nettoyage:', error);
    return 0;
  }
}
