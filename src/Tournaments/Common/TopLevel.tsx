import React from 'react';
import { Link } from 'react-router-dom';
import { TournamentEntity } from '../state';
import Shimmer from '../../Shared/UI/Shimmer';
import AdminWrapper from '../../Shared/UI/AdminWrapper';

export const LoadingTopLevel: React.FC = () => (
  <nav className="level">
    <div className="level-left">
      <div className="level-item">
        <Shimmer>
          <div
            style={{
              height: '26px',
              marginTop: '13px',
              width: '310px'
            }}
          ></div>
        </Shimmer>
      </div>
    </div>
  </nav>
);

const TopLevel: React.FC<{
  organizationSlug: string;
  tournament: TournamentEntity;
  tournamentSlug: string;
}> = ({ organizationSlug, tournament, tournamentSlug }) => (
  <nav className="level">
    <div className="level-left">
      <div className="level-item">
        <Link to={`/${organizationSlug}/${tournamentSlug}`}>
          <h1 className="title">{tournament.name}</h1>
        </Link>
      </div>
    </div>

    <AdminWrapper>
      <div className="level-right">
        <div className="level-item">
          <Link to={`/${organizationSlug}/${tournamentSlug}/Manage`}>
            <button className="button is-large">
              <span className="icon is-medium">
                <i className="fas fa-cog"></i>
              </span>

              <span>Manage</span>
            </button>
          </Link>
        </div>
      </div>
    </AdminWrapper>
  </nav>
);

export default TopLevel;
