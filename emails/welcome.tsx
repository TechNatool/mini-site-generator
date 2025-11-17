import * as React from 'react';

interface WelcomeEmailProps {
  name: string;
  loginUrl?: string;
}

export const WelcomeEmail = ({ name, loginUrl = 'https://forgeweb.io/dashboard' }: WelcomeEmailProps) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '3px solid #2563eb' }}>
        <h1 style={{ color: '#2563eb', margin: '0', fontSize: '28px', fontWeight: 'bold' }}>
          ForgeWeb
        </h1>
        <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '14px' }}>
          Générateur de sites web professionnels
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '40px 20px' }}>
        <h2 style={{ color: '#1e293b', fontSize: '24px', marginBottom: '20px' }}>
          Bienvenue sur ForgeWeb, {name}! 👋
        </h2>

        <p style={{ color: '#475569', fontSize: '16px', marginBottom: '15px' }}>
          Nous sommes ravis de vous accueillir dans la communauté ForgeWeb.
        </p>

        <p style={{ color: '#475569', fontSize: '16px', marginBottom: '15px' }}>
          Votre compte a été créé avec succès. Vous pouvez maintenant :
        </p>

        <ul style={{ color: '#475569', fontSize: '16px', marginBottom: '25px', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>✨ Générer des sites web professionnels en quelques clics</li>
          <li style={{ marginBottom: '8px' }}>🎨 Personnaliser vos designs avec nos templates</li>
          <li style={{ marginBottom: '8px' }}>🚀 Déployer automatiquement sur Vercel</li>
          <li style={{ marginBottom: '8px' }}>📊 Suivre vos statistiques et performances</li>
        </ul>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href={loginUrl}
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
            Accéder à mon dashboard
          </a>
        </div>

        <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px', marginTop: '30px' }}>
          <h3 style={{ color: '#1e293b', fontSize: '18px', marginTop: '0' }}>
            🎯 Prochaines étapes
          </h3>
          <ol style={{ color: '#475569', fontSize: '14px', paddingLeft: '20px', marginBottom: '0' }}>
            <li style={{ marginBottom: '8px' }}>Complétez votre profil dans les paramètres</li>
            <li style={{ marginBottom: '8px' }}>Suivez le guide d'onboarding pour créer votre premier site</li>
            <li style={{ marginBottom: '8px' }}>Explorez nos templates et choisissez votre préféré</li>
          </ol>
        </div>

        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '30px' }}>
          Besoin d'aide ? Consultez notre <a href="https://forgeweb.io/docs" style={{ color: '#2563eb' }}>documentation</a> ou contactez notre support.
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
          <span style={{ color: '#cbd5e1' }}>•</span>
          <a href="https://forgeweb.io/legal/ai-disclaimer" style={{ color: '#64748b', textDecoration: 'none', margin: '0 8px' }}>
            Avertissement IA
          </a>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '10px' }}>
          &copy; {new Date().getFullYear()} ForgeWeb. Tous droits réservés.
        </p>
      </div>
    </div>
  </div>
);

export default WelcomeEmail;
