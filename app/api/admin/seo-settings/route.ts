/**
 * API route pour la gestion des paramètres SEO
 */

import { NextResponse } from 'next/server';
import {
  loadSEOSettings,
  saveSEOSettings,
  deleteSEOSettings,
  getDefaultSEOSettings,
  type SEOSettings,
  type SEOTone,
} from '@/lib/seo-config';

/**
 * GET /api/admin/seo-settings
 * Retourne les paramètres SEO actuels avec leur source
 */
export async function GET() {
  try {
    const settings = await loadSEOSettings();

    if (settings) {
      return NextResponse.json({
        source: 'config-file',
        settings,
      });
    } else {
      return NextResponse.json({
        source: 'default',
        settings: getDefaultSEOSettings(),
      });
    }
  } catch (error) {
    console.error('[API SEO Settings] Error loading settings:', error);
    return NextResponse.json(
      { error: 'Failed to load SEO settings' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/seo-settings
 * Valide et sauvegarde les nouveaux paramètres SEO
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Validation des champs
    if (typeof body.enabled !== 'boolean') {
      return NextResponse.json(
        { error: 'Field "enabled" must be a boolean' },
        { status: 400 }
      );
    }

    const validTones: SEOTone[] = [
      'professional',
      'friendly',
      'sales',
      'local',
      'minimalist',
      'longform',
    ];

    if (!validTones.includes(body.tone)) {
      return NextResponse.json(
        {
          error: `Field "tone" must be one of: ${validTones.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validation des keywords (optionnel)
    if (body.keywords !== undefined) {
      if (!Array.isArray(body.keywords)) {
        return NextResponse.json(
          { error: 'Field "keywords" must be an array' },
          { status: 400 }
        );
      }

      if (!body.keywords.every((kw: unknown) => typeof kw === 'string')) {
        return NextResponse.json(
          { error: 'All keywords must be strings' },
          { status: 400 }
        );
      }
    }

    const settings: SEOSettings = {
      enabled: body.enabled,
      tone: body.tone,
      keywords: body.keywords || [],
    };

    await saveSEOSettings(settings);

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('[API SEO Settings] Error saving settings:', error);
    return NextResponse.json(
      { error: 'Failed to save SEO settings' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/seo-settings
 * Supprime le fichier de configuration SEO (reset vers défaut)
 */
export async function DELETE() {
  try {
    await deleteSEOSettings();

    return NextResponse.json({
      success: true,
      message: 'SEO settings reset to default',
    });
  } catch (error) {
    console.error('[API SEO Settings] Error deleting settings:', error);
    return NextResponse.json(
      { error: 'Failed to delete SEO settings' },
      { status: 500 }
    );
  }
}
