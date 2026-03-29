import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { displayToast } from '../../bulma/toast';
import { Trans, useTranslation } from 'react-i18next';
import {
  REACT_APP_EMAILJS_PUBLIC_KEY,
  REACT_APP_EMAILJS_TEMPLATE_ID
} from '../../env';
import './EmailFormV2.scss';

function EmailFormV2(): React.ReactElement {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      emailjs.init({
        publicKey: REACT_APP_EMAILJS_PUBLIC_KEY
      });

      const result = await emailjs.sendForm(
        'gmail',
        REACT_APP_EMAILJS_TEMPLATE_ID as string,
        event.target as HTMLFormElement
      );

      if (result.status === 200) {
        displayToast(t('sendYourFeedbackSuccessMsg'), 'is-success');
        (event.target as HTMLFormElement).reset();
      } else {
        displayToast(t('sendYourFeedbackFailMsg'), 'is-danger');
      }
    } catch {
      displayToast(t('sendYourFeedbackFailMsg'), 'is-danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form-v2" onSubmit={sendEmail}>
      <div className="contact-form-v2-field">
        <label className="contact-form-v2-label" htmlFor="contact-name">
          <Trans>name</Trans>
        </label>
        <input
          id="contact-name"
          className="contact-form-v2-input"
          type="text"
          placeholder="Usain Bolt"
          name="name"
          required
        />
      </div>

      <div className="contact-form-v2-field">
        <label className="contact-form-v2-label" htmlFor="contact-email">
          <Trans>email</Trans>
        </label>
        <input
          id="contact-email"
          className="contact-form-v2-input"
          type="email"
          placeholder="seu@email.com"
          name="email"
          required
        />
      </div>

      <div className="contact-form-v2-field">
        <label className="contact-form-v2-label" htmlFor="contact-message">
          <Trans>message</Trans>
        </label>
        <textarea
          id="contact-message"
          className="contact-form-v2-textarea"
          placeholder=""
          name="message"
          rows={5}
          required
        />
      </div>

      <div className="contact-form-v2-submit-wrapper">
        <button
          className="contact-form-v2-submit"
          type="submit"
          disabled={isSubmitting}
        >
          <Trans>send</Trans>
        </button>
      </div>
    </form>
  );
}

export default EmailFormV2;
