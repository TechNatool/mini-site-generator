'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { FormData, ActivityType, SiteStyle, GenerateSiteResponse } from '@/types';

const ACTIVITIES: ActivityType[] = [
  'plombier',
  'électricien',
  'maçon',
  'menuisier',
  'peintre',
  'carreleur',
  'chauffagiste',
  'couvreur',
  'serrurier',
  'autre',
];

const COMMON_SERVICES: Record<ActivityType, string[]> = {
  plombier: [
    'Dépannage urgence',
    'Installation sanitaire',
    'Réparation fuite',
    'Débouchage',
    'Chauffage',
  ],
  électricien: [
    'Installation électrique',
    'Dépannage',
    'Mise aux normes',
    'Tableau électrique',
    'Éclairage',
  ],
  maçon: ['Construction', 'Rénovation', 'Extension', 'Terrasse', 'Muret'],
  menuisier: ['Fenêtres', 'Portes', 'Placards', 'Agencement', 'Parquet'],
  peintre: ['Peinture intérieure', 'Peinture extérieure', 'Revêtements', 'Décoration', 'Enduit'],
  carreleur: ['Carrelage sol', 'Carrelage mural', 'Faïence', 'Terrasse', 'Rénovation'],
  chauffagiste: [
    'Installation chaudière',
    'Entretien',
    'Dépannage',
    'Climatisation',
    'Pompe à chaleur',
  ],
  couvreur: ['Toiture', 'Réparation', 'Démoussage', 'Isolation', 'Gouttières'],
  serrurier: ['Dépannage urgence', 'Changement serrure', 'Blindage', 'Clés', 'Portes'],
  autre: [],
};

export default function FormGenerator() {
  const [formData, setFormData] = useState<Partial<FormData>>({
    activity: 'plombier',
    style: 'modern',
    languages: ['fr'],
    services: [],
    colors: {
      primary: '#0ea5e9',
      secondary: '#d946ef',
    },
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateSiteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/generate-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          options: {
            generateImages: false,
            autoDeployVercel: false,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la génération');
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceToggle = (service: string) => {
    const services = formData.services || [];
    if (services.includes(service)) {
      setFormData({ ...formData, services: services.filter((s) => s !== service) });
    } else {
      setFormData({ ...formData, services: [...services, service] });
    }
  };

  const suggestedServices =
    formData.activity && formData.activity !== 'autre'
      ? COMMON_SERVICES[formData.activity as ActivityType]
      : [];

  const resetForm = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* État de chargement avec overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <svg
                  className="animate-spin h-16 w-16 text-primary-600"
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
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Génération du site en cours...
              </h3>
              <p className="text-gray-600 mb-4">
                Notre IA crée votre site web professionnel
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Génération du contenu SEO...
                </p>
                <p className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Création des pages HTML...
                </p>
                <p className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Préparation du fichier ZIP...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations de base */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de base</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom / Raison sociale *
              </label>
              <input
                type="text"
                id="name"
                required
                className="input-field"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jean Dupont"
              />
            </div>

            <div>
              <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-2">
                Activité *
              </label>
              <select
                id="activity"
                required
                className="input-field"
                value={formData.activity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    activity: e.target.value as ActivityType,
                    services: [], // Reset services
                  })
                }
              >
                {ACTIVITIES.map((activity) => (
                  <option key={activity} value={activity}>
                    {activity.charAt(0).toUpperCase() + activity.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                Ville *
              </label>
              <input
                type="text"
                id="city"
                required
                className="input-field"
                value={formData.city || ''}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="Paris"
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                Code postal
              </label>
              <input
                type="text"
                id="zipCode"
                className="input-field"
                value={formData.zipCode || ''}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                placeholder="75001"
              />
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Services proposés *</h2>
          <p className="text-sm text-gray-600 mb-4">
            Sélectionnez les services que vous proposez (minimum 1)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestedServices.map((service) => (
              <label
                key={service}
                className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.services?.includes(service)
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <input
                  type="checkbox"
                  className="mr-3 h-4 w-4 text-primary-600 focus:ring-primary-600 border-gray-300 rounded"
                  checked={formData.services?.includes(service)}
                  onChange={() => handleServiceToggle(service)}
                />
                <span className="text-sm font-medium text-gray-900">{service}</span>
              </label>
            ))}
          </div>

          {formData.services && formData.services.length === 0 && (
            <p className="text-sm text-red-600 mt-2">Veuillez sélectionner au moins un service</p>
          )}
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Coordonnées de contact</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Téléphone *
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="input-field"
                value={formData.contact?.phone || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact!, phone: e.target.value },
                  })
                }
                placeholder="06 12 34 56 78"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                className="input-field"
                value={formData.contact?.email || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact!, email: e.target.value },
                  })
                }
                placeholder="contact@example.com"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse (optionnel)
              </label>
              <input
                type="text"
                id="address"
                className="input-field"
                value={formData.contact?.address || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact!, address: e.target.value },
                  })
                }
                placeholder="123 Rue de la Paix"
              />
            </div>
          </div>
        </div>

        {/* Personnalisation */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Personnalisation</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                Style du site *
              </label>
              <select
                id="style"
                required
                className="input-field"
                value={formData.style}
                onChange={(e) => setFormData({ ...formData, style: e.target.value as SiteStyle })}
              >
                <option value="modern">Moderne</option>
                <option value="classic">Classique</option>
                <option value="minimal">Minimaliste</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="primaryColor"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Couleur principale *
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  id="primaryColor"
                  className="h-12 w-20 rounded border border-gray-300 cursor-pointer"
                  value={formData.colors?.primary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      colors: { ...formData.colors!, primary: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  className="input-field"
                  value={formData.colors?.primary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      colors: { ...formData.colors!, primary: e.target.value },
                    })
                  }
                  placeholder="#0ea5e9"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description (optionnel) */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description de votre activité (optionnel)
          </label>
          <textarea
            id="description"
            rows={4}
            className="input-field"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Décrivez brièvement votre activité, votre expérience, vos spécialités..."
          />
        </div>

        {/* Bouton de soumission */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading || !formData.services || formData.services.length === 0}
            className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
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
                Génération en cours...
              </>
            ) : (
              'Générer mon site web'
            )}
          </button>
        </div>
      </form>

      {/* Message d'erreur amélioré */}
      {error && (
        <div className="mt-8 animate-fadeIn">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-red-900 mb-1">
                  Erreur lors de la génération
                </h3>
                <p className="text-red-700">{error}</p>
                <button
                  onClick={resetForm}
                  className="mt-4 text-sm font-medium text-red-600 hover:text-red-800 underline"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Carte de succès améliorée */}
      {result && result.success && (
        <div className="mt-8 animate-fadeIn">
          {/* Carte de confirmation avec infos principales */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-8 mb-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Site généré avec succès !
              </h3>
              <p className="text-gray-600">
                Votre site web professionnel est prêt à être téléchargé
              </p>
            </div>

            {/* Résumé des informations */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Résumé du site généré
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Nom</p>
                  <p className="font-semibold text-gray-900">{formData.name}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Activité</p>
                  <p className="font-semibold text-gray-900 capitalize">{formData.activity}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Ville</p>
                  <p className="font-semibold text-gray-900">{formData.city}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">ID du site :</span>
                  <code className="px-3 py-1 bg-gray-100 rounded font-mono text-xs text-gray-800">
                    {result.clientId}
                  </code>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="space-y-3">
              {result.zipUrl && (
                <a
                  href={result.zipUrl}
                  download
                  className="w-full flex items-center justify-center px-6 py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Télécharger mon site (ZIP)
                </a>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link
                  href={`/preview/${result.clientId}`}
                  className="flex items-center justify-center px-4 py-3 bg-white border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Prévisualiser
                </Link>

                <button
                  onClick={resetForm}
                  className="flex items-center justify-center px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Créer un nouveau site
                </button>
              </div>

              {result.vercelUrl && (
                <a
                  href={result.vercelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 19.5h20L12 2z" />
                  </svg>
                  Voir sur Vercel
                </a>
              )}
            </div>

            {/* Informations supplémentaires */}
            <div className="mt-6 pt-6 border-t border-green-200">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">Votre site contient :</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>6 pages complètes (Accueil, À propos, Services, Tarifs, Contact, Mentions légales)</li>
                    <li>Contenu SEO optimisé et personnalisé</li>
                    <li>Design responsive et moderne</li>
                    <li>Fichiers prêts à déployer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
