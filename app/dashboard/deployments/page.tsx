'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { SiteEntry } from '@/lib/sites-store';

interface DeploymentWithSite {
  timestamp: string;
  provider: string;
  status: 'success' | 'error';
  message: string;
  siteId: string;
  siteName: string;
}

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<DeploymentWithSite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeployments();
  }, []);

  const fetchDeployments = async () => {
    try {
      const response = await fetch('/api/sites');
      const data = await response.json();

      if (data.success) {
        // Extract all deployment logs from all sites
        const allDeployments: DeploymentWithSite[] = [];

        data.sites.forEach((site: SiteEntry) => {
          site.deployment.logs.forEach((log) => {
            allDeployments.push({
              ...log,
              siteId: site.id,
              siteName: site.inputs.name || site.id,
            });
          });
        });

        // Sort by timestamp descending
        allDeployments.sort((a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );

        setDeployments(allDeployments);
      }
    } catch (error) {
      console.error('Error fetching deployments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading deployments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Deployment History</h1>
          <p className="mt-2 text-gray-600">
            View all deployment activity across your sites ({deployments.length} total)
          </p>
        </div>

        {/* Deployments List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {deployments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No deployments yet.</p>
              <p className="text-sm text-gray-400 mt-2">
                Deploy a site to see deployment history here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {deployments.map((deployment, index) => (
                <div key={index} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            deployment.status === 'success'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {deployment.status === 'success' ? 'Success' : 'Failed'}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {deployment.provider}
                        </span>
                      </div>

                      <Link
                        href={`/dashboard/sites/${deployment.siteId}`}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800 block"
                      >
                        {deployment.siteName}
                      </Link>

                      <p className="mt-1 text-sm text-gray-600">{deployment.message}</p>

                      <p className="mt-2 text-xs text-gray-500">
                        {new Date(deployment.timestamp).toLocaleString()}
                      </p>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <Link
                        href={`/dashboard/sites/${deployment.siteId}`}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Site →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
