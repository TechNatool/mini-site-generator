'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isOnboardingComplete, getOnboardingProgress } from '@/lib/onboarding-store';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    sitesThisMonth: 3,
    totalSites: 12,
    deploymentsThisWeek: 2,
  });

  const [recentSites, setRecentSites] = useState([
    { id: '1', name: 'Plomberie Dupont', status: 'deployed', createdAt: '2025-11-15' },
    { id: '2', name: 'Électricité Pro', status: 'ready', createdAt: '2025-11-14' },
    { id: '3', name: 'Maçonnerie Expert', status: 'generating', createdAt: '2025-11-13' },
  ]);

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingProgress, setOnboardingProgress] = useState(0);

  // Mock user ID - in real app, get from auth
  const userId = 'user-123';

  useEffect(() => {
    const complete = isOnboardingComplete(userId);
    const progress = getOnboardingProgress(userId);

    setShowOnboarding(!complete);
    setOnboardingProgress(progress);
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
          <p className="text-gray-600">Bienvenue ! Voici un aperçu de votre activité.</p>
        </div>

        {/* Onboarding Card */}
        {showOnboarding && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">🚀 Complétez votre profil</h2>
                <p className="mb-4 opacity-90">
                  Terminez la configuration pour créer votre premier site en quelques minutes.
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex-1 bg-white bg-opacity-20 rounded-full h-2 mr-4">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-300"
                      style={{ width: `${onboardingProgress}%` }}
                    />
                  </div>
                  <span className="font-medium">{onboardingProgress}%</span>
                </div>
                <Link
                  href="/dashboard/onboarding"
                  className="inline-block px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                >
                  Continuer l'onboarding
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Sites ce mois-ci</p>
                <p className="text-3xl font-bold text-gray-900">{stats.sitesThisMonth}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🌐</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <span className="text-green-600 font-medium">↑ 25%</span>
                <span className="text-gray-500 ml-2">vs mois dernier</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total de sites</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalSites}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <span className="text-gray-500">Depuis votre inscription</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Déploiements</p>
                <p className="text-3xl font-bold text-gray-900">{stats.deploymentsThisWeek}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <span className="text-gray-500">Cette semaine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200">
                <span className="text-xl">✨</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Créer un site</p>
                <p className="text-sm text-gray-500">Nouveau projet</p>
              </div>
            </Link>

            <Link
              href="/templates"
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200">
                <span className="text-xl">🎨</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Templates</p>
                <p className="text-sm text-gray-500">Parcourir les modèles</p>
              </div>
            </Link>

            <Link
              href="/docs"
              className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition-all group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200">
                <span className="text-xl">📚</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Documentation</p>
                <p className="text-sm text-gray-500">Guides et tutoriels</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Sites */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Sites récents</h2>
            <Link href="/dashboard/sites" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Voir tout →
            </Link>
          </div>

          <div className="space-y-3">
            {recentSites.map((site) => (
              <div
                key={site.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-lg">🌐</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{site.name}</p>
                    <p className="text-sm text-gray-500">{site.createdAt}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      site.status === 'deployed'
                        ? 'bg-green-100 text-green-800'
                        : site.status === 'ready'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {site.status === 'deployed' ? '✓ Déployé' : site.status === 'ready' ? '📦 Prêt' : '⏳ En cours'}
                  </span>

                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Card */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Besoin d'aide ?</h3>
              <p className="text-gray-600 mb-4">Consultez notre documentation ou contactez notre support.</p>
              <div className="flex space-x-4">
                <Link
                  href="/docs"
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Documentation
                </Link>
                <Link
                  href="/support"
                  className="px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-white font-medium transition-colors"
                >
                  Support
                </Link>
              </div>
            </div>
            <div className="text-6xl">💡</div>
          </div>
        </div>
      </div>
    </div>
  );
}
