import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseEntity, PhaseState } from '../Phases/state';
import { PhaseEliminationState } from '../Tournaments/state';
import './List.scss';
import { TeamEntity, TeamState } from './state';

const TeamCard: React.FC<{
  onDeleteTeam: any;
  url: string;
  tournamentTeam: TeamEntity;
}> = ({ onDeleteTeam, url, tournamentTeam }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`${url}/TeamEdit/${tournamentTeam.id}`}
      >
        <span className="title is-6">{tournamentTeam.name}</span>
      </Link>
      <div className="card-header-icon">
        <button
          className="button is-text"
          onClick={() => onDeleteTeam(tournamentTeam)}
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
  deleteTeam: any;
  phase: PhaseEntity;
  tournamentPhaseState: PhaseState;
  tournamentTeamState: TeamState;
  tournamentState: PhaseEliminationState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTeam,
  phase,
  tournamentPhaseState,
  tournamentTeamState,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;
  return (
    <div className="columns is-multiline">
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Teams</h2>
          </div>
          <div className="column is-4 has-text-right">
            <Link className="button" to={`./TeamNew`}>
              New team
            </Link>
          </div>
        </div>
        {Object.keys(tournamentTeamState.teams).map((key: string) => (
          <TeamCard
            key={key}
            url={baseTournamentUrl}
            tournamentTeam={tournamentTeamState.teams[key]}
            onDeleteTeam={deleteTeam}
          />
        ))}
      </div>
    </div>
  );
};

export const Wrapper: React.FC<{
  deleteTeam: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: PhaseEntity;
  tournamentPhaseState: PhaseState;
  tournamentState: PhaseEliminationState;
  tournamentTeamState: TeamState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTeam,
  phase,
  tournamentPhaseState,
  tournamentState,
  tournamentTeamState
}) => {
  return (
    <List
      currentOrganizationSlug={currentOrganizationSlug}
      currentTournamentSlug={currentTournamentSlug}
      deleteTeam={deleteTeam}
      phase={phase}
      tournamentPhaseState={tournamentPhaseState}
      tournamentState={tournamentState}
      tournamentTeamState={tournamentTeamState}
    />
  );
};

export default Wrapper;
