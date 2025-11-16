/**
 * API route pour déclencher le déploiement d'un mini-site
 */

import { NextResponse } from 'next/server';
import { loadDeploySettingsSync } from '@/lib/deploy-config';
import { deploySite, createDummyZip } from '@/lib/deployers';

/**
 * POST /api/admin/deploy-site
 * Déclenche le déploiement d'un mini-site
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Load deploy settings
    const settings = loadDeploySettingsSync();

    if (!settings) {
      return NextResponse.json(
        {
          error: 'No deploy settings configured. Please configure deployment settings first.',
        },
        { status: 400 }
      );
    }

    console.log(`[API Deploy Site] Deploying site with provider: ${settings.provider}`);

    // For now, use a dummy ZIP (in production, this would be the actual generated site)
    // The siteId from the request body could be used to locate the specific site ZIP
    const zipBuffer = await createDummyZip();

    // Trigger deployment
    const result = await deploySite(zipBuffer, settings);

    if (result.success) {
      return NextResponse.json({
        success: true,
        provider: result.provider,
        url: result.url,
        details: result.details,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          provider: result.provider,
          error: result.details || 'Deployment failed',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('[API Deploy Site] Error during deployment:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
