/**
 * Maintenance Mode System
 *
 * Controls site-wide maintenance mode with configurable settings
 */

import fs from 'fs';
import path from 'path';
import { logApp } from './logger';

const MAINTENANCE_CONFIG_PATH = path.join(process.cwd(), '.config', 'maintenance.json');

export interface MaintenanceConfig {
  enabled: boolean;
  message: string;
  estimatedEndTime: string | null;
  bypassRoles: string[];
  allowedPaths: string[];
}

/**
 * Default maintenance configuration
 */
const DEFAULT_CONFIG: MaintenanceConfig = {
  enabled: false,
  message: 'ForgeWeb est en maintenance. Revenez dans quelques minutes.',
  estimatedEndTime: null,
  bypassRoles: ['admin'],
  allowedPaths: ['/admin', '/dashboard/logout', '/api/admin'],
};

/**
 * Load maintenance configuration
 */
export function loadMaintenanceConfig(): MaintenanceConfig {
  try {
    if (!fs.existsSync(MAINTENANCE_CONFIG_PATH)) {
      return DEFAULT_CONFIG;
    }

    const content = fs.readFileSync(MAINTENANCE_CONFIG_PATH, 'utf8');
    const config = JSON.parse(content);

    return { ...DEFAULT_CONFIG, ...config };
  } catch (error) {
    logApp('Failed to load maintenance config, using defaults', 'WARN', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return DEFAULT_CONFIG;
  }
}

/**
 * Save maintenance configuration
 */
export function saveMaintenanceConfig(config: Partial<MaintenanceConfig>): boolean {
  try {
    const currentConfig = loadMaintenanceConfig();
    const newConfig = { ...currentConfig, ...config };

    const configDir = path.dirname(MAINTENANCE_CONFIG_PATH);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    fs.writeFileSync(MAINTENANCE_CONFIG_PATH, JSON.stringify(newConfig, null, 2), 'utf8');

    logApp('Maintenance config updated', 'INFO', { enabled: newConfig.enabled });

    return true;
  } catch (error) {
    logApp('Failed to save maintenance config', 'ERROR', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return false;
  }
}

/**
 * Check if maintenance mode is enabled
 */
export function isMaintenanceModeEnabled(): boolean {
  const config = loadMaintenanceConfig();
  return config.enabled;
}

/**
 * Enable maintenance mode
 */
export function enableMaintenanceMode(message?: string, estimatedEndTime?: string): boolean {
  logApp('Maintenance mode enabled', 'WARN', { message, estimatedEndTime });

  return saveMaintenanceConfig({
    enabled: true,
    ...(message && { message }),
    ...(estimatedEndTime && { estimatedEndTime }),
  });
}

/**
 * Disable maintenance mode
 */
export function disableMaintenanceMode(): boolean {
  logApp('Maintenance mode disabled', 'INFO');

  return saveMaintenanceConfig({
    enabled: false,
    estimatedEndTime: null,
  });
}

/**
 * Check if a path is allowed during maintenance
 */
export function isPathAllowedDuringMaintenance(pathname: string): boolean {
  const config = loadMaintenanceConfig();

  // Check if path starts with any allowed path
  return config.allowedPaths.some((allowedPath) => pathname.startsWith(allowedPath));
}

/**
 * Check if a user can bypass maintenance mode
 */
export function canBypassMaintenance(userRole?: string): boolean {
  if (!userRole) return false;

  const config = loadMaintenanceConfig();
  return config.bypassRoles.includes(userRole);
}

/**
 * Get maintenance page HTML
 */
export function getMaintenancePageHTML(): string {
  const config = loadMaintenanceConfig();

  const estimatedEndTimeHTML = config.estimatedEndTime
    ? `<p class="eta">Retour prévu : ${new Date(config.estimatedEndTime).toLocaleString('fr-FR')}</p>`
    : '';

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Maintenance - ForgeWeb</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .container {
      background: white;
      border-radius: 16px;
      padding: 48px;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .icon {
      font-size: 64px;
      margin-bottom: 24px;
    }

    h1 {
      color: #2d3748;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .message {
      color: #4a5568;
      font-size: 18px;
      line-height: 1.6;
      margin-bottom: 24px;
    }

    .eta {
      color: #718096;
      font-size: 14px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
    }

    .refresh {
      display: inline-block;
      margin-top: 24px;
      padding: 12px 24px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: background 0.2s;
    }

    .refresh:hover {
      background: #5a67d8;
    }

    @media (max-width: 480px) {
      .container {
        padding: 32px 24px;
      }

      h1 {
        font-size: 24px;
      }

      .message {
        font-size: 16px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">🔧</div>
    <h1>Maintenance en cours</h1>
    <p class="message">${config.message}</p>
    ${estimatedEndTimeHTML}
    <a href="/" class="refresh">Actualiser la page</a>
  </div>

  <script>
    // Auto-refresh every 60 seconds
    setTimeout(() => {
      window.location.reload();
    }, 60000);
  </script>
</body>
</html>
  `;
}
