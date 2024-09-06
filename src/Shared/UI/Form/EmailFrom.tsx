import React from 'react';
import emailjs from '@emailjs/browser';
import { displayToast } from '../../bulma/toast';
import { Trans, useTranslation } from 'react-i18next';
import {
  REACT_APP_EMAILJS_PUBLIC_KEY,
  REACT_APP_EMAILJS_TEMPLATE_ID
} from '../../env';

const EmailForm: React.FC = () => {
  const { t } = useTranslation();

  const sendEmail = async (event: React.FormEvent) => {
    event.preventDefault();

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
    } else {
      displayToast(t('sendYourFeedbackFailMsg'), 'is-danger');
    }
  };

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="field">
            <label className="label">
              <Trans>name</Trans>
            </label>

            <div className="control">
              <input
                className="input is-primary"
                type="text"
                placeholder="Usain Bolt"
                name="name"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">
              <Trans>email</Trans>
            </label>

            <div className="control">
              <input
                className="input is-primary"
                type="text"
                placeholder="seu@email.com"
                name="email"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">
              <Trans>message</Trans>
            </label>

            <div className="control">
              <textarea
                className="textarea is-primary"
                placeholder=""
                name="message"
              ></textarea>
            </div>
          </div>

          <div className="control">
            <button className="button is-primary" type="submit">
              <Trans>send</Trans>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmailForm;
