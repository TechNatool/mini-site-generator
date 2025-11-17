import { NextRequest, NextResponse } from 'next/server';
import {
  loadMaintenanceConfig,
  enableMaintenanceMode,
  disableMaintenanceMode,
  saveMaintenanceConfig,
} from '@/lib/maintenance';

/**
 * GET /api/admin/maintenance
 *
 * Get current maintenance mode configuration
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    // const isAdmin = await checkAdminAuth(request);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const config = loadMaintenanceConfig();

    return NextResponse.json({
      success: true,
      config,
    });
  } catch (error) {
    console.error('Get maintenance config error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/maintenance
 *
 * Update maintenance mode configuration
 *
 * Request body:
 * {
 *   enabled: boolean,
 *   message?: string,
 *   estimatedEndTime?: string
 * }
 */
export async function PUT(request: NextRequest) {
  try {
    // TODO: Add admin authentication check
    // const isAdmin = await checkAdminAuth(request);
    // if (!isAdmin) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const { enabled, message, estimatedEndTime } = body;

    if (typeof enabled !== 'boolean') {
      return NextResponse.json(
        { error: 'enabled field is required and must be boolean' },
        { status: 400 }
      );
    }

    let success: boolean;

    if (enabled) {
      success = enableMaintenanceMode(message, estimatedEndTime);
    } else {
      success = disableMaintenanceMode();
    }

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update maintenance configuration' },
        { status: 500 }
      );
    }

    const config = loadMaintenanceConfig();

    return NextResponse.json({
      success: true,
      message: enabled
        ? 'Maintenance mode enabled'
        : 'Maintenance mode disabled',
      config,
    });
  } catch (error) {
    console.error('Update maintenance config error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
