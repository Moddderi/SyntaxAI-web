import { z } from 'zod';
import { Resend } from 'resend';
import { SUPPORT_EMAIL } from '@/lib/site';

export const feedbackRequestSchema = z.object({
  type: z.enum(['feedback', 'bug']),
  locale: z.enum(['en', 'uk']).optional(),
  email: z.string().max(320).optional(),
  // Beta feedback fields
  workedWell: z.string().max(5000).optional(),
  confusing: z.string().max(5000).optional(),
  featureWish: z.string().max(5000).optional(),
  // Bug report fields
  whatHappened: z.string().max(5000).optional(),
  stepsToReproduce: z.string().max(5000).optional(),
  expectedVsActual: z.string().max(5000).optional(),
  browserOs: z.string().max(500).optional(),
});

export type FeedbackRequest = z.infer<typeof feedbackRequestSchema>;

function hasContent(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

export function validateFeedbackPayload(payload: FeedbackRequest): string | null {
  if (payload.type === 'feedback') {
    if (
      !hasContent(payload.workedWell) &&
      !hasContent(payload.confusing) &&
      !hasContent(payload.featureWish)
    ) {
      return 'Fill in at least one feedback field.';
    }
    return null;
  }

  if (
    !hasContent(payload.whatHappened) &&
    !hasContent(payload.stepsToReproduce) &&
    !hasContent(payload.expectedVsActual)
  ) {
    return 'Describe the bug in at least one field.';
  }

  return null;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function section(title: string, body: string | undefined): string {
  const text = body?.trim();
  if (!text) {
    return '';
  }

  return `<h3 style="margin:16px 0 6px;font-size:14px;color:#111">${escapeHtml(title)}</h3>
<pre style="margin:0;white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;line-height:1.5;color:#222;background:#f6f6f6;padding:12px;border-radius:8px">${escapeHtml(text)}</pre>`;
}

export function buildFeedbackEmail(input: {
  payload: FeedbackRequest;
  user: { id: string; email: string; name: string };
}): { subject: string; html: string; text: string } {
  const { payload, user } = input;
  const replyEmail = payload.email?.trim() || user.email;
  const isBug = payload.type === 'bug';
  const subject = isBug
    ? `SyntaxAI — Bug report (${user.email})`
    : `SyntaxAI — Beta feedback (${user.email})`;

  const htmlParts = [
    `<p style="margin:0 0 12px;font-size:14px;color:#333"><strong>Type:</strong> ${isBug ? 'Bug report' : 'Beta feedback'}</p>`,
    `<p style="margin:0 0 4px;font-size:14px;color:#333"><strong>Account:</strong> ${escapeHtml(user.email)} (${escapeHtml(user.id)})</p>`,
    user.name
      ? `<p style="margin:0 0 4px;font-size:14px;color:#333"><strong>Name:</strong> ${escapeHtml(user.name)}</p>`
      : '',
    `<p style="margin:0 0 4px;font-size:14px;color:#333"><strong>Reply-to:</strong> ${escapeHtml(replyEmail)}</p>`,
    payload.locale
      ? `<p style="margin:0 0 16px;font-size:14px;color:#333"><strong>Locale:</strong> ${escapeHtml(payload.locale)}</p>`
      : '',
  ];

  if (isBug) {
    htmlParts.push(
      section('What happened', payload.whatHappened),
      section('Steps to reproduce', payload.stepsToReproduce),
      section('Expected vs actual', payload.expectedVsActual),
      section('Browser / OS', payload.browserOs),
    );
  } else {
    htmlParts.push(
      section('What worked well', payload.workedWell),
      section('What felt confusing or broken', payload.confusing),
      section('Feature wish', payload.featureWish),
    );
  }

  const textLines = [
    `Type: ${isBug ? 'Bug report' : 'Beta feedback'}`,
    `Account: ${user.email} (${user.id})`,
    user.name ? `Name: ${user.name}` : '',
    `Reply-to: ${replyEmail}`,
    payload.locale ? `Locale: ${payload.locale}` : '',
    '',
  ];

  if (isBug) {
    textLines.push(
      'What happened:',
      payload.whatHappened?.trim() || '—',
      '',
      'Steps to reproduce:',
      payload.stepsToReproduce?.trim() || '—',
      '',
      'Expected vs actual:',
      payload.expectedVsActual?.trim() || '—',
      '',
      'Browser / OS:',
      payload.browserOs?.trim() || '—',
    );
  } else {
    textLines.push(
      'What worked well:',
      payload.workedWell?.trim() || '—',
      '',
      'What felt confusing or broken:',
      payload.confusing?.trim() || '—',
      '',
      'Feature wish:',
      payload.featureWish?.trim() || '—',
    );
  }

  return {
    subject,
    html: `<div style="font-family:Inter,system-ui,sans-serif;max-width:640px">${htmlParts.join('')}</div>`,
    text: textLines.filter((line) => line !== undefined).join('\n'),
  };
}

export async function sendFeedbackEmail(input: {
  payload: FeedbackRequest;
  user: { id: string; email: string; name: string };
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || 'SyntaxAI <onboarding@resend.dev>';
  const to = process.env.FEEDBACK_TO_EMAIL?.trim() || SUPPORT_EMAIL;
  const replyTo = input.payload.email?.trim() || input.user.email;
  const email = buildFeedbackEmail(input);

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from,
    to: [to],
    replyTo,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });

  if (result.error) {
    throw new Error(result.error.message || 'Failed to send feedback email');
  }
}
