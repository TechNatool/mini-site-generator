import * as React from 'react';

interface VerifyEmailProps {
  name: string;
  verificationUrl: string;
  code?: string;
}

export const VerifyEmail = ({ name, verificationUrl, code }: VerifyEmailProps) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '3px solid #2563eb' }}>
        <h1 style={{ color: '#2563eb', margin: '0', fontSize: '28px', fontWeight: 'bold' }}>
          ForgeWeb
        </h1>
        <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '14px' }}>
          Vérification de votre adresse email
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '40px 20px' }}>
        <h2 style={{ color: '#1e293b', fontSize: '24px', marginBottom: '20px' }}>
          Bonjour {name},
        </h2>

        <p style={{ color: '#475569', fontSize: '16px', marginBottom: '15px' }}>
          Pour activer votre compte ForgeWeb, veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous.
        </p>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <a
            href={verificationUrl}
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
            Vérifier mon email
          </a>
        </div>

        {code && (
          <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px', marginTop: '30px', textAlign: 'center' }}>
            <p style={{ color: '#475569', fontSize: '14px', margin: '0 0 10px 0' }}>
              Ou utilisez ce code de vérification :
            </p>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#2563eb',
              letterSpacing: '8px',
              fontFamily: 'monospace',
            }}>
              {code}
            </div>
          </div>
        )}

        <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', padding: '15px', borderRadius: '8px', marginTop: '30px' }}>
          <p style={{ color: '#92400e', fontSize: '14px', margin: '0' }}>
            ⚠️ <strong>Important :</strong> Ce lien expire dans 24 heures. Si vous n'avez pas demandé cette vérification, ignorez cet email.
          </p>
        </div>

        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '30px' }}>
          Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :
        </p>
        <p style={{ color: '#2563eb', fontSize: '12px', wordBreak: 'break-all' }}>
          {verificationUrl}
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

export default VerifyEmail;
