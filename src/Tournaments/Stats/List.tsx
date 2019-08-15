import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import './List.scss';
import { TournamentStatEntity, TournamentStatState } from './state';

const TournamentStatCard: React.FC<{
  onDeleteTournamentStat: any;
  url: string;
  tournamentStat: TournamentStatEntity;
}> = ({ onDeleteTournamentStat, url, tournamentStat }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`${url}/TournamentStatEdit/${tournamentStat.id}`}
      >
        <span className="title is-6">{tournamentStat.title}</span>
      </Link>
      <div className="card-header-icon">
        <button
          className="button is-text"
          onClick={() => onDeleteTournamentStat(tournamentStat)}
        >
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  </div>
);

export const List: React.FC<{
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  deleteTournamentStat: any;
  tournamentStatState: TournamentStatState;
  tournamentState: TournamentState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentStat,
  tournamentStatState,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <NavBar
          organizationSlug={currentOrganizationSlug}
          tournament={tournament}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Stats</h2>
          </div>
          <div className="column is-4 has-text-right">
            <Link className="button" to={`./TournamentStatNew`}>
              New stat
            </Link>
          </div>
        </div>
        {Object.keys(tournamentStatState.tournamentStats).map((key: string) => (
          <TournamentStatCard
            key={key}
            url={baseTournamentUrl}
            tournamentStat={tournamentStatState.tournamentStats[key]}
            onDeleteTournamentStat={deleteTournamentStat}
          />
        ))}
      </div>
    </div>
  );
};

export const Wrapper: React.FC<{
  deleteTournamentStat: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  tournamentState: TournamentState;
  tournamentStatState: TournamentStatState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentStat,
  tournamentState,
  tournamentStatState
}) => {
  return (
    <List
      currentOrganizationSlug={currentOrganizationSlug}
      currentTournamentSlug={currentTournamentSlug}
      deleteTournamentStat={deleteTournamentStat}
      tournamentState={tournamentState}
      tournamentStatState={tournamentStatState}
    />
  );
};

export default Wrapper;
