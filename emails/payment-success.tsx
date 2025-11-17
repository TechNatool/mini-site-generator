import * as React from 'react';

interface PaymentSuccessEmailProps {
  name: string;
  amount: string;
  currency?: string;
  plan: string;
  invoiceUrl?: string;
  invoiceNumber?: string;
  nextBillingDate?: string;
}

export const PaymentSuccessEmail = ({
  name,
  amount,
  currency = 'EUR',
  plan,
  invoiceUrl,
  invoiceNumber,
  nextBillingDate,
}: PaymentSuccessEmailProps) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '3px solid #2563eb' }}>
        <h1 style={{ color: '#2563eb', margin: '0', fontSize: '28px', fontWeight: 'bold' }}>
          ForgeWeb
        </h1>
        <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '14px' }}>
          Confirmation de paiement
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>✅</div>
          <h2 style={{ color: '#1e293b', fontSize: '24px', margin: '0' }}>
            Paiement confirmé !
          </h2>
        </div>

        <p style={{ color: '#475569', fontSize: '16px', marginBottom: '25px' }}>
          Bonjour {name},
        </p>

        <p style={{ color: '#475569', fontSize: '16px', marginBottom: '25px' }}>
          Merci pour votre paiement. Votre abonnement <strong>{plan}</strong> est maintenant actif.
        </p>

        {/* Payment Summary */}
        <div style={{ backgroundColor: '#f1f5f9', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
          <h3 style={{ color: '#1e293b', fontSize: '16px', marginTop: '0', marginBottom: '15px' }}>
            💳 Récapitulatif du paiement
          </h3>
          <table style={{ width: '100%', fontSize: '14px', color: '#475569' }}>
            <tr>
              <td style={{ padding: '8px 0' }}><strong>Plan :</strong></td>
              <td style={{ padding: '8px 0', textAlign: 'right' }}>{plan}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0' }}><strong>Montant :</strong></td>
              <td style={{ padding: '8px 0', textAlign: 'right', fontSize: '18px', fontWeight: 'bold', color: '#2563eb' }}>
                {amount} {currency}
              </td>
            </tr>
            {invoiceNumber && (
              <tr>
                <td style={{ padding: '8px 0' }}><strong>Numéro de facture :</strong></td>
                <td style={{ padding: '8px 0', textAlign: 'right', fontFamily: 'monospace', fontSize: '12px' }}>
                  {invoiceNumber}
                </td>
              </tr>
            )}
            {nextBillingDate && (
              <tr>
                <td style={{ padding: '8px 0' }}><strong>Prochaine facturation :</strong></td>
                <td style={{ padding: '8px 0', textAlign: 'right' }}>{nextBillingDate}</td>
              </tr>
            )}
          </table>
        </div>

        {invoiceUrl && (
          <div style={{ textAlign: 'center', margin: '25px 0' }}>
            <a
              href={invoiceUrl}
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#ffffff',
                color: '#2563eb',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '14px',
                border: '2px solid #2563eb',
              }}
            >
              📄 Télécharger la facture
            </a>
          </div>
        )}

        <div style={{ backgroundColor: '#d1fae5', padding: '15px', borderRadius: '8px', marginTop: '25px' }}>
          <p style={{ color: '#065f46', fontSize: '14px', margin: '0', marginBottom: '10px' }}>
            🎉 <strong>Avantages de votre plan {plan} :</strong>
          </p>
          <ul style={{ color: '#065f46', fontSize: '13px', margin: '0', paddingLeft: '20px' }}>
            <li>Génération illimitée de sites web</li>
            <li>Déploiement automatique sur Vercel</li>
            <li>Support prioritaire par email</li>
            <li>Accès aux templates premium</li>
            <li>Analytics avancés et statistiques</li>
          </ul>
        </div>

        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '30px' }}>
          Vous pouvez gérer votre abonnement à tout moment depuis votre <a href="https://forgeweb.io/dashboard/settings" style={{ color: '#2563eb' }}>tableau de bord</a>.
        </p>

        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '15px' }}>
          Des questions ? Consultez notre <a href="https://forgeweb.io/legal/refund-policy" style={{ color: '#2563eb' }}>politique de remboursement</a> ou contactez notre support.
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
          <a href="https://forgeweb.io/legal/refund-policy" style={{ color: '#64748b', textDecoration: 'none', margin: '0 8px' }}>
            Remboursement
          </a>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '10px' }}>
          &copy; {new Date().getFullYear()} ForgeWeb. Tous droits réservés.
        </p>
      </div>
    </div>
  </div>
);

export default PaymentSuccessEmail;
