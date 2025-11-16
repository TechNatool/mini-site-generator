'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { SiteEntry } from '@/lib/sites-store';

interface Stats {
  totalSites: number;
  successfulGenerations: number;
  successfulDeployments: number;
  latestSites: SiteEntry[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/sites');
      const data = await response.json();

      if (data.success) {
        // Calculate stats from sites
        const sites = data.sites;
        const successfulGenerations = sites.filter((s: SiteEntry) => s.generation.success).length;
        const successfulDeployments = sites.filter((s: SiteEntry) =>
          s.deployment.logs.some((log) => log.status === 'success')
        ).length;

        // Get latest 5 sites
        const latestSites = sites
          .sort(
            (a: SiteEntry, b: SiteEntry) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 5);

        setStats({
          totalSites: sites.length,
          successfulGenerations,
          successfulDeployments,
          latestSites,
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your generated mini-sites</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Total Sites */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Sites</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{stats?.totalSites || 0}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Successful Generations */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Successful Generations</dt>
                    <dd className="text-3xl font-semibold text-gray-900">
                      {stats?.successfulGenerations || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Successful Deployments */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Successful Deployments</dt>
                    <dd className="text-3xl font-semibold text-gray-900">
                      {stats?.successfulDeployments || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/dashboard/sites/new"
              className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Site
            </Link>
            <Link
              href="/dashboard/sites"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View All Sites
            </Link>
            <Link
              href="/dashboard/deployments"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Deployment History
            </Link>
            <Link
              href="/admin/deploy-settings"
              className="flex items-center justify-center px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Settings
            </Link>
          </div>
        </div>

        {/* Latest Sites */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Latest Sites</h2>
            <Link href="/dashboard/sites" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all →
            </Link>
          </div>

          {stats?.latestSites && stats.latestSites.length > 0 ? (
            <div className="space-y-4">
              {stats.latestSites.map((site) => (
                <div key={site.id} className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <div className="flex-1">
                    <Link href={`/dashboard/sites/${site.id}`} className="hover:text-blue-600">
                      <h3 className="text-sm font-medium text-gray-900">{site.inputs.name || site.id}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Created: {new Date(site.createdAt).toLocaleDateString()}
                      </p>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        site.generation.success
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {site.generation.success ? 'Generated' : 'Failed'}
                    </span>
                    {site.deployment.url && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Deployed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No sites yet. Create your first site to get started!</p>
              <Link
                href="/dashboard/sites/new"
                className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Create New Site →
              </Link>
            </div>
          )}
        </div>

        {/* Admin Links */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Admin Settings</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/ai-settings"
              className="text-sm text-gray-700 hover:text-blue-600 hover:underline"
            >
              AI Settings →
            </Link>
            <Link
              href="/admin/seo-settings"
              className="text-sm text-gray-700 hover:text-blue-600 hover:underline"
            >
              SEO Settings →
            </Link>
            <Link
              href="/admin/image-settings"
              className="text-sm text-gray-700 hover:text-blue-600 hover:underline"
            >
              Image Settings →
            </Link>
            <Link
              href="/admin/deploy-settings"
              className="text-sm text-gray-700 hover:text-blue-600 hover:underline"
            >
              Deploy Settings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
