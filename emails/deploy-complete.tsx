import * as React from 'react';

interface DeployCompleteEmailProps {
  name: string;
  siteName: string;
  deployUrl: string;
  deploymentId?: string;
  deployTime?: string;
}

export const DeployCompleteEmail = ({
  name,
  siteName,
  deployUrl,
  deploymentId,
  deployTime = 'quelques secondes',
}: DeployCompleteEmailProps) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '3px solid #2563eb' }}>
        <h1 style={{ color: '#2563eb', margin: '0', fontSize: '28px', fontWeight: 'bold' }}>
          ForgeWeb
        </h1>
        <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '14px' }}>
          Déploiement réussi !
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🚀</div>
          <h2 style={{ color: '#1e293b', fontSize: '24px', margin: '0' }}>
            Votre site est en ligne !
          </h2>
        </div>

        <p style={{ color: '#475569', fontSize: '16px', marginBottom: '15px' }}>
          Bonjour {name},
        </p>

        <p style={{ color: '#475569', fontSize: '16px', marginBottom: '25px' }}>
          Excellente nouvelle ! Votre site <strong>{siteName}</strong> a été déployé avec succès sur Vercel et est maintenant accessible au monde entier.
        </p>

        <div style={{ backgroundColor: '#10b981', color: '#ffffff', padding: '20px', borderRadius: '8px', marginBottom: '25px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 15px 0', fontSize: '14px', opacity: '0.9' }}>
            🌐 Votre site est accessible à l'adresse :
          </p>
          <a
            href={deployUrl}
            style={{
              color: '#ffffff',
              fontSize: '18px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              wordBreak: 'break-all',
            }}
          >
            {deployUrl}
          </a>
        </div>

        {/* Deployment Details */}
        <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
          <h3 style={{ color: '#1e293b', fontSize: '16px', marginTop: '0', marginBottom: '15px' }}>
            📊 Détails du déploiement
          </h3>
          <table style={{ width: '100%', fontSize: '14px', color: '#475569' }}>
            <tr>
              <td style={{ padding: '5px 0' }}><strong>Statut :</strong></td>
              <td style={{ padding: '5px 0', color: '#10b981' }}>✅ Déployé</td>
            </tr>
            {deploymentId && (
              <tr>
                <td style={{ padding: '5px 0' }}><strong>ID Déploiement :</strong></td>
                <td style={{ padding: '5px 0', fontFamily: 'monospace', fontSize: '12px' }}>{deploymentId}</td>
              </tr>
            )}
            <tr>
              <td style={{ padding: '5px 0' }}><strong>Temps de build :</strong></td>
              <td style={{ padding: '5px 0' }}>{deployTime}</td>
            </tr>
            <tr>
              <td style={{ padding: '5px 0' }}><strong>Plateforme :</strong></td>
              <td style={{ padding: '5px 0' }}>Vercel</td>
            </tr>
          </table>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href={deployUrl}
            style={{
              display: 'inline-block',
              padding: '14px 30px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            🌟 Voir mon site en ligne
          </a>
        </div>

        <div style={{ backgroundColor: '#dbeafe', padding: '15px', borderRadius: '8px', marginTop: '25px' }}>
          <p style={{ color: '#1e40af', fontSize: '14px', margin: '0', marginBottom: '10px' }}>
            💡 <strong>Prochaines étapes :</strong>
          </p>
          <ul style={{ color: '#1e40af', fontSize: '13px', margin: '0', paddingLeft: '20px' }}>
            <li>Configurez votre domaine personnalisé (optionnel)</li>
            <li>Activez les analytics pour suivre vos visiteurs</li>
            <li>Partagez votre site sur les réseaux sociaux</li>
            <li>Optimisez votre SEO pour le référencement</li>
          </ul>
        </div>

        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '30px' }}>
          Besoin d'aide ? Consultez notre <a href="https://forgeweb.io/docs/deploy" style={{ color: '#2563eb' }}>guide de déploiement</a> ou contactez notre support.
        </p>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #e2e8f0', padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '12px', marginBottom: '10px' }}>
          ForgeWeb - Générateur de sites web propulsé par IA
        </p>
        <div style={{ fontSize: '12px' }}>
          <a href="https://forgeweb.io/legal/privacy-policy" style={{ color: '#64748b', textDecoration: 'none', margin: '0 8px' }}>
            Confidentialité
          </a>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <a href="https://forgeweb.io/legal/terms" style={{ color: '#64748b', textDecoration: 'none', margin: '0 8px' }}>
            Conditions
          </a>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '10px' }}>
          &copy; {new Date().getFullYear()} ForgeWeb. Tous droits réservés.
        </p>
      </div>
    </div>
  </div>
);

export default DeployCompleteEmail;
