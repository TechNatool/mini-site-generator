/**
 * API Route pour la gestion des paramètres IA
 */

import { NextRequest, NextResponse } from 'next/server';
import { loadAISettings, saveAISettings, type AISettings } from '@/lib/config';
import type { AIProvider } from '@/lib/ai-provider';

export const runtime = 'nodejs';

/**
 * GET /api/admin/ai-settings
 * Récupère les paramètres IA actuels
 */
export async function GET() {
  try {
    console.log('[Admin API] GET /api/admin/ai-settings');

    // Charger les paramètres depuis le fichier
    const settings = await loadAISettings();

    // Si pas de fichier, retourner les valeurs par défaut depuis l'environnement
    if (!settings) {
      const defaultProvider: AIProvider =
        process.env.NO_AI === 'true'
          ? 'none'
          : (process.env.AI_PROVIDER as AIProvider) ?? 'claude';

      return NextResponse.json({
        success: true,
        provider: defaultProvider,
        model: process.env.LOCAL_AI_MODEL ?? 'deepseek-coder-v2',
        source: 'environment',
      });
    }

    return NextResponse.json({
      success: true,
      provider: settings.provider,
      model: settings.model ?? 'deepseek-coder-v2',
      source: 'config-file',
    });
  } catch (error) {
    console.error('[Admin API] Error loading AI settings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load AI settings',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/ai-settings
 * Sauvegarde les paramètres IA
 */
export async function PUT(request: NextRequest) {
  try {
    console.log('[Admin API] PUT /api/admin/ai-settings');

    const body = await request.json();
    const { provider, model } = body;

    // Validation
    if (!provider || !['claude', 'local', 'none'].includes(provider)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid provider. Must be "claude", "local", or "none"',
        },
        { status: 400 }
      );
    }

    // Préparer les paramètres à sauvegarder
    const settings: AISettings = {
      provider: provider as AIProvider,
    };

    // Ajouter le modèle si provider = local
    if (provider === 'local' && model) {
      settings.model = model;
    }

    // Sauvegarder dans le fichier
    await saveAISettings(settings);

    console.log(`[Admin API] Saved AI settings: provider=${provider}`);

    return NextResponse.json({
      success: true,
      message: 'AI settings saved successfully',
      provider: settings.provider,
      model: settings.model,
    });
  } catch (error) {
    console.error('[Admin API] Error saving AI settings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save AI settings',
      },
      { status: 500 }
    );
  }
}
