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

    // Sauvegarder chaque fichier
    for (const file of site.files) {
      const filePath = path.join(sitePath, file.path);
      const fileDir = path.dirname(filePath);

      // Créer les sous-dossiers si nécessaire
      await fs.mkdir(fileDir, { recursive: true });

      // Écrire le fichier
      await fs.writeFile(filePath, file.content, 'utf-8');
      console.log('[Generator] Fichier créé:', file.path);
    }

    // Sauvegarder les métadonnées
    const metadataPath = path.join(sitePath, 'metadata.json');
    await fs.writeFile(
      metadataPath,
      JSON.stringify(
        {
          clientId: site.clientId,
          formData: site.formData,
          createdAt: site.createdAt,
        },
        null,
        2
      ),
      'utf-8'
    );

    console.log('[Generator] Site sauvegardé avec succès dans:', sitePath);
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
