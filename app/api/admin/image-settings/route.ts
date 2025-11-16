/**
 * API route pour la gestion des paramètres d'images AI
 */

import { NextResponse } from 'next/server';
import {
  loadImageSettings,
  saveImageSettings,
  deleteImageSettings,
  getDefaultImageSettings,
  type ImageSettings,
  type ImageProvider,
  type ImageFormat,
} from '@/lib/image-config';

/**
 * GET /api/admin/image-settings
 * Retourne les paramètres d'images actuels avec leur source
 */
export async function GET() {
  try {
    const settings = await loadImageSettings();

    if (settings) {
      return NextResponse.json({
        source: 'config-file',
        settings,
      });
    } else {
      return NextResponse.json({
        source: 'default',
        settings: getDefaultImageSettings(),
      });
    }
  } catch (error) {
    console.error('[API Image Settings] Error loading settings:', error);
    return NextResponse.json(
      { error: 'Failed to load image settings' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/image-settings
 * Valide et sauvegarde les nouveaux paramètres d'images
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Validation du provider
    const validProviders: ImageProvider[] = ['claude', 'local', 'none'];
    if (!validProviders.includes(body.provider)) {
      return NextResponse.json(
        {
          error: `Field "provider" must be one of: ${validProviders.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validation de la taille
    if (typeof body.size !== 'number' || body.size < 128 || body.size > 4096) {
      return NextResponse.json(
        { error: 'Field "size" must be a number between 128 and 4096' },
        { status: 400 }
      );
    }

    // Validation du format
    const validFormats: ImageFormat[] = ['webp', 'jpg', 'png'];
    if (!validFormats.includes(body.format)) {
      return NextResponse.json(
        {
          error: `Field "format" must be one of: ${validFormats.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validation de la qualité
    if (typeof body.quality !== 'number' || body.quality < 1 || body.quality > 100) {
      return NextResponse.json(
        { error: 'Field "quality" must be a number between 1 and 100' },
        { status: 400 }
      );
    }

    // Validation des booléens
    if (typeof body.optimize !== 'boolean') {
      return NextResponse.json(
        { error: 'Field "optimize" must be a boolean' },
        { status: 400 }
      );
    }

    if (typeof body.autoAltText !== 'boolean') {
      return NextResponse.json(
        { error: 'Field "autoAltText" must be a boolean' },
        { status: 400 }
      );
    }

    const settings: ImageSettings = {
      provider: body.provider,
      size: body.size,
      format: body.format,
      quality: body.quality,
      optimize: body.optimize,
      autoAltText: body.autoAltText,
    };

    await saveImageSettings(settings);

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('[API Image Settings] Error saving settings:', error);
    return NextResponse.json(
      { error: 'Failed to save image settings' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/image-settings
 * Supprime le fichier de configuration d'images (reset vers défaut)
 */
export async function DELETE() {
  try {
    await deleteImageSettings();

    return NextResponse.json({
      success: true,
      message: 'Image settings reset to default',
    });
  } catch (error) {
    console.error('[API Image Settings] Error deleting settings:', error);
    return NextResponse.json(
      { error: 'Failed to delete image settings' },
      { status: 500 }
    );
  }
}
