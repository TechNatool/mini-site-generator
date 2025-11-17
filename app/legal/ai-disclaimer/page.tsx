import { Metadata } from 'next';
import LegalLayout from '@/components/layout/LegalLayout';

export const metadata: Metadata = {
  title: 'Avertissement IA - ForgeWeb',
  description: 'Limitations et responsabilités concernant le contenu généré par intelligence artificielle',
  robots: 'noindex, nofollow',
};

export default function AIDisclaimerPage() {
  return (
    <LegalLayout
      title="Avertissement IA"
      subtitle="Limitations et responsabilités du contenu généré par IA"
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

        {/* Introduction critique */}
        <section className="mb-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-bold text-red-800 mb-2">AVERTISSEMENT CRITIQUE</h3>
                <p className="text-sm text-red-700 font-medium">
                  <strong>{'{COMPANY_NAME}'}</strong> (ForgeWeb) utilise l&apos;intelligence artificielle pour générer du contenu web.
                  <strong> VOUS ÊTES ENTIÈREMENT RESPONSABLE de la vérification, modification et validation de tout contenu généré avant publication.</strong>
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Nature du service basé sur l&apos;IA</h2>
          <p className="mb-4">
            ForgeWeb utilise des modèles d&apos;intelligence artificielle, notamment <strong>Claude d&apos;Anthropic</strong>, pour générer automatiquement le contenu de sites web (textes, structures, métadonnées).
          </p>
          <p className="mb-4">
            <strong>Comprendre l&apos;IA générative :</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>L&apos;IA génère du contenu basé sur des modèles statistiques et des patterns appris</li>
            <li>Le contenu est créé de manière probabiliste, pas déterministe</li>
            <li>Les résultats peuvent varier pour des requêtes similaires</li>
            <li>L&apos;IA ne &quot;comprend&quot; pas le contenu au sens humain</li>
            <li>L&apos;IA peut produire des erreurs, inexactitudes ou contenus inappropriés</li>
          </ul>
        </section>

        {/* Limitations et risques */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Limitations et risques connus</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Exactitude et fiabilité</h3>
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>⚠️ AUCUNE GARANTIE D&apos;EXACTITUDE</strong></p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Informations erronées :</strong> L&apos;IA peut générer des faits incorrects, dates erronées, ou statistiques inventées (&quot;hallucinations&quot;)</li>
              <li><strong>Contenus obsolètes :</strong> Les modèles d&apos;IA ont une date limite de connaissance et peuvent ignorer des événements récents</li>
              <li><strong>Contexte local :</strong> L&apos;IA peut ne pas connaître les spécificités locales, régionales ou sectorielles</li>
              <li><strong>Réglementations :</strong> L&apos;IA peut ignorer des lois, normes ou réglementations spécifiques à votre activité ou région</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Propriété intellectuelle</h3>
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>⚠️ RISQUE DE SIMILARITÉ</strong></p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Contenu similaire :</strong> L&apos;IA peut générer du contenu similaire à des textes existants protégés par copyright</li>
              <li><strong>Formulations courantes :</strong> Certaines phrases peuvent ressembler à du contenu publié ailleurs</li>
              <li><strong>Responsabilité :</strong> VOUS devez vérifier l&apos;originalité du contenu avant publication</li>
              <li><strong>Outils recommandés :</strong> Utilisez des détecteurs de plagiat (Copyscape, Grammarly, etc.)</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Biais et représentations</h3>
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>⚠️ BIAIS POTENTIELS</strong></p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Biais culturels :</strong> L&apos;IA peut refléter des biais présents dans ses données d&apos;entraînement</li>
              <li><strong>Stéréotypes :</strong> Risque de contenus stéréotypés ou non inclusifs</li>
              <li><strong>Généralités :</strong> L&apos;IA peut utiliser des généralités qui ne s&apos;appliquent pas à votre cas spécifique</li>
              <li><strong>Tonalité :</strong> Le ton peut ne pas correspondre à votre image de marque</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.4 Conformité légale et réglementaire</h3>
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>🚨 CRITIQUE : AUCUNE GARANTIE DE CONFORMITÉ</strong></p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong>Lois locales :</strong> L&apos;IA ne connaît pas toutes les réglementations spécifiques à votre pays/région</li>
              <li><strong>Secteurs réglementés :</strong> Attention particulière pour la santé, finance, juridique, immobilier, etc.</li>
              <li><strong>Mentions obligatoires :</strong> L&apos;IA peut omettre des mentions légales obligatoires</li>
              <li><strong>RGPD et vie privée :</strong> Vérifiez la conformité des mentions de confidentialité générées</li>
              <li><strong>Publicité trompeuse :</strong> Vérifiez que les promesses ne sont pas exagérées ou mensongères</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2.5 Qualité et cohérence</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Variabilité :</strong> La qualité du contenu peut varier d&apos;une génération à l&apos;autre</li>
            <li><strong>Cohérence :</strong> Des incohérences peuvent apparaître entre différentes sections</li>
            <li><strong>Style :</strong> Le style peut ne pas correspondre parfaitement à votre marque</li>
            <li><strong>Longueur :</strong> Certaines sections peuvent être trop courtes ou trop longues</li>
          </ul>
        </section>

        {/* Responsabilités de l'utilisateur */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Vos responsabilités</h2>

          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-bold text-blue-900 mb-2">EN UTILISANT FORGEWEB, VOUS ACCEPTEZ QUE :</h3>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Vérification obligatoire</h3>
          <p className="mb-4">
            <strong>Vous DEVEZ :</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>✅ <strong>Vérifier l&apos;exactitude</strong> de tous les faits, chiffres, dates et informations</li>
            <li>✅ <strong>Relire et corriger</strong> l&apos;orthographe, grammaire, et style</li>
            <li>✅ <strong>Adapter le contenu</strong> à votre activité réelle et vos services spécifiques</li>
            <li>✅ <strong>Vérifier la conformité légale</strong> avec les lois applicables à votre secteur et région</li>
            <li>✅ <strong>Contrôler l&apos;originalité</strong> du contenu (détecteur de plagiat recommandé)</li>
            <li>✅ <strong>Valider les tarifs</strong> et informations commerciales</li>
            <li>✅ <strong>Personnaliser</strong> le contenu pour refléter votre identité de marque</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Modifications et personnalisation</h3>
          <p className="mb-4">
            <strong>Le contenu généré est un POINT DE DÉPART, pas un produit fini.</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Vous devez le considérer comme un brouillon nécessitant révision</li>
            <li>Modifiez, supprimez ou ajoutez du contenu selon vos besoins</li>
            <li>Faites relire par un tiers si possible</li>
            <li>Pour les secteurs réglementés : faites valider par un professionnel</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Responsabilité de publication</h3>
          <p className="mb-4">
            <strong className="text-red-600">VOUS ÊTES L&apos;UNIQUE RESPONSABLE :</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Du contenu final que vous publiez</li>
            <li>De sa conformité aux lois et réglementations</li>
            <li>De son exactitude et de sa véracité</li>
            <li>De tout dommage causé par du contenu inexact, trompeur ou illégal</li>
            <li>Du respect des droits de propriété intellectuelle de tiers</li>
          </ul>
        </section>

        {/* Limitation de responsabilité */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation de responsabilité de ForgeWeb</h2>

          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong className="text-red-800">DISCLAIMER IMPORTANT :</strong></p>
            <p className="text-sm text-red-700">
              ForgeWeb et ses fournisseurs d&apos;IA (Anthropic Claude) <strong>NE SONT PAS RESPONSABLES</strong> :
            </p>
          </div>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>❌ Des erreurs, inexactitudes ou omissions dans le contenu généré</li>
            <li>❌ Des violations de droits d&apos;auteur ou de propriété intellectuelle</li>
            <li>❌ De la non-conformité du contenu aux lois et réglementations applicables</li>
            <li>❌ Des pertes financières résultant de l&apos;utilisation du contenu généré</li>
            <li>❌ Des poursuites judiciaires ou réclamations de tiers</li>
            <li>❌ Des dommages à la réputation causés par du contenu inapproprié</li>
            <li>❌ De tout dommage direct, indirect, spécial ou consécutif</li>
          </ul>

          <p className="mt-4 mb-4">
            <strong>En d&apos;autres termes :</strong> L&apos;IA est un OUTIL d&apos;assistance, pas un substitut au jugement humain, à la vérification professionnelle ou au conseil juridique.
          </p>
        </section>

        {/* Cas d'usage déconseillés */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cas d&apos;usage déconseillés ou interdits</h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Déconseillé sans validation professionnelle</h3>
          <p className="mb-4">
            <strong>Utilisez avec EXTRÊME prudence pour :</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>⚠️ <strong>Santé et médical :</strong> Conseils de santé, descriptions de traitements</li>
            <li>⚠️ <strong>Juridique :</strong> Conseils juridiques, contrats, mentions légales</li>
            <li>⚠️ <strong>Finance :</strong> Conseils financiers, promesses de rendement</li>
            <li>⚠️ <strong>Secteurs réglementés :</strong> Immobilier, assurance, investissement</li>
            <li>⚠️ <strong>Sécurité :</strong> Instructions techniques critiques pour la sécurité</li>
          </ul>
          <p className="mb-4">
            <strong>→ Faites TOUJOURS valider par un professionnel qualifié</strong>
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Strictement interdit</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>🚫 Contenus illégaux, diffamatoires ou frauduleux</li>
            <li>🚫 Usurpation d&apos;identité ou fausses déclarations</li>
            <li>🚫 Publicité trompeuse ou mensongère</li>
            <li>🚫 Contenus haineux, discriminatoires ou offensants</li>
            <li>🚫 Violation de droits de propriété intellectuelle</li>
            <li>🚫 Manipulation ou désinformation délibérée</li>
          </ul>
        </section>

        {/* Bonnes pratiques */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Bonnes pratiques recommandées</h2>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-green-900 mb-2">✅ Checklist avant publication</h3>
            <ol className="list-decimal pl-6 space-y-2 text-sm">
              <li>□ J&apos;ai lu et vérifié l&apos;ensemble du contenu généré</li>
              <li>□ J&apos;ai corrigé les erreurs factuelles éventuelles</li>
              <li>□ J&apos;ai adapté le contenu à ma réalité professionnelle</li>
              <li>□ J&apos;ai vérifié la conformité légale de base (RGPD, mentions obligatoires)</li>
              <li>□ J&apos;ai contrôlé l&apos;originalité du contenu (anti-plagiat)</li>
              <li>□ J&apos;ai personnalisé le style et le ton</li>
              <li>□ J&apos;ai fait relire par un tiers ou un professionnel (si secteur réglementé)</li>
              <li>□ J&apos;ai vérifié que les coordonnées et informations de contact sont correctes</li>
              <li>□ J&apos;ai vérifié que les tarifs et conditions commerciales sont exacts</li>
              <li>□ Je comprends que je suis responsable du contenu final</li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Divulgation recommandée</h3>
          <p className="mb-4">
            <strong>Transparence :</strong> Considérez d&apos;informer vos visiteurs que le contenu a été assisté par IA (pas obligatoire, mais recommandé pour certains secteurs).
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Sauvegarde et itération</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Conservez plusieurs versions générées pour comparaison</li>
            <li>Combinez les meilleurs éléments de différentes générations</li>
            <li>Itérez progressivement vers la version finale</li>
          </ul>
        </section>

        {/* Propriété intellectuelle */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Propriété intellectuelle du contenu généré</h2>
          <p className="mb-4">
            <strong>Qui possède le contenu généré ?</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Vous :</strong> Une fois généré et téléchargé, le contenu vous appartient</li>
            <li><strong>Mais :</strong> L&apos;IA peut générer du contenu similaire pour d&apos;autres utilisateurs</li>
            <li><strong>Originalité :</strong> Pas de garantie d&apos;exclusivité ou d&apos;originalité absolue</li>
            <li><strong>Modifications :</strong> Vous êtes libre de modifier, adapter et utiliser le contenu</li>
          </ul>
          <p className="mb-4">
            <strong className="text-red-600">Important :</strong> Certaines juridictions ont des règles spécifiques sur la propriété intellectuelle du contenu généré par IA. Consultez un avocat si nécessaire.
          </p>
        </section>

        {/* Évolution et améliorations */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Évolution de la technologie IA</h2>
          <p className="mb-4">
            <strong>Les modèles d&apos;IA évoluent constamment :</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Nous mettons régulièrement à jour les modèles d&apos;IA utilisés</li>
            <li>Les performances peuvent s&apos;améliorer ou changer</li>
            <li>De nouvelles limitations peuvent être découvertes</li>
            <li>Nous nous réservons le droit de modifier les modèles IA sans préavis</li>
          </ul>
        </section>

        {/* Contact et signalement */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Signalement de problèmes</h2>
          <p className="mb-4">
            Si vous constatez des problèmes avec le contenu généré, contactez-nous :
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="mb-2"><strong>ForgeWeb - Signalement IA</strong></p>
            <p className="mb-2">Email : <a href="mailto:ai-safety@forgeweb.io" className="text-primary-600 hover:underline">ai-safety@forgeweb.io</a></p>
            <p className="mb-2">Objet : &quot;Problème contenu IA - [Description courte]&quot;</p>
            <p className="mt-3 text-sm text-gray-600">
              Signalements particulièrement utiles :
            </p>
            <ul className="list-disc pl-6 text-sm space-y-1 mt-2">
              <li>Contenus manifestement faux ou dangereux</li>
              <li>Biais graves ou discriminations</li>
              <li>Violations potentielles de droits d&apos;auteur</li>
              <li>Contenus inappropriés ou offensants</li>
            </ul>
          </div>
        </section>

        {/* Modifications */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications de cet avertissement</h2>
          <p className="mb-4">
            Nous pouvons mettre à jour cet avertissement pour refléter les évolutions de notre technologie IA, de nouvelles limitations découvertes, ou des changements réglementaires.
          </p>
          <p className="mb-4">
            Consultez régulièrement cette page. La date de dernière mise à jour est indiquée en haut.
          </p>
        </section>

        {/* Disclaimer final TRÈS fort */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800 font-bold mb-2">
                RÉSUMÉ CRITIQUE - LISEZ ATTENTIVEMENT
              </p>
              <p className="text-sm text-red-700 mb-3">
                L&apos;intelligence artificielle est un outil puissant mais IMPARFAIT. Elle peut se tromper, inventer des faits (&quot;halluciner&quot;), générer du contenu similaire à des œuvres existantes, ou produire du contenu non conforme aux réglementations.
              </p>
              <p className="text-sm text-red-700 mb-3">
                <strong>VOUS, et vous seul, êtes responsable du contenu final que vous publiez.</strong> ForgeWeb fournit un outil d&apos;assistance, pas un produit fini prêt à l&apos;emploi.
              </p>
              <p className="text-sm text-red-700 font-bold">
                ⚠️ Ce document est un modèle générique et ne constitue pas un avis juridique. Il DOIT être revu par un avocat spécialisé en propriété intellectuelle et droit de l&apos;IA avant toute utilisation commerciale. Les réglementations sur l&apos;IA évoluent rapidement dans le monde entier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </LegalLayout>
  );
}
