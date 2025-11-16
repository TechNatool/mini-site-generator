/**
 * API Routes pour gérer les sites
 * GET /api/sites - Liste tous les sites
 * POST /api/sites - Crée un nouveau site
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateSite, saveSiteFiles } from '@/lib/generator';
import { createZipFromDirectory } from '@/lib/utils/zip';
import { loadSites, addSite, type SiteEntry } from '@/lib/sites-store';
import { generateSiteContent } from '@/lib/claude-api';
import { generateImages } from '@/lib/image-ai';
import { loadImageSettings } from '@/lib/image-config';
import path from 'path';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * GET /api/sites
 * Retourne la liste de tous les sites
 */
export async function GET() {
  try {
    const sites = await loadSites();

    return NextResponse.json({
      success: true,
      sites,
      total: sites.length,
    });
  } catch (error) {
    console.error('[API Sites] Error loading sites:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load sites',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sites
 * Crée un nouveau site
 */
export async function POST(request: NextRequest) {
  const logs: string[] = [];

  try {
    console.log('[API Sites] Creating new site...');
    logs.push('[API Sites] Creating new site...');

    // Parse request body
    const body = await request.json();
    const { formData, options = {} } = body;

    // Validation
    if (!formData || !formData.name || !formData.activity || !formData.city) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, activity, city',
        },
        { status: 400 }
      );
    }

    if (!formData.contact || !formData.contact.phone || !formData.contact.email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing contact information',
        },
        { status: 400 }
      );
    }

    if (!formData.services || formData.services.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'At least one service is required',
        },
        { status: 400 }
      );
    }

    // 1. Generate site content
    logs.push(`[Generation] Generating site for: ${formData.name}`);
    console.log('[API Sites] Generating site for:', formData.name);

    const site = await generateSite(formData, options);
    logs.push(`[Generation] Site generated with ID: ${site.clientId}`);

    // 2. Save site files
    logs.push('[Generation] Saving site files...');
    const sitePath = await saveSiteFiles(site);
    logs.push(`[Generation] Site files saved to: ${sitePath}`);

    // 3. Create ZIP
    const zipFileName = `${site.clientId}.zip`;
    const zipPath = path.join(process.cwd(), 'public', 'downloads', zipFileName);

    logs.push('[Generation] Creating ZIP archive...');
    await createZipFromDirectory(sitePath, zipPath, site.clientId);
    logs.push(`[Generation] ZIP created: ${zipFileName}`);

    const zipUrl = `/downloads/${site.clientId}.zip`;

    // 4. Generate images if configured
    const imageSettings = await loadImageSettings();
    if (imageSettings && imageSettings.provider !== 'none' && options.generateImages) {
      logs.push(`[Images] Generating images with provider: ${imageSettings.provider}`);

      try {
        await generateImages(formData, site.content, imageSettings);
        logs.push('[Images] Images generated successfully');
      } catch (imageError) {
        logs.push(`[Images] Error generating images: ${imageError}`);
        console.error('[API Sites] Image generation error:', imageError);
      }
    }

    // 5. Create SiteEntry
    const siteEntry: SiteEntry = {
      id: site.clientId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      inputs: formData,

      generation: {
        success: true,
        zipPath: `/downloads/${site.clientId}.zip`,
        html: site.pages,
        logs,
      },

      deployment: {
        provider: null,
        url: null,
        timestamp: null,
        logs: [],
      },
    };

    // 6. Add to store
    await addSite(siteEntry);
    logs.push(`[Store] Site saved to database: ${site.clientId}`);

    console.log('[API Sites] ✓ Site created successfully:', site.clientId);

    return NextResponse.json({
      success: true,
      id: site.clientId,
      message: 'Site created successfully',
      zipUrl,
      previewUrl: `/preview/${site.clientId}`,
    });
  } catch (error) {
    console.error('[API Sites] Error creating site:', error);
    logs.push(`[Error] ${error instanceof Error ? error.message : 'Unknown error'}`);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create site',
        logs,
      },
      { status: 500 }
    );
  }
}
