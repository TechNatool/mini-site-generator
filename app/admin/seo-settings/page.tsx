'use client';

import { useEffect, useState } from 'react';

type SEOTone = 'professional' | 'friendly' | 'sales' | 'local' | 'minimalist' | 'longform';

interface SEOSettings {
  enabled: boolean;
  tone: SEOTone;
  keywords: string[];
  source?: string;
}

export default function SEOSettingsPage() {
  const [settings, setSettings] = useState<SEOSettings>({
    enabled: false,
    tone: 'professional',
    keywords: [],
  });
  const [keywordsInput, setKeywordsInput] = useState('');
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
      const response = await fetch('/api/admin/seo-settings');
      const data = await response.json();

      if (data.settings) {
        setSettings({
          enabled: data.settings.enabled,
          tone: data.settings.tone,
          keywords: data.settings.keywords || [],
          source: data.source,
        });
        setKeywordsInput((data.settings.keywords || []).join(', '));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage({ type: 'error', text: 'Failed to load SEO settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      // Parser les keywords depuis le champ texte
      const keywords = keywordsInput
        .split(',')
        .map((kw) => kw.trim())
        .filter((kw) => kw.length > 0);

      const response = await fetch('/api/admin/seo-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enabled: settings.enabled,
          tone: settings.tone,
          keywords,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'SEO settings saved successfully!' });
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

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset SEO settings to default?')) {
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/admin/seo-settings', {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'SEO settings reset to default!' });
        await loadSettings();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to reset settings' });
      }
    } catch (error) {
      console.error('Error resetting settings:', error);
      setMessage({ type: 'error', text: 'Failed to reset settings' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading SEO settings...</p>
        </div>
      </div>
    );
  }

  const toneDescriptions = {
    professional: 'Formal and expert tone. Appropriate technical vocabulary.',
    friendly: 'Warm, accessible and friendly tone. Use "vous" and be welcoming.',
    sales: 'Persuasive and sales-oriented tone. Highlights benefits and urgency.',
    local: 'Local and proximity tone. Emphasizes neighborhood service.',
    minimalist: 'Concise and clean tone. Short sentences, straight to the point.',
    longform: 'Detailed and comprehensive tone. Develop arguments, provide context.',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SEO Boost Settings</h1>
          <p className="mt-2 text-gray-600">
            Configure SEO optimization and content tone for generated sites
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
            {/* Enable SEO Boost */}
            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enabled}
                  onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Enable SEO Boost</div>
                  <div className="text-sm text-gray-500">
                    Apply AI-powered post-processing to optimize content for SEO
                  </div>
                </div>
              </label>
            </div>

            {/* Tone Selection */}
            <div className={!settings.enabled ? 'opacity-50 pointer-events-none' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-3">Content Tone</label>
              <div className="space-y-2">
                {Object.entries(toneDescriptions).map(([tone, description]) => (
                  <label
                    key={tone}
                    className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="tone"
                      value={tone}
                      checked={settings.tone === tone}
                      onChange={(e) =>
                        setSettings({ ...settings, tone: e.target.value as SEOTone })
                      }
                      disabled={!settings.enabled}
                      className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 capitalize">{tone}</div>
                      <div className="text-sm text-gray-500">{description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className={!settings.enabled ? 'opacity-50 pointer-events-none' : ''}>
              <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                Target Keywords
              </label>
              <input
                type="text"
                id="keywords"
                value={keywordsInput}
                onChange={(e) => setKeywordsInput(e.target.value)}
                disabled={!settings.enabled}
                placeholder="plombier paris, dépannage urgent, artisan qualifié"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              />
              <p className="mt-1 text-sm text-gray-500">
                Comma-separated list of keywords to naturally integrate in the content
              </p>
            </div>

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
              <button
                onClick={handleReset}
                disabled={saving}
                className="px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">ℹ️ How SEO Boost Works</h3>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li>SEO optimization is applied AFTER initial content generation</li>
            <li>Uses the same AI provider (Claude or Local AI) for consistency</li>
            <li>
              If <code className="bg-blue-100 px-1 rounded">NO_AI=true</code>, SEO Boost is
              automatically disabled
            </li>
            <li>Content structure is preserved, only text is improved</li>
            <li>SEO score is calculated and logged for each generation</li>
          </ul>
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
