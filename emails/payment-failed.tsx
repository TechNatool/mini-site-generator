import * as React from 'react';

interface PaymentFailedEmailProps {
  name: string;
  amount: string;
  currency?: string;
  plan: string;
  reason?: string;
  retryUrl?: string;
  updatePaymentUrl?: string;
}

export const PaymentFailedEmail = ({
  name,
  amount,
  currency = 'EUR',
  plan,
  reason = 'Carte bancaire refusée',
  retryUrl,
  updatePaymentUrl,
}: PaymentFailedEmailProps) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '3px solid #ef4444' }}>
        <h1 style={{ color: '#2563eb', margin: '0', fontSize: '28px', fontWeight: 'bold' }}>
          ForgeWeb
        </h1>
        <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '14px' }}>
          Problème de paiement
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>⚠️</div>
          <h2 style={{ color: '#dc2626', fontSize: '24px', margin: '0' }}>
            Échec du paiement
          </h2>
        </div>

        <p style={{ color: '#475569', fontSize: '16px', marginBottom: '15px' }}>
          Bonjour {name},
        </p>

        <p style={{ color: '#475569', fontSize: '16px', marginBottom: '25px' }}>
          Nous n'avons malheureusement pas pu traiter votre paiement pour l'abonnement <strong>{plan}</strong>.
        </p>

        {/* Payment Details */}
        <div style={{ backgroundColor: '#fee2e2', border: '1px solid #ef4444', padding: '20px', borderRadius: '8px', marginBottom: '25px' }}>
          <h3 style={{ color: '#991b1b', fontSize: '16px', marginTop: '0', marginBottom: '15px' }}>
            ❌ Détails du problème
          </h3>
          <table style={{ width: '100%', fontSize: '14px', color: '#7f1d1d' }}>
            <tr>
              <td style={{ padding: '5px 0' }}><strong>Plan :</strong></td>
              <td style={{ padding: '5px 0' }}>{plan}</td>
            </tr>
            <tr>
              <td style={{ padding: '5px 0' }}><strong>Montant :</strong></td>
              <td style={{ padding: '5px 0' }}>{amount} {currency}</td>
            </tr>
            <tr>
              <td style={{ padding: '5px 0' }}><strong>Raison :</strong></td>
              <td style={{ padding: '5px 0' }}>{reason}</td>
            </tr>
          </table>
        </div>

        <h3 style={{ color: '#1e293b', fontSize: '18px', marginBottom: '15px' }}>
          🔧 Comment résoudre ce problème ?
        </h3>

        <div style={{ backgroundColor: '#f1f5f9', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <ul style={{ color: '#475569', fontSize: '14px', margin: '0', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>Vérifiez que votre carte bancaire est valide et non expirée</li>
            <li style={{ marginBottom: '8px' }}>Assurez-vous d'avoir suffisamment de fonds disponibles</li>
            <li style={{ marginBottom: '8px' }}>Vérifiez que les données de votre carte sont correctes</li>
            <li style={{ marginBottom: '8px' }}>Contactez votre banque pour autoriser la transaction</li>
          </ul>
        </div>

        {/* Action Buttons */}
        {updatePaymentUrl && (
          <div style={{ textAlign: 'center', margin: '25px 0' }}>
            <a
              href={updatePaymentUrl}
              style={{
                display: 'inline-block',
                padding: '14px 30px',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                marginBottom: '12px',
              }}
            >
              💳 Mettre à jour mon moyen de paiement
            </a>
          </div>
        )}

        {retryUrl && (
          <div style={{ textAlign: 'center', margin: '15px 0' }}>
            <a
              href={retryUrl}
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
              🔄 Réessayer le paiement
            </a>
          </div>
        )}

        <div style={{ backgroundColor: '#fef3c7', border: '1px solid #f59e0b', padding: '15px', borderRadius: '8px', marginTop: '25px' }}>
          <p style={{ color: '#92400e', fontSize: '14px', margin: '0', marginBottom: '8px' }}>
            ⏰ <strong>Action requise :</strong>
          </p>
          <p style={{ color: '#92400e', fontSize: '13px', margin: '0' }}>
            Votre abonnement sera suspendu si le paiement n'est pas effectué sous <strong>7 jours</strong>. Veuillez mettre à jour vos informations de paiement dès que possible pour éviter toute interruption de service.
          </p>
        </div>

        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '30px' }}>
          Si vous continuez à rencontrer des problèmes, n'hésitez pas à <a href="https://forgeweb.io/support" style={{ color: '#2563eb' }}>contacter notre support</a>. Nous sommes là pour vous aider.
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

export default PaymentFailedEmail;
