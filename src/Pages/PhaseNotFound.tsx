import React from 'react';

const PhaseNotFound: React.FC = () => (
  <div className="notification is-danger is-light">
    <div className="content has-text-centered">
      <h2 className="subtitle">Você precisa criar um fase para o torneio.</h2>

      <button className="button is-large is-fullwidth">New phase</button>
    </div>
  </div>
);

export default PhaseNotFound;
