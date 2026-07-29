import React from 'react';
import { Trans } from 'react-i18next';
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

export const PinnedResult: React.FC<{
  removeRecentlyView: (event: React.MouseEvent) => void;
  tournament: ApiTournamentWithDependecies;
  views: number;
}> = ({ removeRecentlyView, tournament, views }) => (
  <div className="column is-4-desktop is-6-tablet is-12-mobile">
    <Link to={`/${tournament.organization.slug}/${tournament.slug}`}>
      <div className="result card">
        <div className="card-content">
          <p className="title is-4">{tournament.name}</p>

          <p className="subtitle is-6">{tournament.organization.name}</p>
        </div>

        <div className="card-info is-size-7">
          <div>
            <span className="icon">
              <i className="fas fa-eye"></i>
            </span>

            {views}
          </div>

          <div>
            <button
              className="button is-small is-danger"
              onClick={removeRecentlyView}
            >
              <span className="icon">
                <i className="fas fa-thumbtack"></i>
              </span>

              <span>
                <Trans>unpin</Trans>
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const Result: React.FC<{
  pinRecentlyView: (event: React.MouseEvent) => void;
  tournament: ApiTournamentWithDependecies;
  views: number;
}> = ({ pinRecentlyView, tournament, views }) => (
  <div className="column is-4-desktop is-6-tablet is-12-mobile">
    <Link to={`/${tournament.organization.slug}/${tournament.slug}`}>
      <div className="result card">
        <div className="card-content">
          <p className="title is-4">{tournament.name}</p>

          <p className="subtitle is-6">{tournament.organization.name}</p>
        </div>

        <div className="card-info is-size-7">
          <div>
            <span className="icon">
              <i className="fas fa-eye"></i>
            </span>

            {views}
          </div>

          <div>
            <button
              className="button is-small is-info is-outlined"
              onClick={pinRecentlyView}
            >
              <span className="icon">
                <i className="fas fa-thumbtack"></i>
              </span>

              <span>
                <Trans>pin</Trans>
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default Result;
