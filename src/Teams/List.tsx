import React from 'react';
import { Link } from 'react-router-dom';
import Shimmer from '../Shared/UI/Shimmer';
import { TeamEntity } from './state';
import { AnyAction, Dispatch } from 'redux';

const LoadingCard: React.FC = () => (
  <div className="card item">
    <div className="card-header">
      <div className="card-header-title">
        <Shimmer>
          <div
            style={{
              height: '13px',
              marginTop: '13px',
              width: '250px'
            }}
          ></div>
        </Shimmer>
      </div>
    </div>
  </div>
);

export const ListLoading: React.FC = () => (
  <div>
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </div>
);

const TeamCard: React.FC<{
  deleteTeam: (
    team: TeamEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  team: TeamEntity;
  tournamentSlug: string;
}> = ({ deleteTeam, organizationSlug, team, tournamentSlug }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`/${organizationSlug}/${tournamentSlug}/EditTeam/${team.id}`}
      >
        <span className="title is-6">{team.name}</span>
      </Link>

      <div className="card-header-icon">
        <button className="button is-text" onClick={() => deleteTeam(team)}>
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  </div>
);

export const List: React.FC<{
  deleteTeam: (
    team: TeamEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  teams: TeamEntity[];
  tournamentSlug: string;
}> = ({ deleteTeam, organizationSlug, teams, tournamentSlug }) => (
  <div>
    {teams.map((team: TeamEntity) => (
      <TeamCard
        key={team.id}
        deleteTeam={deleteTeam}
        organizationSlug={organizationSlug}
        team={team}
        tournamentSlug={tournamentSlug}
      />
    ))}
  </div>
);

export default List;
