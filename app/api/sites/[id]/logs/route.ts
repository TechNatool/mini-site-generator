/**
 * API Route pour récupérer les logs d'un site
 * GET /api/sites/[id]/logs
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSiteById } from '@/lib/sites-store';

export const runtime = 'nodejs';

/**
 * GET /api/sites/[id]/logs
 * Récupère tous les logs (génération + déploiement) d'un site
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const site = await getSiteById(id);

    if (!site) {
      return NextResponse.json(
        {
          success: false,
          error: 'Site not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      logs: {
        generation: site.generation.logs,
        deployment: site.deployment.logs,
      },
    });
  } catch (error) {
    console.error('[API Logs] Error getting logs:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get logs',
      },
      { status: 500 }
    );
  }
}
