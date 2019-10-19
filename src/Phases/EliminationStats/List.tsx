import React from 'react';
import { Link } from 'react-router-dom';
import { TournamentState } from '../../Tournaments/state';
import { PhaseEntity, PhaseState } from '../state';
import './List.scss';
import { PhaseEliminationStatEntity, PhaseEliminationStatState } from './state';

const PhaseEliminationStatCard: React.FC<{
  onDeletePhaseEliminationStat: any;
  url: string;
  tournamentStat: PhaseEliminationStatEntity;
}> = ({ onDeletePhaseEliminationStat, url, tournamentStat }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`${url}/PhaseStatEdit/${tournamentStat.id}`}
      >
        <span className="title is-6">{tournamentStat.title}</span>
      </Link>
      <div className="card-header-icon">
        <button
          className="button is-text"
          onClick={() => onDeletePhaseEliminationStat(tournamentStat)}
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
  deletePhaseEliminationStat: any;
  phase: PhaseEntity;
  tournamentPhaseState: PhaseState;
  tournamentStatState: PhaseEliminationStatState;
  tournamentState: TournamentState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deletePhaseEliminationStat,
  phase,
  tournamentPhaseState,
  tournamentStatState,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Stats</h2>
          </div>
          <div className="column is-4 has-text-right">
            <Link className="button" to={`./PhaseStatNew`}>
              New stat
            </Link>
          </div>
        </div>
        {Object.keys(tournamentStatState.eliminationStats).map(
          (key: string) => (
            <PhaseEliminationStatCard
              key={key}
              url={baseTournamentUrl}
              tournamentStat={tournamentStatState.eliminationStats[key]}
              onDeletePhaseEliminationStat={deletePhaseEliminationStat}
            />
          )
        )}
      </div>
    </div>
  );
};

export const Wrapper: React.FC<{
  deletePhaseEliminationStat: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: PhaseEntity;
  tournamentPhaseState: PhaseState;
  tournamentState: TournamentState;
  tournamentStatState: PhaseEliminationStatState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deletePhaseEliminationStat,
  phase,
  tournamentPhaseState,
  tournamentState,
  tournamentStatState
}) => {
  return (
    <List
      currentOrganizationSlug={currentOrganizationSlug}
      currentTournamentSlug={currentTournamentSlug}
      deletePhaseEliminationStat={deletePhaseEliminationStat}
      phase={phase}
      tournamentPhaseState={tournamentPhaseState}
      tournamentState={tournamentState}
      tournamentStatState={tournamentStatState}
    />
  );
};

export default Wrapper;
