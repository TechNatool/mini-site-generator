/**
 * API Routes pour un site spécifique
 * GET /api/sites/[id] - Récupère un site
 * PUT /api/sites/[id] - Regénère un site
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSiteByIdForOwner, updateSite } from '@/lib/sites-store';
import { generateSite, saveSiteFiles } from '@/lib/generator';
import { createZipFromDirectory } from '@/lib/utils/zip';
import { loadImageSettings } from '@/lib/image-config';
import { generateImages } from '@/lib/image-ai';
import { requireAuth } from '@/lib/auth-guard';
import path from 'path';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * GET /api/sites/[id]
 * Récupère les détails d'un site
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
      site,
    });
  } catch (error) {
    console.error('[API Sites] Error getting site:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get site',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/sites/[id]
 * Regénère un site existant
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const logs: string[] = [];

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

    console.log(`[API Sites] Regenerating site: ${id}`);
    logs.push(`[API Sites] Regenerating site: ${id}`);

    // Get existing site (only if owned by current user)
    const existingSite = await getSiteByIdForOwner(id, user.id);

    if (!existingSite) {
      return NextResponse.json(
        {
          success: false,
          error: 'Site not found',
        },
        { status: 404 }
      );
    }

    // Parse options from request body
    const body = await request.json().catch(() => ({}));
    const options = body.options || {};

    // 1. Regenerate site content
    logs.push(`[Regeneration] Regenerating content for: ${existingSite.inputs.name}`);
    console.log('[API Sites] Regenerating site content...');

    const site = await generateSite(existingSite.inputs, options);
    logs.push(`[Regeneration] Content generated`);

    // 2. Save new files
    logs.push('[Regeneration] Saving new files...');
    const sitePath = await saveSiteFiles(site);
    logs.push(`[Regeneration] Files saved to: ${sitePath}`);

    // 3. Create new ZIP
    const zipFileName = `${id}.zip`;
    const zipPath = path.join(process.cwd(), 'public', 'downloads', zipFileName);

    logs.push('[Regeneration] Creating new ZIP archive...');
    await createZipFromDirectory(sitePath, zipPath, id);
    logs.push(`[Regeneration] ZIP created: ${zipFileName}`);

    // 4. Generate images if configured
    const imageSettings = await loadImageSettings();
    if (imageSettings && imageSettings.provider !== 'none' && options.generateImages) {
      logs.push(`[Images] Generating images with provider: ${imageSettings.provider}`);

      try {
        await generateImages(existingSite.inputs, site.content, imageSettings);
        logs.push('[Images] Images generated successfully');
      } catch (imageError) {
        logs.push(`[Images] Error generating images: ${imageError}`);
        console.error('[API Sites] Image generation error:', imageError);
      }
    }

    // 5. Update site in store
    const updatedSite = await updateSite(id, {
      generation: {
        success: true,
        zipPath: `/downloads/${id}.zip`,
        html: site.pages,
        logs,
      },
    });

    if (!updatedSite) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to update site in store',
        },
        { status: 500 }
      );
    }

    console.log('[API Sites] ✓ Site regenerated successfully:', id);

    return NextResponse.json({
      success: true,
      id,
      message: 'Site regenerated successfully',
      site: updatedSite,
    });
  } catch (error) {
    console.error('[API Sites] Error regenerating site:', error);
    logs.push(`[Error] ${error instanceof Error ? error.message : 'Unknown error'}`);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to regenerate site',
        logs,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/sites/[id]
 * Supprime un site
 */
export async function DELETE(
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

    // Verify ownership before deleting
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

    const { deleteSite } = await import('@/lib/sites-store');
    const deleted = await deleteSite(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to delete site',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Site deleted successfully',
    });
  } catch (error) {
    console.error('[API Sites] Error deleting site:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete site',
      },
      { status: 500 }
    );
  }
}
