import type { Metadata } from 'next';
import LegalLayout from '@/components/layout/LegalLayout';

export const metadata: Metadata = {
  title: 'Avertissement IA - ForgeWeb',
  description: 'Avertissement et limitations concernant le contenu généré par intelligence artificielle.',
  robots: 'noindex, nofollow',
};

export default function AIDisclaimerPage() {
  return (
    <LegalLayout
      title="Avertissement IA"
      subtitle="Limitations et responsabilités du contenu généré par intelligence artificielle"
      lastUpdated="17 novembre 2025"
    >
      <div className="space-y-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <p className="text-red-800 font-semibold text-lg">
            ⚠️ AVERTISSEMENT IMPORTANT
          </p>
          <p className="text-red-700 mt-2">
            ForgeWeb utilise l'intelligence artificielle pour générer du contenu automatiquement.
            Ce contenu est créé par des algorithmes et <strong>n'est pas vérifié par des humains</strong>
            avant d'être fourni. Vous devez impérativement <strong>vérifier, corriger et valider</strong>
            tout contenu avant publication.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Nature du service IA</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">1.1 Technologie utilisée</h3>
          <p className="text-gray-700 mb-4">
            ForgeWeb utilise <strong>Claude AI</strong> (développé par Anthropic) pour :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Générer du contenu textuel pour vos pages web</li>
            <li>Créer des descriptions de services</li>
            <li>Rédiger des pages "À propos", "Contact", "Mentions légales"</li>
            <li>Optimiser le contenu pour le SEO</li>
            <li>Générer des prompts pour les images (si activé)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">1.2 Processus automatisé</h3>
          <p className="text-gray-700 mb-4">
            Le contenu est généré automatiquement en fonction :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Des informations que vous fournissez (nom, activité, services, etc.)</li>
            <li>De modèles et templates prédéfinis</li>
            <li>D'algorithmes d'intelligence artificielle</li>
            <li>De données d'entraînement de l'IA (jusqu'à janvier 2025)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Limitations et risques</h2>

          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-gray-900 mb-2">⚠️ Exactitude non garantie</h4>
              <p className="text-gray-700 text-sm">
                L'IA peut générer du contenu <strong>factuellement incorrect, obsolète ou inadapté</strong>
                à votre situation spécifique. Nous ne garantissons pas l'exactitude, la pertinence ou
                l'actualité du contenu généré.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-gray-900 mb-2">⚠️ Hallucinations possibles</h4>
              <p className="text-gray-700 text-sm">
                L'IA peut inventer des informations qui semblent plausibles mais sont totalement fausses
                (appelées "hallucinations"). Elle peut créer des noms, des chiffres, des références ou
                des faits inexistants.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-gray-900 mb-2">⚠️ Conformité légale non vérifiée</h4>
              <p className="text-gray-700 text-sm">
                Le contenu généré peut <strong>ne pas être conforme</strong> aux réglementations spécifiques
                de votre secteur d'activité, pays ou juridiction. Vous devez vérifier la conformité légale
                avant publication.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-gray-900 mb-2">⚠️ Biais potentiels</h4>
              <p className="text-gray-700 text-sm">
                L'IA peut reproduire des biais présents dans ses données d'entraînement (culturels,
                linguistiques, sociaux, etc.).
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-gray-900 mb-2">⚠️ Originalité non garantie</h4>
              <p className="text-gray-700 text-sm">
                Bien que l'IA génère du contenu nouveau, il peut ressembler à du contenu existant sur
                internet. Nous ne garantissons pas que le contenu soit 100% original ou unique.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-gray-900 mb-2">⚠️ Propriété intellectuelle</h4>
              <p className="text-gray-700 text-sm">
                Le contenu généré peut involontairement ressembler à des œuvres protégées par des
                droits d'auteur. Vous devez vérifier qu'il ne viole pas de droits de propriété intellectuelle.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Vos responsabilités</h2>

          <div className="bg-blue-50 p-6 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">En utilisant ForgeWeb, vous acceptez que :</h3>
            <ul className="text-gray-700 space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">1.</span>
                <span>
                  <strong>Vous êtes seul responsable</strong> du contenu publié sur vos sites,
                  qu'il soit généré par l'IA ou non.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">2.</span>
                <span>
                  Vous devez <strong>vérifier, corriger et valider</strong> tout contenu généré
                  avant publication.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">3.</span>
                <span>
                  Vous devez vous assurer que le contenu est <strong>conforme aux lois</strong>
                  applicables dans votre juridiction.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">4.</span>
                <span>
                  Vous devez vérifier que le contenu ne viole pas de <strong>droits de propriété
                  intellectuelle</strong>.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 font-bold">5.</span>
                <span>
                  Vous assumez tous les risques liés à l'utilisation du contenu généré par l'IA.
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation de responsabilité</h2>

          <div className="bg-red-50 border-2 border-red-300 p-6 rounded-lg mb-4">
            <h3 className="font-semibold text-red-900 mb-3 text-lg">
              CLAUSE ESSENTIELLE - LIMITATION DE RESPONSABILITÉ
            </h3>
            <p className="text-gray-800 mb-3">
              <strong>ForgeWeb décline toute responsabilité concernant :</strong>
            </p>
            <ul className="text-gray-800 space-y-2 list-disc pl-6">
              <li>
                L'exactitude, la véracité ou la pertinence du contenu généré par l'IA
              </li>
              <li>
                Les erreurs, omissions ou inexactitudes dans le contenu généré
              </li>
              <li>
                Les dommages directs ou indirects résultant de l'utilisation du contenu généré
              </li>
              <li>
                La violation de droits de propriété intellectuelle par le contenu généré
              </li>
              <li>
                La non-conformité du contenu aux lois ou réglementations applicables
              </li>
              <li>
                Les réclamations de tiers concernant le contenu publié sur vos sites
              </li>
              <li>
                Les pertes financières, commerciales ou de réputation liées au contenu
              </li>
            </ul>
          </div>

          <p className="text-gray-700">
            <strong>Vous acceptez d'indemniser et de dégager ForgeWeb de toute responsabilité</strong>
            pour toute réclamation, perte ou dommage résultant de votre utilisation du contenu généré
            par l'IA.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Recommandations d'utilisation</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Vérification du contenu</h3>
          <p className="text-gray-700 mb-4">
            Nous vous recommandons fortement de :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Lire attentivement tout le contenu généré</li>
            <li>Vérifier les faits, chiffres et informations</li>
            <li>Corriger les erreurs et inexactitudes</li>
            <li>Adapter le contenu à votre situation réelle</li>
            <li>Personnaliser le contenu pour refléter votre activité</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Validation professionnelle</h3>
          <p className="text-gray-700 mb-4">
            Pour certains secteurs, nous vous recommandons de faire <strong>valider le contenu par
            un professionnel</strong> avant publication :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Secteur médical :</strong> Validation par un médecin ou professionnel de santé</li>
            <li><strong>Secteur juridique :</strong> Validation par un avocat</li>
            <li><strong>Secteur financier :</strong> Validation par un expert-comptable ou conseiller</li>
            <li><strong>Secteur immobilier :</strong> Vérification de la conformité légale</li>
            <li><strong>Autres secteurs réglementés :</strong> Consultation d'un expert du domaine</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Usages interdits</h2>

          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <p className="text-gray-800 font-semibold mb-2">
              Il est strictement interdit d'utiliser l'IA de ForgeWeb pour générer :
            </p>
            <ul className="text-gray-800 space-y-2 list-disc pl-6 text-sm">
              <li>Du contenu illégal, diffamatoire, haineux ou discriminatoire</li>
              <li>Des diagnostics médicaux ou conseils de santé</li>
              <li>Des conseils juridiques ou financiers professionnels</li>
              <li>Des informations trompeuses ou frauduleuses</li>
              <li>Du contenu violant des droits de propriété intellectuelle</li>
              <li>Des déclarations officielles ou documents légaux sans validation</li>
              <li>Du contenu pornographique ou pour adultes</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Propriété du contenu généré</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Droits sur le contenu</h3>
          <p className="text-gray-700 mb-4">
            <strong>Vous conservez tous les droits</strong> sur le contenu généré pour vous par ForgeWeb.
            Vous êtes libre de :
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>Utiliser le contenu sans restriction</li>
            <li>Modifier, adapter ou personnaliser le contenu</li>
            <li>Publier le contenu sur vos sites</li>
            <li>Utiliser le contenu à des fins commerciales</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 Absence de garantie d'originalité</h3>
          <p className="text-gray-700">
            <strong>⚠️ Attention :</strong> Bien que vous ayez les droits d'utilisation, nous ne garantissons
            pas que le contenu est 100% original. L'IA peut générer du contenu similaire pour différents
            utilisateurs ou similaire à du contenu existant sur internet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Évolution du service</h2>

          <p className="text-gray-700 mb-4">
            Le service d'IA peut évoluer dans le temps :
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Changement de modèle IA (nouvelles versions de Claude)</li>
            <li>Amélioration des algorithmes</li>
            <li>Modification des templates</li>
            <li>Ajout ou retrait de fonctionnalités</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Ces évolutions peuvent affecter la qualité et le style du contenu généré.
            Nous ne garantissons pas la cohérence du style entre différentes versions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact et signalement</h2>

          <p className="text-gray-700 mb-4">
            Si vous constatez un problème avec le contenu généré :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">
              <strong>Email :</strong>{' '}
              <a href="mailto:support@forgeweb.io" className="text-blue-600 hover:underline">
                support@forgeweb.io
              </a>
            </p>
            <p className="text-gray-700 mt-2 text-sm">
              Merci d'inclure : votre compte, la description du problème, et si possible
              un exemple du contenu problématique.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Résumé - Points clés</h2>

          <div className="bg-blue-50 p-6 rounded-lg">
            <ul className="text-gray-800 space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Le contenu est généré automatiquement par IA (Claude)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span><strong>Aucune garantie</strong> d'exactitude ou de conformité</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Vous êtes <strong>seul responsable</strong> du contenu publié</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Vous devez <strong>vérifier et valider</strong> avant publication</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                <span>ForgeWeb <strong>décline toute responsabilité</strong> pour le contenu généré</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Faites valider par un professionnel si nécessaire</span>
              </li>
            </ul>
          </div>
        </section>

        <div className="bg-red-50 border-2 border-red-400 p-6 mt-8 rounded-lg">
          <p className="text-red-900 font-bold text-lg mb-2">
            ⚠️ AVERTISSEMENT FINAL
          </p>
          <p className="text-red-800">
            En utilisant ForgeWeb, vous reconnaissez avoir lu, compris et accepté cet avertissement.
            Vous comprenez les limitations de l'IA et acceptez l'entière responsabilité du contenu
            publié sur vos sites.
          </p>
          <p className="text-red-800 mt-3">
            <strong>L'utilisation de l'IA ne remplace pas</strong> le jugement humain, l'expertise
            professionnelle ou la validation légale.
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-8">
          <p className="text-sm text-yellow-700">
            <strong>📌 Rappel important :</strong> Cet avertissement est fourni à titre informatif.
            Il est fortement recommandé de faire valider ce document par un professionnel
            du droit spécialisé en IA avant toute utilisation commerciale.
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
