import { Metadata } from 'next';
import LegalLayout from '@/components/layout/LegalLayout';

export const metadata: Metadata = {
  title: 'Politique de confidentialité - ForgeWeb',
  description: 'Politique de confidentialité et protection des données personnelles',
  robots: 'noindex, nofollow',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      subtitle="Protection de vos données personnelles"
    >
      <div className="prose prose-gray max-w-none">
        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 font-medium">
                ⚠️ <strong>Document provisoire</strong> – Ce texte est fourni uniquement à titre informatif et n&apos;a pas encore été validé par un professionnel du droit.
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}
        </p>

        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p className="mb-4">
            <strong>{'{COMPANY_NAME}'}</strong> (ci-après &quot;ForgeWeb&quot;, &quot;nous&quot;, &quot;notre&quot;) exploite le site web <strong>{'{DOMAIN}'}</strong> (ci-après le &quot;Service&quot;).
          </p>
          <p className="mb-4">
            Cette page vous informe de nos politiques concernant la collecte, l&apos;utilisation et la divulgation de données personnelles lorsque vous utilisez notre Service.
          </p>
          <p className="mb-4">
            <strong className="text-red-600">IMPORTANT :</strong> En utilisant le Service, vous acceptez la collecte et l&apos;utilisation d&apos;informations conformément à cette politique. Cette politique doit être revue par un professionnel du droit avant tout usage commercial.
          </p>
        </section>

        {/* Données collectées */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Données collectées</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Données fournies directement</h3>
          <p className="mb-4">
            Lors de l&apos;utilisation de notre Service, nous pouvons vous demander de nous fournir certaines informations personnellement identifiables, notamment :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>Informations d&apos;entreprise (nom, secteur d&apos;activité, ville)</li>
            <li>Contenu généré par vos soins</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Données collectées automatiquement</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Données de navigation :</strong> adresse IP, type de navigateur, pages visitées, durée de visite</li>
            <li><strong>Cookies :</strong> voir notre <a href="/legal/cookies" className="text-primary-600 hover:underline">Politique cookies</a></li>
            <li><strong>Logs :</strong> horodatages, requêtes HTTP, erreurs système</li>
          </ul>
        </section>

        {/* Utilisation des données */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Utilisation des données</h2>
          <p className="mb-4">
            Nous utilisons les données collectées pour les finalités suivantes :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Fourniture du Service :</strong> génération de sites web, traitement des demandes</li>
            <li><strong>Amélioration du Service :</strong> analyse d&apos;utilisation, optimisation des performances</li>
            <li><strong>Communication :</strong> notifications, support client, informations importantes</li>
            <li><strong>Sécurité :</strong> détection de fraudes, prévention des abus</li>
            <li><strong>Conformité légale :</strong> respect des obligations réglementaires</li>
          </ul>
        </section>

        {/* Partage des données */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Partage des données</h2>
          <p className="mb-4">
            Nous ne vendons pas vos données personnelles. Nous pouvons partager vos données avec :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Fournisseurs de services :</strong> hébergement (Vercel), API d&apos;IA (Anthropic Claude), services d&apos;analyse</li>
            <li><strong>Autorités légales :</strong> si requis par la loi ou pour protéger nos droits</li>
            <li><strong>Transferts d&apos;entreprise :</strong> en cas de fusion, acquisition ou vente d&apos;actifs</li>
          </ul>
          <p className="mb-4">
            <strong className="text-red-600">AVERTISSEMENT :</strong> L&apos;utilisation de services tiers (comme l&apos;API Claude d&apos;Anthropic) implique le transfert de vos données à ces services. Consultez leurs politiques de confidentialité respectives.
          </p>
        </section>

        {/* Droits RGPD */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Vos droits (RGPD)</h2>
          <p className="mb-4">
            Si vous êtes résident de l&apos;Espace économique européen (EEE), vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données</li>
            <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
            <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
            <li><strong>Droit à la limitation :</strong> restreindre le traitement de vos données</li>
            <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
            <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
            <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
          </ul>
          <p className="mb-4">
            Pour exercer ces droits, contactez-nous à l&apos;adresse indiquée ci-dessous.
          </p>
        </section>

        {/* Sécurité */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sécurité des données</h2>
          <p className="mb-4">
            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Chiffrement des données en transit (HTTPS/TLS)</li>
            <li>Hébergement sécurisé sur infrastructure professionnelle</li>
            <li>Accès restreint aux données personnelles</li>
            <li>Surveillance et détection des incidents de sécurité</li>
          </ul>
          <p className="mb-4">
            <strong className="text-red-600">AVERTISSEMENT :</strong> Aucune méthode de transmission sur Internet ou de stockage électronique n&apos;est 100% sécurisée. Nous ne pouvons garantir une sécurité absolue.
          </p>
        </section>

        {/* Conservation */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Conservation des données</h2>
          <p className="mb-4">
            Nous conservons vos données personnelles uniquement aussi longtemps que nécessaire pour les finalités décrites dans cette politique :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Données de compte :</strong> durée de votre compte + 30 jours après suppression</li>
            <li><strong>Sites générés :</strong> 90 jours après création (sauf si vous les téléchargez)</li>
            <li><strong>Logs techniques :</strong> 12 mois maximum</li>
            <li><strong>Données légales :</strong> selon obligations légales (généralement 3-5 ans)</li>
          </ul>
        </section>

        {/* Transferts internationaux */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Transferts internationaux</h2>
          <p className="mb-4">
            Vos données peuvent être transférées et stockées sur des serveurs situés en dehors de votre pays de résidence, notamment :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>États-Unis :</strong> serveurs Vercel, API Anthropic Claude</li>
            <li><strong>Union européenne :</strong> serveurs de sauvegarde</li>
          </ul>
          <p className="mb-4">
            Nous nous assurons que des garanties appropriées sont en place conformément au RGPD (clauses contractuelles types, Privacy Shield, etc.).
          </p>
        </section>

        {/* Cookies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies et technologies similaires</h2>
          <p className="mb-4">
            Nous utilisons des cookies et technologies similaires. Pour plus d&apos;informations, consultez notre <a href="/legal/cookies" className="text-primary-600 hover:underline">Politique cookies</a>.
          </p>
        </section>

        {/* Mineurs */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Protection des mineurs</h2>
          <p className="mb-4">
            Notre Service n&apos;est pas destiné aux personnes de moins de 18 ans. Nous ne collectons pas sciemment de données personnelles auprès de mineurs. Si vous êtes parent ou tuteur et que vous découvrez que votre enfant nous a fourni des données personnelles, contactez-nous immédiatement.
          </p>
        </section>

        {/* Modifications */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications de cette politique</h2>
          <p className="mb-4">
            Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Nous vous informerons de tout changement en publiant la nouvelle politique sur cette page et en mettant à jour la date de &quot;Dernière mise à jour&quot;.
          </p>
          <p className="mb-4">
            Il vous est conseillé de consulter régulièrement cette politique pour tout changement. Les modifications entrent en vigueur dès leur publication.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact</h2>
          <p className="mb-4">
            Pour toute question concernant cette politique de confidentialité ou l&apos;exercice de vos droits, contactez-nous :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>ForgeWeb</strong></p>
            <p className="mb-2">Email : <a href="mailto:privacy@forgeweb.io" className="text-primary-600 hover:underline">privacy@forgeweb.io</a></p>
            <p className="mb-2">Site web : <a href="https://forgeweb.io" className="text-primary-600 hover:underline">https://forgeweb.io</a></p>
          </div>
        </section>

        {/* Disclaimer final */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 font-medium">
                <strong>AVERTISSEMENT LÉGAL :</strong> Ce document est un modèle générique et ne constitue pas un avis juridique. Il DOIT être revu et adapté par un avocat spécialisé en protection des données avant toute utilisation commerciale. ForgeWeb ne peut être tenu responsable de l&apos;inadéquation de ce document à votre situation spécifique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}
