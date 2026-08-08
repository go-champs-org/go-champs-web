'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslations } from 'next-intl';

function initEmailjs() {
  emailjs.init({
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
  });
}

async function submitContactForm(
  form: HTMLFormElement
): Promise<'success' | 'fail'> {
  try {
    initEmailjs();

    const result = await emailjs.sendForm(
      'gmail',
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      form
    );

    if (result.status === 200) {
      return 'success';
    }

    return 'fail';
  } catch {
    return 'fail';
  }
}

export function EmailForm() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<'success' | 'fail' | null>(null);

  const sendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.target as HTMLFormElement;
    const outcome = await submitContactForm(form);

    if (outcome === 'success') {
      form.reset();
    }
    setFeedback(outcome);
    setIsSubmitting(false);
  };

  return (
    <form className="mt-4 flex flex-col gap-4" onSubmit={sendEmail}>
      <div className="flex flex-col gap-1">
        <label htmlFor="contact-name" className="font-medium">
          {t('name')}
        </label>
        <input
          id="contact-name"
          className="rounded border border-neutral-400 p-2"
          type="text"
          placeholder={t('yourName')}
          name="name"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="contact-email" className="font-medium">
          {t('email')}
        </label>
        <input
          id="contact-email"
          className="rounded border border-neutral-400 p-2"
          type="email"
          placeholder={t('yourEmail')}
          name="email"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="contact-message" className="font-medium">
          {t('message')}
        </label>
        <textarea
          id="contact-message"
          className="rounded border border-neutral-400 p-2"
          placeholder={t('yourMessage')}
          name="message"
          rows={5}
          required
        />
      </div>

      <div>
        <button
          className="rounded bg-neutral-900 px-4 py-2 text-white disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {t('send')}
        </button>
      </div>

      {feedback === 'success' && (
        <p className="text-green-600">{t('sendYourFeedbackSuccessMsg')}</p>
      )}
      {feedback === 'fail' && (
        <p className="text-red-600">{t('sendYourFeedbackFailMsg')}</p>
      )}
    </form>
  );
}
