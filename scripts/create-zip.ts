/**
 * Script pour créer un ZIP d'un site généré
 * Usage: tsx scripts/create-zip.ts <clientId>
 */

import { createZipFromDirectory, getZipSize } from '../lib/utils/zip';
import path from 'path';
import fs from 'fs';

const clientId = process.argv[2];

if (!clientId) {
  console.error('Usage: tsx scripts/create-zip.ts <clientId>');
  process.exit(1);
}

async function main() {
  try {
    console.log(`[Script] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`[Script] Création du ZIP pour le site: ${clientId}`);
    console.log(`[Script] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

    // Chemins relatifs basés sur process.cwd()
    const sourceDir = path.join(process.cwd(), 'app', 'generated', clientId);
    const outputDir = path.join(process.cwd(), 'public', 'downloads');
    const outputPath = path.join(outputDir, `${clientId}.zip`);

    console.log('[Script] Dossier source:', sourceDir);
    console.log('[Script] Dossier destination:', outputDir);

    // Vérifier que le dossier source existe
    if (!fs.existsSync(sourceDir)) {
      console.error(`[Script] ✗ Erreur: Le dossier ${sourceDir} n'existe pas`);
      process.exit(1);
    }

    // Créer le dossier de destination si nécessaire
    if (!fs.existsSync(outputDir)) {
      console.log('[Script] Création du dossier public/downloads/...');
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Créer le ZIP
    console.log('[Script] Compression en cours...');
    await createZipFromDirectory(sourceDir, outputPath, clientId);

    // Afficher la taille
    const size = await getZipSize(outputPath);
    console.log(`[Script] ✓ ZIP créé avec succès: ${outputPath}`);
    console.log(`[Script] ✓ Taille: ${size} MB`);
    console.log(`[Script] ✓ URL publique: /downloads/${clientId}.zip`);
    console.log(`[Script] ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  } catch (error) {
    console.error('[Script] ✗ Erreur:', error);
    process.exit(1);
  }
}

main();
