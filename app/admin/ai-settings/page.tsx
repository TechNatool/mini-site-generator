'use client';

import { useEffect, useState } from 'react';

type AIProvider = 'claude' | 'local' | 'none';

interface AISettings {
  provider: AIProvider;
  model: string;
  source?: string;
}

export default function AISettingsPage() {
  const [settings, setSettings] = useState<AISettings>({
    provider: 'claude',
    model: 'deepseek-coder-v2',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Charger les paramètres actuels
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/ai-settings');
      const data = await response.json();

      if (data.success) {
        setSettings({
          provider: data.provider,
          model: data.model,
          source: data.source,
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage({ type: 'error', text: 'Failed to load AI settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/admin/ai-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: settings.provider,
          model: settings.model,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Settings saved successfully!' });
        // Recharger pour afficher la source
        await loadSettings();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save settings' });
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading AI settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Settings</h1>
          <p className="mt-2 text-gray-600">
            Configure which AI provider to use for site generation
          </p>
          {settings.source && (
            <p className="mt-1 text-sm text-gray-500">
              Current source: <span className="font-medium">{settings.source}</span>
            </p>
          )}
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            {/* Provider Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                AI Provider
              </label>
              <div className="space-y-3">
                {/* Claude */}
                <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="provider"
                    value="claude"
                    checked={settings.provider === 'claude'}
                    onChange={(e) =>
                      setSettings({ ...settings, provider: e.target.value as AIProvider })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Claude (Premium)</div>
                    <div className="text-sm text-gray-500">
                      Anthropic Claude API - Best quality, requires API key and credits
                    </div>
                  </div>
                </label>

                {/* Local AI */}
                <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="provider"
                    value="local"
                    checked={settings.provider === 'local'}
                    onChange={(e) =>
                      setSettings({ ...settings, provider: e.target.value as AIProvider })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Local AI (DeepSeek/Ollama)
                    </div>
                    <div className="text-sm text-gray-500">
                      Run AI locally via Ollama - Free, requires Ollama installation
                    </div>
                  </div>
                </label>

                {/* No AI */}
                <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="provider"
                    value="none"
                    checked={settings.provider === 'none'}
                    onChange={(e) =>
                      setSettings({ ...settings, provider: e.target.value as AIProvider })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">No AI (Fallback)</div>
                    <div className="text-sm text-gray-500">
                      Generic content - No AI calls, fast and free
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Model Selection (for local AI) */}
            {settings.provider === 'local' && (
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Local AI Model
                </label>
                <input
                  type="text"
                  id="model"
                  value={settings.model}
                  onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                  placeholder="deepseek-coder-v2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Model name as configured in Ollama (e.g., deepseek-coder-v2, llama2)
                </p>
              </div>
            )}

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-md ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800'
                    : 'bg-red-50 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
              <button
                onClick={loadSettings}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Reload
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">ℹ️ Priority Order</h3>
          <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
            <li>
              If <code className="bg-blue-100 px-1 rounded">NO_AI=true</code>, fallback mode is
              always used
            </li>
            <li>Otherwise, settings from this admin panel are used</li>
            <li>
              If no admin settings, environment variable{' '}
              <code className="bg-blue-100 px-1 rounded">AI_PROVIDER</code> is used
            </li>
            <li>Default: Claude</li>
          </ol>
        </div>

        {/* Back Link */}
        <div className="mt-6">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
