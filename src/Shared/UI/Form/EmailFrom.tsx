import React from 'react';
import emailjs from 'emailjs-com';
import { displayToast } from '../../bulma/toast';

const EmailForm: React.FC = () => {
  const sendEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await emailjs.sendForm(
      'gmail',
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID as string,
      event.target as HTMLFormElement,
      process.env.REACT_APP_EMAILJS_USER_ID
    );

    if (result.status === 200) {
      displayToast('Mensagem enviada com sucesso!', 'is-success');
    } else {
      displayToast('Problema ao enviar, tente mais tarde!', 'is-danger');
    }
  };

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <div className="columns is-centered">
        <div className="column is-half">
          <div className="field">
            <label className="label">Nome</label>
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
            <label className="label">Email</label>
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
            <label className="label">Mensagem</label>
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
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmailForm;
