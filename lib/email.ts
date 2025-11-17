/**
 * Email sending utilities using Resend
 *
 * @module lib/email
 */

import { render } from '@react-email/render';
import WelcomeEmail from '@/emails/welcome';
import VerifyEmail from '@/emails/verify-email';
import SiteGeneratedEmail from '@/emails/site-generated';
import DeployCompleteEmail from '@/emails/deploy-complete';
import PasswordResetEmail from '@/emails/password-reset';
import PaymentSuccessEmail from '@/emails/payment-success';
import PaymentFailedEmail from '@/emails/payment-failed';

// Email template mapping
const EMAIL_TEMPLATES = {
  welcome: WelcomeEmail,
  'verify-email': VerifyEmail,
  'site-generated': SiteGeneratedEmail,
  'deploy-complete': DeployCompleteEmail,
  'password-reset': PasswordResetEmail,
  'payment-success': PaymentSuccessEmail,
  'payment-failed': PaymentFailedEmail,
} as const;

export type EmailTemplate = keyof typeof EMAIL_TEMPLATES;

interface SendEmailParams {
  to: string | string[];
  template: EmailTemplate;
  variables: Record<string, any>;
  subject?: string;
}

interface SendEmailResponse {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Send an email using Resend API
 *
 * @param params Email parameters
 * @returns Promise with send result
 */
export async function sendEmail({
  to,
  template,
  variables,
  subject,
}: SendEmailParams): Promise<SendEmailResponse> {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM || 'ForgeWeb <no-reply@forgeweb.io>';

    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      return { success: false, error: 'Email service not configured' };
    }

    // Get the email template component
    const TemplateComponent = EMAIL_TEMPLATES[template];
    if (!TemplateComponent) {
      return { success: false, error: `Unknown template: ${template}` };
    }

    // Render the email to HTML
    const html = render(TemplateComponent(variables));

    // Generate subject if not provided
    const emailSubject = subject || getDefaultSubject(template);

    // Send via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: Array.isArray(to) ? to : [to],
        subject: emailSubject,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API error:', error);
      return { success: false, error: error.message || 'Failed to send email' };
    }

    const data = await response.json();
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get default subject for email template
 */
function getDefaultSubject(template: EmailTemplate): string {
  const subjects: Record<EmailTemplate, string> = {
    'welcome': 'Bienvenue sur ForgeWeb !',
    'verify-email': 'Vérifiez votre adresse email - ForgeWeb',
    'site-generated': 'Votre site est prêt ! 🎉',
    'deploy-complete': 'Votre site est en ligne ! 🚀',
    'password-reset': 'Réinitialisation de votre mot de passe - ForgeWeb',
    'payment-success': 'Paiement confirmé - ForgeWeb',
    'payment-failed': 'Problème de paiement - Action requise',
  };

  return subjects[template];
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(to: string, name: string, loginUrl?: string) {
  return sendEmail({
    to,
    template: 'welcome',
    variables: { name, loginUrl },
  });
}

/**
 * Send email verification
 */
export async function sendVerificationEmail(
  to: string,
  name: string,
  verificationUrl: string,
  code?: string
) {
  return sendEmail({
    to,
    template: 'verify-email',
    variables: { name, verificationUrl, code },
  });
}

/**
 * Send site generation notification
 */
export async function sendSiteGeneratedEmail(
  to: string,
  variables: {
    name: string;
    siteName: string;
    clientId: string;
    previewUrl: string;
    downloadUrl: string;
    pagesCount?: number;
  }
) {
  return sendEmail({
    to,
    template: 'site-generated',
    variables,
  });
}

/**
 * Send deployment complete notification
 */
export async function sendDeployCompleteEmail(
  to: string,
  variables: {
    name: string;
    siteName: string;
    deployUrl: string;
    deploymentId?: string;
    deployTime?: string;
  }
) {
  return sendEmail({
    to,
    template: 'deploy-complete',
    variables,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  to: string,
  name: string,
  resetUrl: string,
  expiryTime?: string
) {
  return sendEmail({
    to,
    template: 'password-reset',
    variables: { name, resetUrl, expiryTime },
  });
}

/**
 * Send payment success notification
 */
export async function sendPaymentSuccessEmail(
  to: string,
  variables: {
    name: string;
    amount: string;
    currency?: string;
    plan: string;
    invoiceUrl?: string;
    invoiceNumber?: string;
    nextBillingDate?: string;
  }
) {
  return sendEmail({
    to,
    template: 'payment-success',
    variables,
  });
}

/**
 * Send payment failed notification
 */
export async function sendPaymentFailedEmail(
  to: string,
  variables: {
    name: string;
    amount: string;
    currency?: string;
    plan: string;
    reason?: string;
    retryUrl?: string;
    updatePaymentUrl?: string;
  }
) {
  return sendEmail({
    to,
    template: 'payment-failed',
    variables,
  });
}
