import nodemailer from 'nodemailer';
import { loadEmailTemplate } from './load-email-template';
import { emailConfig } from './email.config';

interface EmailInfo {
  /** The receiver's email */
  to: string;

  /** The email's subject */
  subject: string;

  /** The email body (can be html) */
  body: string;
}

/**
 * Send an email
 */
export async function sendEmail(emailInfo: EmailInfo): Promise<void> {
  /* Configure the SMPT connection */
  const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: emailConfig.appEmail,
      pass: emailConfig.appEmailPassword,
    },
  });

  /* Send the email */
  await transport.sendMail({
    from: emailConfig.appEmail,
    to: emailInfo.to,
    subject: emailInfo.subject,
    html: emailInfo.body,
  });
}

/**
 * Send an email by filling up a template.
 */
export async function sendEmailWithTemplate<T>(
  emailInfo: Omit<EmailInfo, 'body'>,
  templateName: string,
  templateData: T,
): Promise<void> {
  return sendEmail({
    ...emailInfo,
    body: await loadEmailTemplate(templateName, templateData),
  });
}
