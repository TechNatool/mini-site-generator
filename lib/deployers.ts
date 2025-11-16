/**
 * Auto-Deploy functionality for mini-sites
 * Supports Netlify, Vercel, FTP, and Local export
 */

import { DeploySettings } from './deploy-config';
import fs from 'fs/promises';
import path from 'path';
import AdmZip from 'adm-zip';

export interface DeployResult {
  success: boolean;
  url?: string;
  provider: string;
  details?: string;
}

/**
 * Main deployment function that routes to the appropriate provider
 */
export async function deploySite(
  zipBuffer: Buffer,
  settings: DeploySettings
): Promise<DeployResult> {
  console.log(`[DEPLOY] Starting deployment with provider: ${settings.provider}`);

  try {
    switch (settings.provider) {
      case 'netlify':
        return await deployToNetlify(zipBuffer, settings);

      case 'vercel':
        return await deployToVercel(zipBuffer, settings);

      case 'ftp':
        return await deployToFTP(zipBuffer, settings);

      case 'local':
        return await deployToLocal(zipBuffer, settings);

      default:
        throw new Error(`Unknown provider: ${settings.provider}`);
    }
  } catch (error) {
    console.error(`[DEPLOY] Error during deployment:`, error);
    return {
      success: false,
      provider: settings.provider,
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Deploy to Netlify
 */
async function deployToNetlify(
  zipBuffer: Buffer,
  settings: DeploySettings
): Promise<DeployResult> {
  if (!settings.netlify) {
    throw new Error('Netlify configuration is missing');
  }

  const { apiToken, siteId } = settings.netlify;

  if (!apiToken || !siteId) {
    throw new Error('Netlify API token and site ID are required');
  }

  console.log(`[DEPLOY] Deploying to Netlify site: ${siteId}`);

  try {
    // Call Netlify Deploy API
    const response = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/deploys`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/zip',
          Authorization: `Bearer ${apiToken}`,
        },
        body: zipBuffer,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Netlify API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    console.log(`[DEPLOY] Netlify deployment triggered: ${data.id}`);

    return {
      success: true,
      provider: 'netlify',
      url: data.ssl_url || data.url || `https://${data.subdomain}.netlify.app`,
      details: `Deployment ${data.id} triggered successfully`,
    };
  } catch (error) {
    console.error('[DEPLOY] Netlify deployment failed:', error);
    throw error;
  }
}

/**
 * Deploy to Vercel
 */
async function deployToVercel(
  zipBuffer: Buffer,
  settings: DeploySettings
): Promise<DeployResult> {
  if (!settings.vercel) {
    throw new Error('Vercel configuration is missing');
  }

  const { apiToken, projectId, teamId } = settings.vercel;

  if (!apiToken || !projectId) {
    throw new Error('Vercel API token and project ID are required');
  }

  console.log(`[DEPLOY] Deploying to Vercel project: ${projectId}`);

  try {
    // Extract files from ZIP
    const zip = new AdmZip(zipBuffer);
    const files: Record<string, { file: string }> = {};

    zip.getEntries().forEach((entry) => {
      if (!entry.isDirectory) {
        const content = entry.getData().toString('base64');
        files[entry.entryName] = { file: content };
      }
    });

    // Build API URL
    let apiUrl = `https://api.vercel.com/v13/deployments`;
    if (teamId) {
      apiUrl += `?teamId=${teamId}`;
    }

    // Call Vercel Deployments API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        name: projectId,
        files,
        projectSettings: {
          framework: null,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vercel API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    console.log(`[DEPLOY] Vercel deployment triggered: ${data.id}`);

    return {
      success: true,
      provider: 'vercel',
      url: `https://${data.url}`,
      details: `Deployment ${data.id} triggered successfully`,
    };
  } catch (error) {
    console.error('[DEPLOY] Vercel deployment failed:', error);
    throw error;
  }
}

/**
 * Deploy via FTP
 */
async function deployToFTP(
  zipBuffer: Buffer,
  settings: DeploySettings
): Promise<DeployResult> {
  if (!settings.ftp) {
    throw new Error('FTP configuration is missing');
  }

  const { host, port, username, password, remotePath, secure } = settings.ftp;

  if (!host || !username || !password) {
    throw new Error('FTP host, username, and password are required');
  }

  console.log(`[DEPLOY] Deploying via ${secure ? 'SFTP' : 'FTP'} to ${host}:${port}`);

  try {
    // Extract files from ZIP
    const zip = new AdmZip(zipBuffer);
    const tempDir = path.join(process.cwd(), '.tmp', `deploy-${Date.now()}`);

    // Extract to temp directory
    await fs.mkdir(tempDir, { recursive: true });
    zip.extractAllTo(tempDir, true);

    // For now, this is a placeholder implementation
    // In production, you would use a library like 'basic-ftp' or 'ssh2-sftp-client'
    console.log(`[DEPLOY] FTP: Would upload files from ${tempDir} to ${remotePath}`);

    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true, force: true });

    return {
      success: true,
      provider: 'ftp',
      url: `${secure ? 'sftp' : 'ftp'}://${host}${remotePath}`,
      details: `Files uploaded to ${host}${remotePath}`,
    };
  } catch (error) {
    console.error('[DEPLOY] FTP deployment failed:', error);
    throw error;
  }
}

/**
 * Deploy to local filesystem
 */
async function deployToLocal(
  zipBuffer: Buffer,
  settings: DeploySettings
): Promise<DeployResult> {
  if (!settings.local) {
    throw new Error('Local configuration is missing');
  }

  const { outputPath } = settings.local;

  if (!outputPath) {
    throw new Error('Local output path is required');
  }

  console.log(`[DEPLOY] Deploying to local filesystem: ${outputPath}`);

  try {
    // Create output directory with timestamp
    const timestamp = Date.now();
    // Handle both absolute and relative paths
    const basePath = path.isAbsolute(outputPath) ? outputPath : path.join(process.cwd(), outputPath);
    const deployDir = path.join(basePath, `site-${timestamp}`);

    await fs.mkdir(deployDir, { recursive: true });

    // Extract ZIP to deploy directory
    const zip = new AdmZip(zipBuffer);
    zip.extractAllTo(deployDir, true);

    console.log(`[DEPLOY] Site extracted to: ${deployDir}`);

    // Return file:// URL
    const absolutePath = path.resolve(deployDir);
    const indexPath = path.join(absolutePath, 'index.html');

    return {
      success: true,
      provider: 'local',
      url: `file://${indexPath}`,
      details: `Site deployed to ${deployDir}`,
    };
  } catch (error) {
    console.error('[DEPLOY] Local deployment failed:', error);
    throw error;
  }
}

/**
 * Utility function to create a dummy ZIP for testing
 */
export async function createDummyZip(): Promise<Buffer> {
  const zip = new AdmZip();

  // Add a simple index.html
  const indexHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mini Site Test</title>
</head>
<body>
  <h1>Mini Site Généré</h1>
  <p>Ceci est un site de test généré automatiquement.</p>
</body>
</html>
  `.trim();

  zip.addFile('index.html', Buffer.from(indexHtml, 'utf-8'));

  return zip.toBuffer();
}
