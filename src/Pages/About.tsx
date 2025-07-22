import React from 'react';
import EmailForm from '../Shared/UI/Form/EmailFrom';
import homePhone from '../assets/home-photo.png';
import { Trans } from 'react-i18next';

const Home: React.FC = () => (
  <div className="hero is-medium">
    <div className="hero-head">
      <div className="content">
        <div className="columns is-vcentered">
          <div className="column is-6">
            <h1 className="title">Go Champs</h1>

            <span className="subtitle">
              <Trans>theBestAppToManageTournaments</Trans>
            </span>
          </div>

          <div className="column is-6">
            <img src={homePhone} alt="Demo tournament" />
          </div>
        </div>
      </div>
    </div>

    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">
          <Trans>whatIsGoChamps</Trans>
        </h1>

        <p style={{ marginBottom: '1.5rem' }}>
          <Trans>whatIsGoChampsLine1</Trans>
        </p>

        <p style={{ marginBottom: '1.5rem' }}>
          <Trans>whatIsGoChampsLine2</Trans>
        </p>

        <p style={{ marginBottom: '1.5rem' }}>
          <Trans>whatIsGoChampsLine3</Trans>
          &nbsp;
          <a
            href="/demo-organization/demo-tournament"
            className="has-text-primary"
          >
            <Trans>here</Trans>
          </a>
          .
        </p>
      </div>
    </div>

    <div className="hero-foot">
      <div className="has-text-centered">
        <h1 className="title">
          <Trans>sendYourFeedback</Trans>
        </h1>

        <EmailForm />
      </div>
    </div>
  </div>
);

export default Home;
