'use client';

import { useEffect, useState } from 'react';

type ImageProvider = 'claude' | 'local' | 'none';
type ImageFormat = 'webp' | 'jpg' | 'png';

interface ImageSettings {
  provider: ImageProvider;
  size: number;
  format: ImageFormat;
  quality: number;
  optimize: boolean;
  autoAltText: boolean;
  source?: string;
}

export default function ImageSettingsPage() {
  const [settings, setSettings] = useState<ImageSettings>({
    provider: 'none',
    size: 1080,
    format: 'webp',
    quality: 85,
    optimize: true,
    autoAltText: true,
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
      const response = await fetch('/api/admin/image-settings');
      const data = await response.json();

      if (data.settings) {
        setSettings({
          ...data.settings,
          source: data.source,
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage({ type: 'error', text: 'Failed to load image settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/admin/image-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: settings.provider,
          size: settings.size,
          format: settings.format,
          quality: settings.quality,
          optimize: settings.optimize,
          autoAltText: settings.autoAltText,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Image settings saved successfully!' });
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
    if (!confirm('Are you sure you want to reset image settings to default?')) {
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/admin/image-settings', {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Image settings reset to default!' });
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
          <p className="mt-4 text-gray-600">Loading image settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Auto-Images AI Settings</h1>
          <p className="mt-2 text-gray-600">
            Configure AI image generation, optimization, and alt-text for generated sites
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
                Image Generation Provider
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
                      setSettings({ ...settings, provider: e.target.value as ImageProvider })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Claude (Coming Soon)</div>
                    <div className="text-sm text-gray-500">
                      AI-generated images via Anthropic - Best quality (not yet available)
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
                      setSettings({ ...settings, provider: e.target.value as ImageProvider })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      Local AI (Stable Diffusion)
                    </div>
                    <div className="text-sm text-gray-500">
                      Run Stable Diffusion locally - Free, requires local server
                    </div>
                  </div>
                </label>

                {/* None (Placeholder) */}
                <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="provider"
                    value="none"
                    checked={settings.provider === 'none'}
                    onChange={(e) =>
                      setSettings({ ...settings, provider: e.target.value as ImageProvider })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      None (Placeholder Images)
                    </div>
                    <div className="text-sm text-gray-500">
                      SVG placeholder images - Fast and lightweight
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Image Size */}
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                Image Size: {settings.size}px
              </label>
              <input
                type="range"
                id="size"
                min="512"
                max="1920"
                step="128"
                value={settings.size}
                onChange={(e) => setSettings({ ...settings, size: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>512px</span>
                <span>720px</span>
                <span>1080px</span>
                <span>1920px</span>
              </div>
            </div>

            {/* Image Format */}
            <div>
              <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
                Image Format
              </label>
              <select
                id="format"
                value={settings.format}
                onChange={(e) =>
                  setSettings({ ...settings, format: e.target.value as ImageFormat })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="webp">WebP (Best compression)</option>
                <option value="jpg">JPEG (Universal compatibility)</option>
                <option value="png">PNG (Lossless quality)</option>
              </select>
            </div>

            {/* Quality */}
            <div>
              <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-2">
                Image Quality: {settings.quality}%
              </label>
              <input
                type="range"
                id="quality"
                min="1"
                max="100"
                step="5"
                value={settings.quality}
                onChange={(e) =>
                  setSettings({ ...settings, quality: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low (1%)</span>
                <span>Medium (50%)</span>
                <span>High (100%)</span>
              </div>
            </div>

            {/* Optimize Toggle */}
            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.optimize}
                  onChange={(e) => setSettings({ ...settings, optimize: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">Enable Image Optimization</div>
                  <div className="text-sm text-gray-500">
                    Compress, resize, and optimize images for web
                  </div>
                </div>
              </label>
            </div>

            {/* Auto Alt-Text Toggle */}
            <div>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoAltText}
                  onChange={(e) => setSettings({ ...settings, autoAltText: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">
                    Auto-Generate Alt Text
                  </div>
                  <div className="text-sm text-gray-500">
                    Automatically create SEO-friendly alt text for images
                  </div>
                </div>
              </label>
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
          <h3 className="text-sm font-medium text-blue-900 mb-2">ℹ️ How Auto-Images Work</h3>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li>Images are generated automatically for each page during site generation</li>
            <li>Optimization reduces file size while maintaining quality</li>
            <li>Alt text improves SEO and accessibility</li>
            <li>
              If <code className="bg-blue-100 px-1 rounded">NO_AI=true</code>, placeholder images are
              always used
            </li>
            <li>Local AI requires Stable Diffusion server running at localhost:7860</li>
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
