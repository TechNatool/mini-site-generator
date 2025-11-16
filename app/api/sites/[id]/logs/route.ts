/**
 * API Route pour récupérer les logs d'un site
 * GET /api/sites/[id]/logs
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSiteByIdForOwner } from '@/lib/sites-store';
import { requireAuth } from '@/lib/auth-guard';

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
    // Require authentication
    const user = await requireAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Get site only if owned by current user
    const site = await getSiteByIdForOwner(id, user.id);

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
