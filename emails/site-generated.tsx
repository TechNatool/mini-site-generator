import * as React from 'react';

interface SiteGeneratedEmailProps {
  name: string;
  siteName: string;
  clientId: string;
  previewUrl: string;
  downloadUrl: string;
  pagesCount?: number;
}

export const SiteGeneratedEmail = ({
  name,
  siteName,
  clientId,
  previewUrl,
  downloadUrl,
  pagesCount = 6,
}: SiteGeneratedEmailProps) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '3px solid #2563eb' }}>
        <h1 style={{ color: '#2563eb', margin: '0', fontSize: '28px', fontWeight: 'bold' }}>
          ForgeWeb
        </h1>
        <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '14px' }}>
          Votre site est prêt !
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🎉</div>
          <h2 style={{ color: '#1e293b', fontSize: '24px', margin: '0' }}>
            Félicitations {name} !
          </h2>
        </div>

        <p style={{ color: '#475569', fontSize: '16px', marginBottom: '15px' }}>
          Votre site web <strong>{siteName}</strong> a été généré avec succès !
        </p>

        <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
          <h3 style={{ color: '#1e293b', fontSize: '16px', marginTop: '0', marginBottom: '15px' }}>
            📊 Détails de votre site
          </h3>
          <table style={{ width: '100%', fontSize: '14px', color: '#475569' }}>
            <tr>
              <td style={{ padding: '5px 0' }}><strong>Nom du site :</strong></td>
              <td style={{ padding: '5px 0' }}>{siteName}</td>
            </tr>
            <tr>
              <td style={{ padding: '5px 0' }}><strong>ID Client :</strong></td>
              <td style={{ padding: '5px 0', fontFamily: 'monospace', fontSize: '12px' }}>{clientId}</td>
            </tr>
            <tr>
              <td style={{ padding: '5px 0' }}><strong>Pages générées :</strong></td>
              <td style={{ padding: '5px 0' }}>{pagesCount} pages</td>
            </tr>
          </table>
        </div>

        <h3 style={{ color: '#1e293b', fontSize: '18px', marginBottom: '15px' }}>
          🚀 Prochaines étapes
        </h3>

        {/* Action Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <a
            href={previewUrl}
            style={{
              display: 'block',
              padding: '14px 20px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            👀 Prévisualiser le site
          </a>

          <a
            href={downloadUrl}
            style={{
              display: 'block',
              padding: '14px 20px',
              backgroundColor: '#ffffff',
              color: '#2563eb',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '16px',
              textAlign: 'center',
              border: '2px solid #2563eb',
            }}
          >
            📦 Télécharger le ZIP
          </a>
        </div>

        <div style={{ backgroundColor: '#dbeafe', padding: '15px', borderRadius: '8px', marginTop: '25px' }}>
          <p style={{ color: '#1e40af', fontSize: '14px', margin: '0', marginBottom: '10px' }}>
            💡 <strong>Conseil :</strong> Avant de déployer votre site :
          </p>
          <ul style={{ color: '#1e40af', fontSize: '13px', margin: '0', paddingLeft: '20px' }}>
            <li>Vérifiez le contenu généré par l'IA</li>
            <li>Personnalisez les couleurs et images</li>
            <li>Testez sur mobile et desktop</li>
            <li>Relisez les mentions légales</li>
          </ul>
        </div>

        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '30px' }}>
          Prêt à déployer ? Rendez-vous sur votre <a href="https://forgeweb.io/dashboard" style={{ color: '#2563eb' }}>dashboard</a> pour déployer en un clic sur Vercel.
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

export default SiteGeneratedEmail;
