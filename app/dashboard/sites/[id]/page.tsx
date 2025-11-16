'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { SiteEntry } from '@/lib/sites-store';

export default function SiteDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [site, setSite] = useState<SiteEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [deploying, setDeploying] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchSite();
  }, [id]);

  const fetchSite = async () => {
    try {
      const response = await fetch(`/api/sites/${id}`);
      const data = await response.json();

      if (data.success) {
        setSite(data.site);
      }
    } catch (error) {
      console.error('Error fetching site:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!confirm('Are you sure you want to regenerate this site? This will overwrite existing content.')) {
      return;
    }

    setRegenerating(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/sites/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ options: {} }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Site regenerated successfully!' });
        await fetchSite();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to regenerate site' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error regenerating site' });
    } finally {
      setRegenerating(false);
    }
  };

  const handleDeploy = async () => {
    setDeploying(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/sites/${id}/deploy`, {
        method: 'POST',
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: `Site deployed successfully to ${data.deployment.provider}!` });
        await fetchSite();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to deploy site' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error deploying site' });
    } finally {
      setDeploying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading site...</p>
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-red-600">Site not found</p>
          <Link href="/dashboard/sites" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            ← Back to sites
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/dashboard/sites" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            ← Back to sites
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{site.inputs.name}</h1>
          <p className="mt-1 text-gray-600">{site.inputs.activity} - {site.inputs.city}</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Actions */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRegenerate}
              disabled={regenerating}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {regenerating ? 'Regenerating...' : 'Regenerate Site'}
            </button>
            <button
              onClick={handleDeploy}
              disabled={deploying}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {deploying ? 'Deploying...' : 'Deploy Site'}
            </button>
            {site.generation.zipPath && (
              <a
                href={site.generation.zipPath}
                download
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Download ZIP
              </a>
            )}
            {site.deployment.url && (
              <a
                href={site.deployment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                View Deployed Site
              </a>
            )}
          </div>
        </div>

        {/* Site Info */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
          {/* Generation Status */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Generation Status</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Status:</dt>
                <dd className={`font-medium ${site.generation.success ? 'text-green-600' : 'text-red-600'}`}>
                  {site.generation.success ? 'Success' : 'Failed'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Created:</dt>
                <dd>{new Date(site.createdAt).toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Last Updated:</dt>
                <dd>{new Date(site.updatedAt).toLocaleString()}</dd>
              </div>
            </dl>
          </div>

          {/* Deployment Status */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Deployment Status</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Provider:</dt>
                <dd>{site.deployment.provider || 'Not deployed'}</dd>
              </div>
              {site.deployment.url && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">URL:</dt>
                  <dd className="truncate max-w-xs">
                    <a href={site.deployment.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      {site.deployment.url}
                    </a>
                  </dd>
                </div>
              )}
              {site.deployment.timestamp && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Last Deployed:</dt>
                  <dd>{new Date(site.deployment.timestamp).toLocaleString()}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* Logs */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Logs</h2>

          {/* Generation Logs */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Generation Logs</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
              <pre className="text-xs font-mono whitespace-pre-wrap">
                {site.generation.logs.join('\n')}
              </pre>
            </div>
          </div>

          {/* Deployment Logs */}
          {site.deployment.logs.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Deployment Logs</h3>
              <div className="space-y-2">
                {site.deployment.logs.map((log, i) => (
                  <div key={i} className={`p-3 rounded-md text-sm ${log.status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <div className="flex justify-between">
                      <span className="font-medium">{log.provider}</span>
                      <span className="text-xs">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="mt-1 text-xs">{log.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
