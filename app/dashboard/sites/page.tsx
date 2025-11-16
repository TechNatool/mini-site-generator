'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { SiteEntry } from '@/lib/sites-store';

export default function SitesListPage() {
  const [sites, setSites] = useState<SiteEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'generated' | 'deployed'>('all');

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await fetch('/api/sites');
      const data = await response.json();

      if (data.success) {
        setSites(data.sites);
      }
    } catch (error) {
      console.error('Error fetching sites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this site?')) {
      return;
    }

    try {
      const response = await fetch(`/api/sites/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSites(sites.filter((s) => s.id !== id));
      }
    } catch (error) {
      console.error('Error deleting site:', error);
      alert('Failed to delete site');
    }
  };

  const filteredSites = sites.filter((site) => {
    if (filter === 'generated') return site.generation.success;
    if (filter === 'deployed') return site.deployment.url !== null;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading sites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Sites</h1>
            <p className="mt-2 text-gray-600">
              Manage all your generated mini-sites ({filteredSites.length} total)
            </p>
          </div>
          <Link
            href="/dashboard/sites/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create New Site
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All ({sites.length})
            </button>
            <button
              onClick={() => setFilter('generated')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === 'generated'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Generated ({sites.filter((s) => s.generation.success).length})
            </button>
            <button
              onClick={() => setFilter('deployed')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === 'deployed'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Deployed ({sites.filter((s) => s.deployment.url).length})
            </button>
          </div>
        </div>

        {/* Sites Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {filteredSites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No sites found.</p>
              <Link
                href="/dashboard/sites/new"
                className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Create your first site →
              </Link>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Site
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deployment
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSites.map((site) => (
                  <tr key={site.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/sites/${site.id}`} className="hover:text-blue-600">
                        <div className="text-sm font-medium text-gray-900">{site.inputs.name}</div>
                        <div className="text-sm text-gray-500">{site.inputs.activity}</div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(site.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          site.generation.success
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {site.generation.success ? 'Success' : 'Failed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {site.deployment.url ? (
                        <a
                          href={site.deployment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-xs"
                        >
                          {site.deployment.provider}
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">Not deployed</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link
                        href={`/dashboard/sites/${site.id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </Link>
                      {site.generation.zipPath && (
                        <a
                          href={site.generation.zipPath}
                          download
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Download
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(site.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-6">
          <Link href="/dashboard" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
