/**
 * Global Logging System for ForgeWeb
 *
 * Provides structured logging to different log files with rotation support
 */

import fs from 'fs';
import path from 'path';

// Log file paths
const LOG_DIR = path.join(process.cwd(), '.data', 'logs');
const LOG_FILES = {
  app: path.join(LOG_DIR, 'app.log'),
  actions: path.join(LOG_DIR, 'actions.log'),
  emails: path.join(LOG_DIR, 'emails.log'),
  deploy: path.join(LOG_DIR, 'deploy.log'),
};

// Maximum log file size (10MB)
const MAX_LOG_SIZE = 10 * 1024 * 1024;

// Maximum number of rotated logs to keep
const MAX_ROTATED_LOGS = 5;

/**
 * Ensure log directory and files exist
 */
function ensureLogDirectory() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }

  Object.values(LOG_FILES).forEach((logFile) => {
    if (!fs.existsSync(logFile)) {
      fs.writeFileSync(logFile, '', 'utf8');
    }
  });
}

/**
 * Write a log entry to a specific log file
 */
function writeLog(
  logType: keyof typeof LOG_FILES,
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG',
  message: string,
  metadata?: Record<string, any>
) {
  ensureLogDirectory();

  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    type: logType,
    message,
    ...metadata,
  };

  const logLine = JSON.stringify(logEntry) + '\n';
  const logFile = LOG_FILES[logType];

  try {
    fs.appendFileSync(logFile, logLine, 'utf8');

    // Check if rotation is needed
    const stats = fs.statSync(logFile);
    if (stats.size > MAX_LOG_SIZE) {
      rotateLog(logFile);
    }
  } catch (error) {
    // Fallback to console if file writing fails
    console.error('Failed to write to log file:', error);
    console.log(logEntry);
  }
}

/**
 * Rotate a log file when it gets too large
 */
function rotateLog(logFile: string) {
  try {
    // Create rotated filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const rotatedFile = `${logFile}.${timestamp}`;

    // Rename current log to rotated file
    fs.renameSync(logFile, rotatedFile);

    // Create new empty log file
    fs.writeFileSync(logFile, '', 'utf8');

    // Clean up old rotated logs
    cleanupOldRotatedLogs(logFile);

    console.log(`Log rotated: ${path.basename(logFile)}`);
  } catch (error) {
    console.error('Failed to rotate log:', error);
  }
}

/**
 * Clean up old rotated logs, keeping only the most recent ones
 */
function cleanupOldRotatedLogs(baseLogFile: string) {
  try {
    const logDir = path.dirname(baseLogFile);
    const baseName = path.basename(baseLogFile);

    // Find all rotated versions of this log
    const files = fs.readdirSync(logDir);
    const rotatedLogs = files
      .filter((f) => f.startsWith(baseName) && f !== baseName)
      .map((f) => ({
        name: f,
        path: path.join(logDir, f),
        mtime: fs.statSync(path.join(logDir, f)).mtime,
      }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    // Keep only the most recent MAX_ROTATED_LOGS
    rotatedLogs.slice(MAX_ROTATED_LOGS).forEach(({ path: filePath }) => {
      fs.unlinkSync(filePath);
      console.log(`Deleted old rotated log: ${path.basename(filePath)}`);
    });
  } catch (error) {
    console.error('Failed to cleanup rotated logs:', error);
  }
}

/**
 * Log general application events
 */
export function logApp(message: string, level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' = 'INFO', metadata?: Record<string, any>) {
  writeLog('app', level, message, metadata);
}

/**
 * Log user actions
 */
export function logAction(userId: string, action: string, metadata?: Record<string, any>) {
  writeLog('actions', 'INFO', action, {
    userId,
    ...metadata,
  });
}

/**
 * Log email sends
 */
export function logEmail(
  to: string | string[],
  template: string,
  status: 'success' | 'failed',
  metadata?: Record<string, any>
) {
  const recipients = Array.isArray(to) ? to : [to];
  writeLog('emails', status === 'success' ? 'INFO' : 'ERROR', `Email sent: ${template}`, {
    to: recipients,
    template,
    status,
    ...metadata,
  });
}

/**
 * Log deployment events
 */
export function logDeploy(
  siteId: string,
  provider: string,
  status: 'started' | 'success' | 'failed',
  metadata?: Record<string, any>
) {
  const level = status === 'failed' ? 'ERROR' : 'INFO';
  writeLog('deploy', level, `Deployment ${status}: ${siteId}`, {
    siteId,
    provider,
    status,
    ...metadata,
  });
}

/**
 * Manually trigger log rotation if needed for all logs
 */
export function rotateLogsIfNeeded() {
  ensureLogDirectory();

  Object.values(LOG_FILES).forEach((logFile) => {
    if (fs.existsSync(logFile)) {
      const stats = fs.statSync(logFile);
      if (stats.size > MAX_LOG_SIZE) {
        rotateLog(logFile);
      }
    }
  });
}

/**
 * Read log entries from a specific log file
 */
export function readLog(
  logType: keyof typeof LOG_FILES,
  limit: number = 200
): Array<Record<string, any>> {
  ensureLogDirectory();

  const logFile = LOG_FILES[logType];

  if (!fs.existsSync(logFile)) {
    return [];
  }

  try {
    const content = fs.readFileSync(logFile, 'utf8');
    const lines = content.trim().split('\n').filter((line) => line);

    // Parse JSON lines
    const entries = lines
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter((entry) => entry !== null);

    // Return last N entries
    return entries.slice(-limit);
  } catch (error) {
    console.error('Failed to read log file:', error);
    return [];
  }
}

/**
 * Clear a specific log file
 */
export function clearLog(logType: keyof typeof LOG_FILES): boolean {
  ensureLogDirectory();

  const logFile = LOG_FILES[logType];

  try {
    fs.writeFileSync(logFile, '', 'utf8');
    logApp(`Log cleared: ${logType}`, 'INFO');
    return true;
  } catch (error) {
    console.error('Failed to clear log file:', error);
    return false;
  }
}

/**
 * Get log file statistics
 */
export function getLogStats(logType: keyof typeof LOG_FILES): {
  size: number;
  lines: number;
  lastModified: Date;
} | null {
  ensureLogDirectory();

  const logFile = LOG_FILES[logType];

  if (!fs.existsSync(logFile)) {
    return null;
  }

  try {
    const stats = fs.statSync(logFile);
    const content = fs.readFileSync(logFile, 'utf8');
    const lines = content.trim().split('\n').filter((line) => line).length;

    return {
      size: stats.size,
      lines,
      lastModified: stats.mtime,
    };
  } catch (error) {
    console.error('Failed to get log stats:', error);
    return null;
  }
}

// Initialize logs on module load
ensureLogDirectory();
