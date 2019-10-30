import React from 'react';
import { Link } from 'react-router-dom';
import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';

const Result: React.FC<{ tournament: ApiTournamentWithDependecies }> = ({
  tournament
}) => (
  <div className="column">
    <Link to={`/${tournament.organization.slug}/${tournament.slug}`}>
      <div className="card">
        <div className="card-content">
          <p className="title is-4">{tournament.name}</p>

          <p className="subtitle is-6">{tournament.organization.name}</p>
        </div>
      </div>
    </Link>
  </div>
);

export default Result;
