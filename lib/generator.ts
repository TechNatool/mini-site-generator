/**
 * Orchestrateur principal de génération de sites
 */

import { FormData, AIGeneratedContent, GeneratedSite, GenerationOptions } from '@/types/generator';
import { generateSiteContent } from './claude-api';
import {
  homeTemplate,
  aboutTemplate,
  servicesTemplate,
  pricingTemplate,
  contactTemplate,
  legalTemplate,
} from './templates';
import { generateSitemap, generateRobotsTxt } from './seo';
import fs from 'fs/promises';
import path from 'path';

/**
 * Génère un ID client unique
 */
export function generateClientId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `site-${timestamp}-${random}`;
}

/**
 * Génère le site complet
 */
export async function generateSite(
  formData: FormData,
  options: GenerationOptions = {
    generateImages: false,
    autoDeployVercel: false,
  }
): Promise<GeneratedSite> {
  try {
    console.log('[Generator] Début de la génération du site...');

    // 1. Générer l'ID client
    const clientId = generateClientId();
    console.log('[Generator] Client ID:', clientId);

    // 2. Générer le contenu via Claude API
    console.log('[Generator] Génération du contenu via Claude API...');
    const aiContent = await generateSiteContent(formData);

    // 3. Générer chaque page avec les templates
    console.log('[Generator] Génération des pages HTML...');
    const pages = {
      home: homeTemplate.generateContent(formData, aiContent),
      about: aboutTemplate.generateContent(formData, aiContent),
      services: servicesTemplate.generateContent(formData, aiContent),
      pricing: pricingTemplate.generateContent(formData, aiContent),
      contact: contactTemplate.generateContent(formData, aiContent),
      legal: legalTemplate.generateContent(formData, aiContent),
    };

    // 4. Générer les fichiers additionnels
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://example.com';
    const sitemap = generateSitemap(clientId, baseUrl);
    const robotsTxt = generateRobotsTxt(baseUrl);

    // 5. Créer la structure de fichiers
    const files = [
      { path: 'index.html', content: pages.home },
      { path: 'about.html', content: pages.about },
      { path: 'services.html', content: pages.services },
      { path: 'pricing.html', content: pages.pricing },
      { path: 'contact.html', content: pages.contact },
      { path: 'legal.html', content: pages.legal },
      { path: 'sitemap.xml', content: sitemap },
      { path: 'robots.txt', content: robotsTxt },
    ];

    // 6. Créer le site généré
    const generatedSite: GeneratedSite = {
      clientId,
      formData,
      content: aiContent,
      pages,
      files,
      createdAt: new Date(),
    };

    console.log('[Generator] Site généré avec succès');
    return generatedSite;
  } catch (error) {
    console.error('[Generator] Erreur lors de la génération:', error);
    throw new Error('Échec de la génération du site');
  }
}

/**
 * Génère un placeholder HTML pour une page manquante
 */
function generatePlaceholderPage(pageName: string, clientId: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page manquante - ${pageName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 min-h-screen flex items-center justify-center">
  <div class="max-w-2xl mx-auto p-8">
    <div class="bg-white rounded-lg shadow-xl p-8 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-4">Page manquante</h1>
      <p class="text-gray-600 mb-2">La page <strong>${pageName}</strong> n'a pas pu être générée correctement.</p>
      <p class="text-sm text-gray-500 mb-6">Site ID: ${clientId}</p>
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left">
        <p class="text-sm text-yellow-800">
          <strong>Erreur de génération :</strong> Cette page devrait contenir du contenu généré automatiquement,
          mais une erreur s'est produite pendant le processus de génération.
        </p>
      </div>
      <div class="mt-6">
        <a href="index.html" class="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Retour à l'accueil
        </a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Sauvegarde les fichiers du site généré sur le disque
 */
export async function saveSiteFiles(
  site: GeneratedSite,
  basePath: string = './app/generated'
): Promise<string> {
  try {
    const sitePath = path.join(basePath, site.clientId);

    console.log('[Generator] Création du dossier:', sitePath);

    // Créer le dossier du site
    await fs.mkdir(sitePath, { recursive: true });

    // Pages requises avec leurs noms de fichiers
    const requiredPages = [
      { key: 'home', filename: 'home.html', displayName: 'Accueil' },
      { key: 'about', filename: 'about.html', displayName: 'À propos' },
      { key: 'services', filename: 'services.html', displayName: 'Services' },
      { key: 'pricing', filename: 'pricing.html', displayName: 'Tarifs' },
      { key: 'contact', filename: 'contact.html', displayName: 'Contact' },
      { key: 'legal', filename: 'legal.html', displayName: 'Mentions légales' },
    ];

    // Vérifier et sauvegarder les pages
    let homeContent: string | null = null;
    let missingPages = 0;

    for (const page of requiredPages) {
      const pageContent = site.pages[page.key as keyof typeof site.pages];
      const filePath = path.join(sitePath, page.filename);

      if (pageContent && pageContent.trim().length > 0) {
        // Page existe, la sauvegarder
        await fs.writeFile(filePath, pageContent, 'utf-8');
        console.log(`[Generator] ✓ Page créée: ${page.filename}`);

        // Sauvegarder le contenu de la page home pour index.html
        if (page.key === 'home') {
          homeContent = pageContent;
        }
      } else {
        // Page manquante, créer un placeholder
        const placeholder = generatePlaceholderPage(page.displayName, site.clientId);
        await fs.writeFile(filePath, placeholder, 'utf-8');
        console.warn(`[Generator] ⚠ Placeholder créé pour: ${page.filename}`);
        missingPages++;
      }
    }

    // Créer index.html basé sur home.html
    if (homeContent) {
      const indexPath = path.join(sitePath, 'index.html');
      await fs.writeFile(indexPath, homeContent, 'utf-8');
      console.log('[Generator] ✓ index.html créé depuis home.html');
    } else {
      // Si pas de home.html, créer un index.html placeholder
      const indexPlaceholder = generatePlaceholderPage('Index', site.clientId);
      const indexPath = path.join(sitePath, 'index.html');
      await fs.writeFile(indexPath, indexPlaceholder, 'utf-8');
      console.warn('[Generator] ⚠ index.html créé avec placeholder');
    }

    // Sauvegarder les autres fichiers (sitemap, robots.txt)
    for (const file of site.files) {
      // Ignorer les fichiers HTML déjà traités
      if (file.path.endsWith('.html')) continue;

      const filePath = path.join(sitePath, file.path);
      const fileDir = path.dirname(filePath);

      // Créer les sous-dossiers si nécessaire
      await fs.mkdir(fileDir, { recursive: true });

      // Écrire le fichier
      await fs.writeFile(filePath, file.content, 'utf-8');
      console.log(`[Generator] ✓ Fichier créé: ${file.path}`);
    }

    // Sauvegarder les métadonnées enrichies
    const metadataPath = path.join(sitePath, 'metadata.json');
    const metadata = {
      clientId: site.clientId,
      name: site.formData.name,
      activity: site.formData.activity,
      city: site.formData.city,
      formData: site.formData,
      createdAt: site.createdAt,
      generatedPages: requiredPages.map((p) => p.filename),
      missingPages: missingPages,
      status: missingPages === 0 ? 'complete' : 'incomplete',
    };

    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
    console.log('[Generator] ✓ metadata.json créé');

    if (missingPages > 0) {
      console.warn(`[Generator] ⚠ ${missingPages} page(s) manquante(s) remplacée(s) par des placeholders`);
    }

    console.log('[Generator] ✓ Site sauvegardé avec succès dans:', sitePath);
    return sitePath;
  } catch (error) {
    console.error('[Generator] Erreur lors de la sauvegarde:', error);
    throw new Error('Échec de la sauvegarde des fichiers');
  }
}

/**
 * Récupère un site généré par son ID
 */
export async function getSiteById(
  clientId: string,
  basePath: string = './app/generated'
): Promise<GeneratedSite | null> {
  try {
    const sitePath = path.join(basePath, clientId);
    const metadataPath = path.join(sitePath, 'metadata.json');

    // Vérifier si le site existe
    try {
      await fs.access(metadataPath);
    } catch {
      return null;
    }

    // Lire les métadonnées
    const metadataContent = await fs.readFile(metadataPath, 'utf-8');
    const metadata = JSON.parse(metadataContent);

    // Lire tous les fichiers HTML
    const pages = {
      home: await fs.readFile(path.join(sitePath, 'index.html'), 'utf-8'),
      about: await fs.readFile(path.join(sitePath, 'about.html'), 'utf-8'),
      services: await fs.readFile(path.join(sitePath, 'services.html'), 'utf-8'),
      pricing: await fs.readFile(path.join(sitePath, 'pricing.html'), 'utf-8'),
      contact: await fs.readFile(path.join(sitePath, 'contact.html'), 'utf-8'),
      legal: await fs.readFile(path.join(sitePath, 'legal.html'), 'utf-8'),
    };

    // Lire tous les fichiers
    const filesList = await fs.readdir(sitePath);
    const files = await Promise.all(
      filesList
        .filter((file) => file !== 'metadata.json')
        .map(async (file) => ({
          path: file,
          content: await fs.readFile(path.join(sitePath, file), 'utf-8'),
        }))
    );

    return {
      clientId: metadata.clientId,
      formData: metadata.formData,
      content: {} as AIGeneratedContent, // Non sauvegardé pour alléger
      pages,
      files,
      createdAt: new Date(metadata.createdAt),
    };
  } catch (error) {
    console.error('[Generator] Erreur lors de la récupération du site:', error);
    return null;
  }
}

/**
 * Liste tous les sites générés
 */
export async function listAllSites(basePath: string = './app/generated'): Promise<
  Array<{
    clientId: string;
    formData: FormData;
    createdAt: Date;
  }>
> {
  try {
    // Créer le dossier s'il n'existe pas
    await fs.mkdir(basePath, { recursive: true });

    const dirs = await fs.readdir(basePath);
    const sites = [];

    for (const dir of dirs) {
      const metadataPath = path.join(basePath, dir, 'metadata.json');

      try {
        const content = await fs.readFile(metadataPath, 'utf-8');
        const metadata = JSON.parse(content);
        sites.push({
          clientId: metadata.clientId,
          formData: metadata.formData,
          createdAt: new Date(metadata.createdAt),
        });
      } catch {
        // Ignorer les dossiers sans metadata.json
        continue;
      }
    }

    return sites.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error('[Generator] Erreur lors de la liste des sites:', error);
    return [];
  }
}

/**
 * Supprime un site généré
 */
export async function deleteSite(
  clientId: string,
  basePath: string = './app/generated'
): Promise<boolean> {
  try {
    const sitePath = path.join(basePath, clientId);

    // Supprimer récursivement le dossier
    await fs.rm(sitePath, { recursive: true, force: true });

    console.log('[Generator] Site supprimé:', clientId);
    return true;
  } catch (error) {
    console.error('[Generator] Erreur lors de la suppression:', error);
    return false;
  }
}
