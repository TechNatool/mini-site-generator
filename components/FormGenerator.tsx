'use client';

import { useState } from 'react';
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
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

      {/* Résultat */}
      {error && (
        <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-600 rounded">
          <p className="text-red-700 font-medium">Erreur</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      {result && result.success && (
        <div className="mt-8 p-6 bg-green-50 border-l-4 border-green-600 rounded">
          <h3 className="text-lg font-semibold text-green-900 mb-4">
            Site généré avec succès !
          </h3>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-green-700 font-medium">ID du site :</p>
              <p className="text-sm text-green-900 font-mono">{result.clientId}</p>
            </div>

            {result.zipUrl && (
              <div>
                <a
                  href={result.zipUrl}
                  download
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors"
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Télécharger le site (ZIP)
                </a>
              </div>
            )}

            {result.previewUrl && (
              <div>
                <a
                  href={result.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-semibold rounded hover:bg-primary-700 transition-colors"
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
                  Prévisualiser le site
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
