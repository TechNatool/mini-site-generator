/**
 * API route pour la gestion des paramètres de déploiement
 */

import { NextResponse } from 'next/server';
import {
  loadDeploySettings,
  saveDeploySettings,
  deleteDeploySettings,
  getDefaultDeploySettings,
  type DeploySettings,
  type DeployProvider,
} from '@/lib/deploy-config';

/**
 * GET /api/admin/deploy-settings
 * Retourne les paramètres de déploiement actuels avec leur source
 */
export async function GET() {
  try {
    const settings = await loadDeploySettings();

    if (settings) {
      return NextResponse.json({
        source: 'config-file',
        settings,
      });
    } else {
      return NextResponse.json({
        source: 'default',
        settings: getDefaultDeploySettings(),
      });
    }
  } catch (error) {
    console.error('[API Deploy Settings] Error loading settings:', error);
    return NextResponse.json(
      { error: 'Failed to load deploy settings' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/deploy-settings
 * Valide et sauvegarde les nouveaux paramètres de déploiement
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Validation du provider
    const validProviders: DeployProvider[] = ['netlify', 'vercel', 'ftp', 'local'];
    if (!validProviders.includes(body.provider)) {
      return NextResponse.json(
        {
          error: `Field "provider" must be one of: ${validProviders.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validation des champs selon le provider
    if (body.provider === 'netlify') {
      if (!body.netlify || !body.netlify.apiToken || !body.netlify.siteId) {
        return NextResponse.json(
          { error: 'Netlify requires apiToken and siteId' },
          { status: 400 }
        );
      }
    }

    if (body.provider === 'vercel') {
      if (!body.vercel || !body.vercel.apiToken || !body.vercel.projectId) {
        return NextResponse.json(
          { error: 'Vercel requires apiToken and projectId' },
          { status: 400 }
        );
      }
    }

    if (body.provider === 'ftp') {
      if (
        !body.ftp ||
        !body.ftp.host ||
        !body.ftp.username ||
        !body.ftp.password ||
        !body.ftp.remotePath
      ) {
        return NextResponse.json(
          { error: 'FTP requires host, username, password, and remotePath' },
          { status: 400 }
        );
      }

      if (typeof body.ftp.port !== 'number' || body.ftp.port < 1 || body.ftp.port > 65535) {
        return NextResponse.json(
          { error: 'FTP port must be a number between 1 and 65535' },
          { status: 400 }
        );
      }

      if (typeof body.ftp.secure !== 'boolean') {
        return NextResponse.json(
          { error: 'FTP secure must be a boolean' },
          { status: 400 }
        );
      }
    }

    if (body.provider === 'local') {
      if (!body.local || !body.local.outputPath) {
        return NextResponse.json(
          { error: 'Local requires outputPath' },
          { status: 400 }
        );
      }
    }

    const settings: DeploySettings = {
      provider: body.provider,
      netlify: body.netlify,
      vercel: body.vercel,
      ftp: body.ftp,
      local: body.local,
    };

    await saveDeploySettings(settings);

    return NextResponse.json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error('[API Deploy Settings] Error saving settings:', error);
    return NextResponse.json(
      { error: 'Failed to save deploy settings' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/deploy-settings
 * Supprime le fichier de configuration de déploiement (reset vers défaut)
 */
export async function DELETE() {
  try {
    await deleteDeploySettings();

    return NextResponse.json({
      success: true,
      message: 'Deploy settings reset to default',
    });
  } catch (error) {
    console.error('[API Deploy Settings] Error deleting settings:', error);
    return NextResponse.json(
      { error: 'Failed to delete deploy settings' },
      { status: 500 }
    );
  }
}
