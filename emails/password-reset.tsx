import * as React from 'react';

interface PasswordResetEmailProps {
  name: string;
  resetUrl: string;
  expiryTime?: string;
}

export const PasswordResetEmail = ({
  name,
  resetUrl,
  expiryTime = '1 heure',
}: PasswordResetEmailProps) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '3px solid #2563eb' }}>
        <h1 style={{ color: '#2563eb', margin: '0', fontSize: '28px', fontWeight: 'bold' }}>
          ForgeWeb
        </h1>
        <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '14px' }}>
          Réinitialisation de mot de passe
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '40px 20px' }}>
        <h2 style={{ color: '#1e293b', fontSize: '24px', marginBottom: '20px' }}>
          Bonjour {name},
        </h2>

        <p style={{ color: '#475569', fontSize: '16px', marginBottom: '15px' }}>
          Vous avez demandé à réinitialiser votre mot de passe ForgeWeb. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.
        </p>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href={resetUrl}
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
            Réinitialiser mon mot de passe
          </a>
        </div>

        <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', padding: '15px', borderRadius: '8px', marginTop: '30px' }}>
          <p style={{ color: '#92400e', fontSize: '14px', margin: '0', marginBottom: '10px' }}>
            ⚠️ <strong>Important :</strong>
          </p>
          <ul style={{ color: '#92400e', fontSize: '13px', margin: '0', paddingLeft: '20px' }}>
            <li>Ce lien expire dans <strong>{expiryTime}</strong></li>
            <li>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email</li>
            <li>Votre mot de passe actuel reste valide jusqu'à ce que vous en créiez un nouveau</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#fee2e2', border: '1px solid #ef4444', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
          <p style={{ color: '#991b1b', fontSize: '14px', margin: '0' }}>
            🔒 <strong>Sécurité :</strong> Si vous n'avez pas demandé cette réinitialisation, quelqu'un essaie peut-être d'accéder à votre compte. Dans ce cas, nous vous recommandons de :
          </p>
          <ul style={{ color: '#991b1b', fontSize: '13px', margin: '5px 0 0 0', paddingLeft: '20px' }}>
            <li>Vérifier vos dernières connexions</li>
            <li>Activer l'authentification à deux facteurs (si disponible)</li>
            <li>Contacter notre support si vous suspectez une activité suspecte</li>
          </ul>
        </div>

        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '30px' }}>
          Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :
        </p>
        <p style={{ color: '#2563eb', fontSize: '12px', wordBreak: 'break-all', backgroundColor: '#f1f5f9', padding: '10px', borderRadius: '4px' }}>
          {resetUrl}
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

export default PasswordResetEmail;
