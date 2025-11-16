'use client';

import { useEffect, useState } from 'react';

type DeployProvider = 'netlify' | 'vercel' | 'ftp' | 'local';

interface DeploySettings {
  provider: DeployProvider;
  netlify?: {
    apiToken: string;
    siteId: string;
  };
  vercel?: {
    apiToken: string;
    projectId: string;
    teamId?: string;
  };
  ftp?: {
    host: string;
    port: number;
    username: string;
    password: string;
    remotePath: string;
    secure: boolean;
  };
  local?: {
    outputPath: string;
  };
  source?: string;
}

export default function DeploySettingsPage() {
  const [settings, setSettings] = useState<DeploySettings>({
    provider: 'local',
    local: {
      outputPath: './out/sites',
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/deploy-settings');
      const data = await response.json();

      if (data.settings) {
        setSettings({
          ...data.settings,
          source: data.source,
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage({ type: 'error', text: 'Failed to load deploy settings' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/admin/deploy-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: settings.provider,
          netlify: settings.netlify,
          vercel: settings.vercel,
          ftp: settings.ftp,
          local: settings.local,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Deploy settings saved successfully!' });
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
    if (!confirm('Are you sure you want to reset deploy settings to default?')) {
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/admin/deploy-settings', {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Deploy settings reset to default!' });
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
          <p className="mt-4 text-gray-600">Loading deploy settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Deploy Settings</h1>
          <p className="mt-2 text-gray-600">
            Configure automatic deployment for generated mini-sites
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
                Deploy Provider
              </label>
              <div className="space-y-3">
                {/* Netlify */}
                <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="provider"
                    value="netlify"
                    checked={settings.provider === 'netlify'}
                    onChange={(e) =>
                      setSettings({ ...settings, provider: e.target.value as DeployProvider })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Netlify</div>
                    <div className="text-sm text-gray-500">
                      Deploy to Netlify - Easy and fast
                    </div>
                  </div>
                </label>

                {/* Vercel */}
                <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="provider"
                    value="vercel"
                    checked={settings.provider === 'vercel'}
                    onChange={(e) =>
                      setSettings({ ...settings, provider: e.target.value as DeployProvider })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Vercel</div>
                    <div className="text-sm text-gray-500">
                      Deploy to Vercel - Optimized for Next.js
                    </div>
                  </div>
                </label>

                {/* FTP */}
                <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="provider"
                    value="ftp"
                    checked={settings.provider === 'ftp'}
                    onChange={(e) =>
                      setSettings({ ...settings, provider: e.target.value as DeployProvider })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">FTP/SFTP</div>
                    <div className="text-sm text-gray-500">
                      Deploy via FTP to your own server
                    </div>
                  </div>
                </label>

                {/* Local */}
                <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="provider"
                    value="local"
                    checked={settings.provider === 'local'}
                    onChange={(e) =>
                      setSettings({ ...settings, provider: e.target.value as DeployProvider })
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">Local Export</div>
                    <div className="text-sm text-gray-500">
                      Export files to local filesystem
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Netlify Configuration */}
            {settings.provider === 'netlify' && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Netlify Configuration</h3>
                <div>
                  <label htmlFor="netlify-token" className="block text-sm font-medium text-gray-700 mb-2">
                    API Token
                  </label>
                  <input
                    type="password"
                    id="netlify-token"
                    value={settings.netlify?.apiToken || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        netlify: { ...settings.netlify!, apiToken: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Netlify API token"
                  />
                </div>
                <div>
                  <label htmlFor="netlify-siteid" className="block text-sm font-medium text-gray-700 mb-2">
                    Site ID
                  </label>
                  <input
                    type="text"
                    id="netlify-siteid"
                    value={settings.netlify?.siteId || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        netlify: { ...settings.netlify!, siteId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Netlify site ID"
                  />
                </div>
              </div>
            )}

            {/* Vercel Configuration */}
            {settings.provider === 'vercel' && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Vercel Configuration</h3>
                <div>
                  <label htmlFor="vercel-token" className="block text-sm font-medium text-gray-700 mb-2">
                    API Token
                  </label>
                  <input
                    type="password"
                    id="vercel-token"
                    value={settings.vercel?.apiToken || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        vercel: { ...settings.vercel!, apiToken: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Vercel API token"
                  />
                </div>
                <div>
                  <label htmlFor="vercel-projectid" className="block text-sm font-medium text-gray-700 mb-2">
                    Project ID
                  </label>
                  <input
                    type="text"
                    id="vercel-projectid"
                    value={settings.vercel?.projectId || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        vercel: { ...settings.vercel!, projectId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Vercel project ID"
                  />
                </div>
                <div>
                  <label htmlFor="vercel-teamid" className="block text-sm font-medium text-gray-700 mb-2">
                    Team ID (Optional)
                  </label>
                  <input
                    type="text"
                    id="vercel-teamid"
                    value={settings.vercel?.teamId || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        vercel: { ...settings.vercel!, teamId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Vercel team ID (if applicable)"
                  />
                </div>
              </div>
            )}

            {/* FTP Configuration */}
            {settings.provider === 'ftp' && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">FTP/SFTP Configuration</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="ftp-host" className="block text-sm font-medium text-gray-700 mb-2">
                      Host
                    </label>
                    <input
                      type="text"
                      id="ftp-host"
                      value={settings.ftp?.host || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          ftp: { ...settings.ftp!, host: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="ftp.example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="ftp-port" className="block text-sm font-medium text-gray-700 mb-2">
                      Port
                    </label>
                    <input
                      type="number"
                      id="ftp-port"
                      value={settings.ftp?.port || 21}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          ftp: { ...settings.ftp!, port: parseInt(e.target.value) || 21 },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="21"
                    />
                  </div>
                  <div>
                    <label className="flex items-center h-full pt-8">
                      <input
                        type="checkbox"
                        checked={settings.ftp?.secure || false}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            ftp: { ...settings.ftp!, secure: e.target.checked },
                          })
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Use SFTP (Secure)</span>
                    </label>
                  </div>
                  <div>
                    <label htmlFor="ftp-username" className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="ftp-username"
                      value={settings.ftp?.username || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          ftp: { ...settings.ftp!, username: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="username"
                    />
                  </div>
                  <div>
                    <label htmlFor="ftp-password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="ftp-password"
                      value={settings.ftp?.password || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          ftp: { ...settings.ftp!, password: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="password"
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="ftp-remotepath" className="block text-sm font-medium text-gray-700 mb-2">
                      Remote Path
                    </label>
                    <input
                      type="text"
                      id="ftp-remotepath"
                      value={settings.ftp?.remotePath || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          ftp: { ...settings.ftp!, remotePath: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="/public_html"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Local Configuration */}
            {settings.provider === 'local' && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900">Local Export Configuration</h3>
                <div>
                  <label htmlFor="local-path" className="block text-sm font-medium text-gray-700 mb-2">
                    Output Path
                  </label>
                  <input
                    type="text"
                    id="local-path"
                    value={settings.local?.outputPath || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        local: { outputPath: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="./out/sites"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Local directory where sites will be exported
                  </p>
                </div>
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
          <h3 className="text-sm font-medium text-blue-900 mb-2">ℹ️ Deployment Providers</h3>
          <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
            <li><strong>Netlify:</strong> Fast and reliable hosting with automatic SSL</li>
            <li><strong>Vercel:</strong> Optimized for Next.js and modern web apps</li>
            <li><strong>FTP/SFTP:</strong> Deploy to your own server or shared hosting</li>
            <li><strong>Local:</strong> Export files to your local filesystem for manual upload</li>
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
