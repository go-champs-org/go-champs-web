import React from 'react';
import { Link } from 'react-router-dom';
import { ApiTournamentWithDependecies } from '../Shared/httpClient/apiTypes';
import Shimmer from '../Shared/UI/Shimmer';
import './Result.scss';

export const ResultShimmer: React.FC = () => (
  <div className="column">
    <div className="card">
      <div className="card-content">
        <Shimmer>
          <div
            style={{
              height: '13px',
              marginTop: '13px',
              width: '200px'
            }}
          ></div>
        </Shimmer>

        <br />

        <Shimmer>
          <div
            style={{
              height: '10px',
              marginTop: '10px',
              width: '250px'
            }}
          ></div>
        </Shimmer>
      </div>
    </div>
  </div>
);

const Result: React.FC<{
  tournament: ApiTournamentWithDependecies;
  views: number;
}> = ({ tournament, views }) => (
  <div className="column is-4-desktop is-6-tablet is-12-mobile">
    <Link to={`/${tournament.organization.slug}/${tournament.slug}`}>
      <div className="card">
        <div className="card-content">
          <p className="title is-4">{tournament.name}</p>

          <p className="subtitle is-6">{tournament.organization.name}</p>
        </div>

        <p className="card-info is-size-7">
          <span className="icon">
            <i className="fas fa-eye"></i>
          </span>

          {views}
        </p>
      </div>
    </Link>
  </div>
);

export default Result;
