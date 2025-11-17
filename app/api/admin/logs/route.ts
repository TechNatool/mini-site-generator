import { NextRequest, NextResponse } from 'next/server';
import { readLog, clearLog, getLogStats } from '@/lib/logger';

/**
 * GET /api/admin/logs?type=app|actions|emails|deploy&limit=200
 *
 * Retrieve log entries from a specific log file
 *
 * Authentication: Admin only (TODO: Add actual auth check)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement admin authentication check
    // const isAdmin = await checkAdminAuth(request);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const logType = searchParams.get('type') as 'app' | 'actions' | 'emails' | 'deploy' | null;
    const limitStr = searchParams.get('limit');
    const limit = limitStr ? parseInt(limitStr, 10) : 200;

    // Validate log type
    const validTypes = ['app', 'actions', 'emails', 'deploy'];
    if (!logType || !validTypes.includes(logType)) {
      return NextResponse.json(
        { error: 'Invalid log type. Must be one of: app, actions, emails, deploy' },
        { status: 400 }
      );
    }

    // Get log entries
    const entries = readLog(logType, limit);

    // Get log statistics
    const stats = getLogStats(logType);

    return NextResponse.json({
      success: true,
      logType,
      entries,
      stats,
      count: entries.length,
    });
  } catch (error) {
    console.error('Admin logs API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/logs?type=app|actions|emails|deploy
 *
 * Clear a specific log file
 *
 * Authentication: Admin only (TODO: Add actual auth check)
 */
export async function DELETE(request: NextRequest) {
  try {
    // TODO: Implement admin authentication check
    // const isAdmin = await checkAdminAuth(request);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const logType = searchParams.get('type') as 'app' | 'actions' | 'emails' | 'deploy' | null;

    // Validate log type
    const validTypes = ['app', 'actions', 'emails', 'deploy'];
    if (!logType || !validTypes.includes(logType)) {
      return NextResponse.json(
        { error: 'Invalid log type. Must be one of: app, actions, emails, deploy' },
        { status: 400 }
      );
    }

    // Clear the log
    const success = clearLog(logType);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to clear log file' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Log file ${logType} has been cleared`,
      logType,
    });
  } catch (error) {
    console.error('Admin logs API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
