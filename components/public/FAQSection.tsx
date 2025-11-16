'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Comment fonctionne le générateur de sites ?",
    answer: "Vous remplissez un formulaire simple avec les informations de votre entreprise. Notre IA génère ensuite automatiquement un site complet de 6 pages avec du contenu optimisé SEO, des images, et tout le nécessaire pour être en ligne en quelques minutes."
  },
  {
    question: "Quels types d'entreprises peuvent utiliser le service ?",
    answer: "Le service est parfait pour les artisans (plombiers, électriciens, maçons, etc.), les PME, les professions libérales, et toute entreprise locale ayant besoin d'une présence web professionnelle rapidement."
  },
  {
    question: "Puis-je personnaliser le site généré ?",
    answer: "Oui, vous pouvez régénérer le site avec différentes options, modifier les couleurs, le contenu, et même éditer directement le HTML généré. Le dashboard vous donne un contrôle total."
  },
  {
    question: "Le déploiement est-il vraiment automatique ?",
    answer: "Oui, grâce au module AutoDeploy, votre site peut être déployé automatiquement sur Vercel, Netlify ou d'autres plateformes en un clic. Vous recevez immédiatement une URL publique."
  },
  {
    question: "Le SEO est-il vraiment optimisé ?",
    answer: "Absolument. Le module SEO Boost génère automatiquement les meta tags, structured data (schema.org), sitemap, et optimise le contenu pour les moteurs de recherche. Vous obtenez un score SEO élevé dès le départ."
  },
  {
    question: "Combien de sites puis-je créer ?",
    answer: "Cela dépend de votre plan. Le plan Starter permet 5 sites, le plan Pro 20 sites, et le plan Business permet des sites illimités. Vous pouvez toujours mettre à niveau votre plan."
  },
  {
    question: "Les images sont-elles générées par l'IA ?",
    answer: "Oui, le module Auto-Images AI peut générer des images pertinentes pour votre site via DALL-E 3 ou Stable Diffusion. Vous pouvez aussi utiliser vos propres images."
  },
  {
    question: "Puis-je gérer plusieurs clients ?",
    answer: "Oui, le système multi-utilisateurs vous permet de créer des comptes pour vos clients ou collaborateurs, chacun avec ses propres sites et permissions. Parfait pour les agences web."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-xl text-gray-600">
            Tout ce que vous devez savoir sur le Mini Site Generator
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-blue-600 transform transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Vous avez d'autres questions ?</p>
          <a
            href="mailto:support@mini-site-generator.com"
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
          >
            Contactez-nous
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
