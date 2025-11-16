'use client';

import { useState } from 'react';

interface DeployResult {
  success: boolean;
  provider: string;
  url?: string;
  details?: string;
  error?: string;
}

export default function DeployPage() {
  const [deploying, setDeploying] = useState(false);
  const [result, setResult] = useState<DeployResult | null>(null);

  const handleDeploy = async () => {
    try {
      setDeploying(true);
      setResult(null);

      const response = await fetch('/api/admin/deploy-site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error deploying site:', error);
      setResult({
        success: false,
        provider: 'unknown',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Deploy Mini-Site</h1>
          <p className="mt-2 text-gray-600">
            Deploy your generated mini-site to the configured provider
          </p>
        </div>

        {/* Deploy Action */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Ready to Deploy?</h2>
              <p className="text-sm text-gray-600 mb-4">
                This will deploy the mini-site using your configured deployment settings.
                Make sure you have configured your deployment provider in{' '}
                <a
                  href="/admin/deploy-settings"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Deploy Settings
                </a>
                .
              </p>

              <button
                onClick={handleDeploy}
                disabled={deploying}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {deploying ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deploying...
                  </span>
                ) : (
                  'Deploy Mini-Site'
                )}
              </button>
            </div>

            {/* Result Display */}
            {result && (
              <div
                className={`p-4 rounded-md ${
                  result.success
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    {result.success ? (
                      <svg
                        className="h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <h3
                      className={`text-sm font-medium ${
                        result.success ? 'text-green-800' : 'text-red-800'
                      }`}
                    >
                      {result.success ? 'Deployment Successful!' : 'Deployment Failed'}
                    </h3>
                    <div
                      className={`mt-2 text-sm ${
                        result.success ? 'text-green-700' : 'text-red-700'
                      }`}
                    >
                      <p>
                        <strong>Provider:</strong> {result.provider}
                      </p>
                      {result.url && (
                        <p className="mt-1">
                          <strong>URL:</strong>{' '}
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:no-underline"
                          >
                            {result.url}
                          </a>
                        </p>
                      )}
                      {result.details && (
                        <p className="mt-1">
                          <strong>Details:</strong> {result.details}
                        </p>
                      )}
                      {result.error && (
                        <p className="mt-1">
                          <strong>Error:</strong> {result.error}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h3>
          <div className="space-y-3">
            <a
              href="/admin/deploy-settings"
              className="block px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Deploy Settings</div>
                  <div className="text-sm text-gray-500">
                    Configure deployment provider and credentials
                  </div>
                </div>
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </a>

            <a
              href="/admin/ai-settings"
              className="block px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">AI Settings</div>
                  <div className="text-sm text-gray-500">Configure AI content generation</div>
                </div>
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </a>

            <a
              href="/admin/seo-settings"
              className="block px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">SEO Settings</div>
                  <div className="text-sm text-gray-500">Configure SEO optimization</div>
                </div>
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </a>

            <a
              href="/admin/image-settings"
              className="block px-4 py-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900">Image Settings</div>
                  <div className="text-sm text-gray-500">Configure image generation</div>
                </div>
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </a>
          </div>
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
