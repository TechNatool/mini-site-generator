'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Language } from '@/types/generator';

export default function NewSitePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    activity: 'plombier',
    city: '',
    services: [''],
    contact: {
      email: '',
      phone: '',
    },
    colors: {
      primary: '#0ea5e9',
      secondary: '#d946ef',
    },
    style: 'modern' as const,
    template: 'default',
    languages: ['fr'] as Language[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, options: {} }),
      });

      const data = await response.json();

      if (data.success) {
        router.push(`/dashboard/sites/${data.id}`);
      } else {
        setError(data.error || 'Failed to create site');
      }
    } catch (err) {
      setError('Error creating site');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/sites" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            ← Back to sites
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Create New Site</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-md">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Activity *</label>
              <select
                value={formData.activity}
                onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="plombier">Plumber</option>
                <option value="électricien">Electrician</option>
                <option value="maçon">Mason</option>
                <option value="menuisier">Carpenter</option>
                <option value="peintre">Painter</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Service *</label>
              <input
                type="text"
                required
                value={formData.services[0]}
                onChange={(e) => setFormData({ ...formData, services: [e.target.value] })}
                placeholder="e.g., Emergency repairs"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                required
                value={formData.contact.email}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone *</label>
              <input
                type="tel"
                required
                value={formData.contact.phone}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Template</h2>
            <p className="text-sm text-gray-600 mb-4">Select a professional template optimized for your activity</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'default', name: 'Classique', color: '#0ea5e9', category: 'General' },
                { value: 'electrician', name: 'Électricien', color: '#eab308', category: 'Artisan' },
                { value: 'plumber', name: 'Plombier', color: '#06b6d4', category: 'Artisan' },
                { value: 'coach', name: 'Coach', color: '#f59e0b', category: 'Wellness' },
                { value: 'psychologist', name: 'Psychologue', color: '#8b5cf6', category: 'Wellness' },
                { value: 'lawyer', name: 'Avocat', color: '#1e293b', category: 'Professional' },
              ].map((template) => (
                <button
                  key={template.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, template: template.value })}
                  className={`relative p-4 border-2 rounded-lg text-left transition-all ${
                    formData.template === template.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-xs text-gray-500">{template.category}</p>
                    </div>
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: template.color }}
                    />
                  </div>
                  {formData.template === template.value && (
                    <div className="absolute top-2 right-2">
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              href="/dashboard/sites"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Site'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
