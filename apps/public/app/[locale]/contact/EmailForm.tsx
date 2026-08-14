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
    <form className="mt-8 flex flex-col gap-8" onSubmit={sendEmail}>
      <div className="flex flex-col rounded-t border-b border-foreground/50 bg-surface-input px-4 py-1">
        <label
          htmlFor="contact-name"
          className="text-xs tracking-[0.4px] text-muted"
        >
          {t('name')}
        </label>
        <input
          id="contact-name"
          className="bg-transparent py-1 text-base tracking-[0.5px] text-foreground placeholder:text-foreground/35 focus:outline-none"
          type="text"
          placeholder={t('yourName')}
          name="name"
          required
        />
      </div>

      <div className="flex flex-col rounded-t border-b border-foreground/50 bg-surface-input px-4 py-1">
        <label
          htmlFor="contact-email"
          className="text-xs tracking-[0.4px] text-muted"
        >
          {t('email')}
        </label>
        <input
          id="contact-email"
          className="bg-transparent py-1 text-base tracking-[0.5px] text-foreground placeholder:text-foreground/35 focus:outline-none"
          type="email"
          placeholder={t('yourEmail')}
          name="email"
          required
        />
      </div>

      <div className="flex flex-col rounded-t border-b border-foreground/50 bg-surface-input px-4 py-1">
        <label
          htmlFor="contact-message"
          className="text-xs tracking-[0.4px] text-muted"
        >
          {t('message')}
        </label>
        <textarea
          id="contact-message"
          className="bg-transparent py-1 text-base tracking-[0.5px] text-foreground placeholder:text-foreground/35 focus:outline-none"
          placeholder={t('yourMessage')}
          name="message"
          rows={5}
          required
        />
      </div>

      <div>
        <button
          className="w-full cursor-pointer rounded-2xl bg-primary px-6 py-4 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 hover:bg-primary-dark"
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
