'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const [isReporting, setIsReporting] = useState(false);
  const [reportForm, setReportForm] = useState({
    subject: '',
    description: '',
    category: 'bug',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Mock user ID - in real app, get from auth
  const userId = 'user-123';

  // Mock recent errors for this user
  const recentErrors = [
    {
      id: '1',
      timestamp: '2025-11-17T10:30:00Z',
      message: 'Site generation failed: AI API timeout',
      resolved: false,
    },
    {
      id: '2',
      timestamp: '2025-11-16T15:45:00Z',
      message: 'Email delivery failed for verify-email',
      resolved: true,
    },
  ];

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!reportForm.subject || !reportForm.description) {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs' });
      return;
    }

    try {
      const response = await fetch('/api/support/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          ...reportForm,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Problème signalé avec succès. Notre équipe vous contactera bientôt.' });
        setReportForm({ subject: '', description: '', category: 'bug' });
        setIsReporting(false);
      } else {
        setMessage({ type: 'error', text: data.error || 'Erreur lors du signalement' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur de connexion au serveur' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Support & Assistance</h1>
          <p className="text-gray-600">Nous sommes là pour vous aider</p>
        </div>

        {/* Message Banner */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center">
              <span className="text-lg mr-2">{message.type === 'success' ? '✓' : '✗'}</span>
              <span>{message.text}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Errors */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Dernières erreurs liées à votre compte
              </h2>

              {recentErrors.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="text-gray-600">Aucune erreur récente détectée</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentErrors.map((error) => (
                    <div
                      key={error.id}
                      className="flex items-start p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="text-sm font-mono text-gray-500">
                            {new Date(error.timestamp).toLocaleString('fr-FR')}
                          </span>
                          {error.resolved && (
                            <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Résolu
                            </span>
                          )}
                        </div>
                        <p className="text-gray-900">{error.message}</p>
                      </div>
                      <span className="text-2xl ml-4">
                        {error.resolved ? '✅' : '⚠️'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Report Problem */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Signaler un problème</h2>

              {!isReporting ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-6">
                    Vous rencontrez un bug ou un problème technique ?
                  </p>
                  <button
                    onClick={() => setIsReporting(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                  >
                    🐛 Signaler un problème
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitReport} className="space-y-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                      Catégorie
                    </label>
                    <select
                      id="category"
                      value={reportForm.category}
                      onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="bug">🐛 Bug technique</option>
                      <option value="feature">💡 Demande de fonctionnalité</option>
                      <option value="question">❓ Question</option>
                      <option value="other">📝 Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={reportForm.subject}
                      onChange={(e) => setReportForm({ ...reportForm, subject: e.target.value })}
                      placeholder="Résumé du problème en quelques mots"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={reportForm.description}
                      onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                      placeholder="Décrivez le problème en détail, les étapes pour le reproduire, etc."
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                    >
                      Envoyer le rapport
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsReporting(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Liens utiles</h3>
              <div className="space-y-3">
                <Link
                  href="/docs"
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <span className="text-2xl mr-3">📚</span>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600">Documentation</p>
                    <p className="text-sm text-gray-500">Guides et tutoriels</p>
                  </div>
                </Link>

                <Link
                  href="/docs/getting-started"
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <span className="text-2xl mr-3">🚀</span>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600">Démarrage rapide</p>
                    <p className="text-sm text-gray-500">Guide étape par étape</p>
                  </div>
                </Link>

                <Link
                  href="/legal/ai-disclaimer"
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <span className="text-2xl mr-3">⚠️</span>
                  <div>
                    <p className="font-medium text-gray-900 group-hover:text-blue-600">Avertissement IA</p>
                    <p className="text-sm text-gray-500">Limitations de l'IA</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Support direct</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-blue-800 font-medium">Email</p>
                  <a href="mailto:support@forgeweb.io" className="text-blue-600 hover:underline">
                    support@forgeweb.io
                  </a>
                </div>
                <div>
                  <p className="text-blue-800 font-medium">Temps de réponse</p>
                  <p className="text-blue-700">Sous 24h en semaine</p>
                </div>
                <div>
                  <p className="text-blue-800 font-medium">Horaires</p>
                  <p className="text-blue-700">Lun-Ven: 9h-18h (CET)</p>
                </div>
              </div>
            </div>

            {/* FAQ Highlight */}
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">💡 Le saviez-vous ?</h3>
              <p className="text-sm text-purple-700 mb-4">
                La plupart des problèmes ont déjà une solution dans notre documentation.
              </p>
              <Link
                href="/docs"
                className="text-sm text-purple-600 font-medium hover:underline"
              >
                Consulter la FAQ →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
