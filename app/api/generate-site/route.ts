/**
 * API Route pour générer un site complet
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateSite, saveSiteFiles } from '@/lib/generator';
import { createZipFromDirectory } from '@/lib/utils/zip';
import { deployToVercel, generateVercelProjectName } from '@/lib/utils/vercel';
import { cleanupOldFiles } from '@/lib/utils/cleanup';
import type { GenerateSiteRequest, GenerateSiteResponse } from '@/types/api';
import path from 'path';

export const runtime = 'nodejs';
export const maxDuration = 60; // 60 secondes maximum

export async function POST(request: NextRequest) {
  try {
    console.log('[API] Réception de la requête de génération de site');

    // Parser le body
    const body = (await request.json()) as GenerateSiteRequest;
    const { formData, options } = body;

    // Validation basique
    if (!formData || !formData.name || !formData.activity || !formData.city) {
      return NextResponse.json(
        {
          success: false,
          error: 'Données manquantes : nom, activité et ville sont requis',
        },
        { status: 400 }
      );
    }

    if (!formData.contact || !formData.contact.phone || !formData.contact.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Coordonnées de contact incomplètes',
        },
        { status: 400 }
      );
    }

    if (!formData.services || formData.services.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Au moins un service doit être fourni',
        },
        { status: 400 }
      );
    }

    console.log('[API] Génération du site pour:', formData.name);

    // 1. Générer le site
    const site = await generateSite(formData, options);
    console.log('[API] Site généré - ID:', site.clientId);

    // 2. Sauvegarder les fichiers
    const sitePath = await saveSiteFiles(site);
    console.log('[API] Site sauvegardé dans:', sitePath);

    // 3. Créer le ZIP dans public/downloads/
    const zipFileName = `${site.clientId}.zip`;
    const zipPath = path.join(process.cwd(), 'public', 'downloads', zipFileName);

    console.log('[API] Création du ZIP...');
    await createZipFromDirectory(sitePath, zipPath, site.clientId);
    console.log('[API] ZIP créé avec succès:', zipPath);

    // 4. Générer les URLs de retour
    const zipUrl = `/downloads/${site.clientId}.zip`;
    const previewUrl = `/preview/${site.clientId}`;

    console.log('[API] ZIP disponible sur:', zipUrl);
    console.log('[API] Prévisualisation disponible sur:', previewUrl);

    // 5. Déployer sur Vercel si demandé
    let vercelUrl: string | undefined;
    if (options?.autoDeployVercel) {
      console.log('[API] Déploiement Vercel demandé');
      const projectName = generateVercelProjectName(formData.name, formData.activity);
      const deployResult = await deployToVercel(sitePath, projectName);

      if (deployResult.success && deployResult.url) {
        vercelUrl = deployResult.url;
        console.log('[API] Site déployé sur Vercel:', vercelUrl);
      } else {
        console.warn('[API] Échec du déploiement Vercel:', deployResult.error);
      }
    }

    // 6. Retourner la réponse
    const response: GenerateSiteResponse = {
      success: true,
      clientId: site.clientId,
      zipUrl,
      previewUrl,
      vercelUrl,
      pages: site.pages,
    };

    console.log('[API] ✓ Génération terminée avec succès');
    console.log('[API] ✓ Client ID:', site.clientId);
    console.log('[API] ✓ ZIP URL:', zipUrl);

    // 7. Nettoyage automatique des anciens fichiers (async, non-bloquant)
    cleanupOldFiles(24).catch((err) => {
      console.error('[API] Erreur lors du nettoyage automatique:', err);
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('[API] Erreur lors de la génération:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la génération du site',
        code: 'GENERATION_ERROR',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'API de génération de sites. Utilisez POST pour générer un site.',
      endpoints: {
        POST: {
          description: 'Génère un nouveau site',
          body: {
            formData: {
              name: 'string',
              activity: 'string',
              city: 'string',
              services: 'string[]',
              contact: {
                phone: 'string',
                email: 'string',
              },
            },
            options: {
              generateImages: 'boolean (optional)',
              autoDeployVercel: 'boolean (optional)',
            },
          },
        },
      },
    },
    { status: 200 }
  );
}
