import React from 'react';
import EmailForm from '../Shared/UI/Form/EmailFrom';

class Home extends React.Component {
  render() {
    return (
      <div className="hero is-medium">
        <div className="hero-head">
          <div className="content">
            <div className="columns is-vcentered">
              <div className="column is-6">
                <h1 className="title">Go Champs!</h1>

                <span className="subtitle">
                  A web app mais maneira para gerenciar torneios
                </span>
              </div>

              <div className="column is-6">
                <img
                  src="https://cronhub.io/img/ch-dashboard-shadow.png"
                  alt="Demo Tournament"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="hero-body">
          <div className="has-text-centered">
            <h1 className="title">O que é o Go Champs?</h1>

            <p style={{ marginBottom: '1.5rem' }}>
              Go Champs! É uma aplicacão para você criar seu torneio e gerenciar
              fases, times, jogos, classificacões e muito mais.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              As informacões ficam disponibilizadas para qualquer pessoa acessar
              e pode acompanhar seu torneio.
            </p>

            <p style={{ marginBottom: '1.5rem' }}>
              Acesse nosso torneio exemplo clicando&nbsp;
              <a
                href="/demo-organization/demo-tournament"
                style={{ color: '#970c10' }}
              >
                aqui
              </a>
              .
            </p>
          </div>
        </div>

        <div className="hero-foot">
          <div className="has-text-centered">
            <h1 className="title">Mande seu feedback</h1>

            <EmailForm />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
