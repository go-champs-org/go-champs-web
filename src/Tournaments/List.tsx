import React from 'react';
import { Link } from 'react-router-dom';
import Shimmer from '../Shared/UI/Shimmer';
import { TournamentEntity } from './state';
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

const TournamentCard: React.FC<{
  deleteTournament: (
    tournament: TournamentEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  tournament: TournamentEntity;
}> = ({ deleteTournament, organizationSlug, tournament }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`/${organizationSlug}/${tournament.slug}`}
      >
        <span className="title is-6">{tournament.name}</span>
      </Link>

      <div className="card-header-icon">
        <button
          className="button is-text"
          onClick={() => deleteTournament(tournament)}
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  </div>
);

export const List: React.FC<{
  deleteTournament: (
    tournament: TournamentEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  tournaments: TournamentEntity[];
}> = ({ deleteTournament, organizationSlug, tournaments }) => (
  <div>
    {tournaments.map((tournament: TournamentEntity) => (
      <TournamentCard
        key={tournament.id}
        deleteTournament={deleteTournament}
        organizationSlug={organizationSlug}
        tournament={tournament}
      />
    ))}
  </div>
);

export default List;
