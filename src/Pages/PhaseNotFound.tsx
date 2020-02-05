import React from 'react';
import AdminWrapper, { NotAdminWrapper } from '../Shared/UI/AdminWrapper';

const PhaseNotFound: React.FC = () => (
  <div className="column is-12">
    <AdminWrapper>
      <div className="notification is-danger is-light">
        <div className="content has-text-centered">
          <h2 className="subtitle">Você precisa criar times para o torneio.</h2>

          <button className="button is-large is-fullwidth">New team</button>
        </div>
      </div>

      <div className="notification is-danger is-light">
        <div className="content has-text-centered">
          <h2 className="subtitle">
            Você precisa criar um fase para o torneio.
          </h2>

          <button className="button is-large is-fullwidth">New phase</button>
        </div>
      </div>
    </AdminWrapper>

    <NotAdminWrapper>
      <div className="notification is-danger is-light">
        <div className="content has-text-centered">
          <h2 className="subtitle">Este torneiro está em construção.</h2>
        </div>
      </div>
    </NotAdminWrapper>
  </div>
);

export default PhaseNotFound;
