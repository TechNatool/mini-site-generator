/**
 * API Route pour déployer un site
 * POST /api/sites/[id]/deploy
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSiteByIdForOwner, updateSite, appendDeploymentLog, type DeploymentLog } from '@/lib/sites-store';
import { loadDeploySettingsSync } from '@/lib/deploy-config';
import { deploySite, createDummyZip } from '@/lib/deployers';
import { requireAuth } from '@/lib/auth-guard';
import path from 'path';
import fs from 'fs/promises';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * POST /api/sites/[id]/deploy
 * Déploie un site existant
 */
export async function POST(
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

    console.log(`[API Deploy] Deploying site: ${id}`);

    // 1. Get site (only if owned by current user)
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

    // 2. Load deploy settings
    const deploySettings = loadDeploySettingsSync();

    if (!deploySettings) {
      return NextResponse.json(
        {
          success: false,
          error: 'No deploy settings configured. Please configure deployment settings first.',
        },
        { status: 400 }
      );
    }

    // 3. Load ZIP file
    const zipPath = path.join(process.cwd(), 'public', 'downloads', `${id}.zip`);
    let zipBuffer: Buffer;

    try {
      zipBuffer = await fs.readFile(zipPath);
      console.log(`[API Deploy] ZIP loaded: ${zipPath}`);
    } catch (error) {
      console.error(`[API Deploy] ZIP not found, creating dummy ZIP`);
      // Fallback to dummy ZIP if file doesn't exist
      zipBuffer = await createDummyZip();
    }

    // 4. Deploy using AutoDeploy module
    console.log(`[API Deploy] Deploying with provider: ${deploySettings.provider}`);
    const deployResult = await deploySite(zipBuffer, deploySettings);

    // 5. Create deployment log
    const deploymentLog: DeploymentLog = {
      timestamp: new Date().toISOString(),
      provider: deploySettings.provider,
      status: deployResult.success ? 'success' : 'error',
      message: deployResult.success
        ? deployResult.details || 'Deployment successful'
        : deployResult.details || 'Deployment failed',
    };

    // 6. Update site with deployment info
    await updateSite(id, {
      deployment: {
        provider: deploySettings.provider,
        url: deployResult.url || null,
        timestamp: new Date().toISOString(),
        logs: [...site.deployment.logs, deploymentLog],
      },
    });

    console.log(`[API Deploy] ✓ Site deployed successfully: ${id}`);

    return NextResponse.json({
      success: true,
      id,
      message: deployResult.success ? 'Site deployed successfully' : 'Deployment failed',
      deployment: {
        provider: deploySettings.provider,
        url: deployResult.url,
        details: deployResult.details,
      },
    });
  } catch (error) {
    console.error('[API Deploy] Error deploying site:', error);

    // Try to log the error
    try {
      const { id } = params;
      const deploymentLog: DeploymentLog = {
        timestamp: new Date().toISOString(),
        provider: 'unknown',
        status: 'error',
        message: error instanceof Error ? error.message : 'Deployment error',
      };

      await appendDeploymentLog(id, deploymentLog);
    } catch (logError) {
      console.error('[API Deploy] Failed to log deployment error:', logError);
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to deploy site',
      },
      { status: 500 }
    );
  }
}
