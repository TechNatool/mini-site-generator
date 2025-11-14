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
    console.log(`[Script] Création du ZIP pour le site: ${clientId}`);

    const sourceDir = path.join(process.cwd(), 'app', 'generated', clientId);
    const outputDir = path.join(process.cwd(), 'public', 'downloads');
    const outputPath = path.join(outputDir, `${clientId}.zip`);

    // Vérifier que le dossier source existe
    if (!fs.existsSync(sourceDir)) {
      console.error(`[Script] Le dossier ${sourceDir} n'existe pas`);
      process.exit(1);
    }

    // Créer le dossier de destination
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Créer le ZIP
    await createZipFromDirectory(sourceDir, outputPath);

    // Afficher la taille
    const size = await getZipSize(outputPath);
    console.log(`[Script] ZIP créé avec succès: ${outputPath}`);
    console.log(`[Script] Taille: ${size} Mo`);

    console.log(`[Script] Téléchargeable sur: /downloads/${clientId}.zip`);
  } catch (error) {
    console.error('[Script] Erreur:', error);
    process.exit(1);
  }
}

main();
