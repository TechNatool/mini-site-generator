/**
 * Script pour déployer un site sur Vercel
 * Usage: tsx scripts/deploy-vercel.ts <clientId>
 */

import { deployToVercel, generateVercelProjectName } from '../lib/utils/vercel';
import { getSiteById } from '../lib/generator';
import path from 'path';

const clientId = process.argv[2];

if (!clientId) {
  console.error('Usage: tsx scripts/deploy-vercel.ts <clientId>');
  process.exit(1);
}

async function main() {
  try {
    console.log(`[Script] Déploiement Vercel pour le site: ${clientId}`);

    // Récupérer les infos du site
    const site = await getSiteById(clientId);

    if (!site) {
      console.error(`[Script] Site ${clientId} introuvable`);
      process.exit(1);
    }

    const sitePath = path.join(process.cwd(), 'app', 'generated', clientId);
    const projectName = generateVercelProjectName(site.formData.name, site.formData.activity);

    console.log(`[Script] Nom du projet Vercel: ${projectName}`);
    console.log(`[Script] Déploiement en cours...`);

    const result = await deployToVercel(sitePath, projectName);

    if (result.success && result.url) {
      console.log(`[Script] Déploiement réussi !`);
      console.log(`[Script] URL: ${result.url}`);
    } else {
      console.error(`[Script] Échec du déploiement: ${result.error}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('[Script] Erreur:', error);
    process.exit(1);
  }
}

main();
