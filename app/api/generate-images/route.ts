/**
 * API Route pour générer des images via IA
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateImagePrompts } from '@/lib/claude-api';
import type { GenerateImagesRequest, GenerateImagesResponse } from '@/types/api';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    console.log('[API Images] Réception de la requête de génération d\'images');

    // Parser le body
    const body = (await request.json()) as GenerateImagesRequest;
    const { activity, style } = body;

    // Validation
    if (!activity || !style) {
      return NextResponse.json(
        {
          success: false,
          error: 'Activité et style sont requis',
        },
        { status: 400 }
      );
    }

    console.log('[API Images] Génération de prompts pour:', activity);

    // Générer les prompts d'images via Claude API
    const imagePrompts = await generateImagePrompts(activity, style);

    console.log('[API Images] Prompts générés:', imagePrompts);

    // Note: Pour l'instant, on retourne juste les prompts
    // Dans une version future, on pourrait intégrer un service de génération d'images
    // comme DALL-E, Midjourney, Stable Diffusion, etc.

    const response: GenerateImagesResponse = {
      success: true,
      images: {
        hero: `/placeholder-${activity}-hero.jpg`, // Placeholder
        about: `/placeholder-${activity}-about.jpg`,
        services: `/placeholder-${activity}-services.jpg`,
      },
    };

    // On pourrait aussi retourner les prompts pour que l'utilisateur
    // puisse les utiliser avec un service externe
    console.log('[API Images] Prompts suggestions:', imagePrompts);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('[API Images] Erreur lors de la génération:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la génération des images',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'API de génération d\'images. Utilisez POST pour générer des images.',
      endpoints: {
        POST: {
          description: 'Génère des suggestions d\'images pour un site',
          body: {
            activity: 'string',
            style: 'string',
            count: 'number (optional, default: 3)',
          },
        },
      },
      note: 'Cette API génère actuellement des suggestions de prompts. L\'intégration avec un service de génération d\'images réel est à venir.',
    },
    { status: 200 }
  );
}
