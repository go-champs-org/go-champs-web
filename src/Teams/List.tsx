import React from 'react';
import { Link } from 'react-router-dom';
import { PhaseEntity, PhaseState } from '../Phases/state';
import { TournamentState } from '../Tournaments/state';
import './List.scss';
import { TeamEntity, TeamState } from './state';

const TeamCard: React.FC<{
  onDeleteTeam: any;
  url: string;
  team: TeamEntity;
}> = ({ onDeleteTeam, url, team }) => (
  <div className="card item">
    <div className="card-header">
      <Link className="card-header-title" to={`${url}/TeamEdit/${team.id}`}>
        <span className="title is-6">{team.name}</span>
      </Link>
      <div className="card-header-icon">
        <button className="button is-text" onClick={() => onDeleteTeam(team)}>
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
  teamState: TeamState;
  tournamentState: TournamentState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTeam,
  phase,
  tournamentPhaseState,
  teamState,
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
        {Object.keys(teamState.teams).map((key: string) => (
          <TeamCard
            key={key}
            url={baseTournamentUrl}
            team={teamState.teams[key]}
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
  tournamentState: TournamentState;
  teamState: TeamState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTeam,
  phase,
  tournamentPhaseState,
  tournamentState,
  teamState
}) => {
  return (
    <List
      currentOrganizationSlug={currentOrganizationSlug}
      currentTournamentSlug={currentTournamentSlug}
      deleteTeam={deleteTeam}
      phase={phase}
      tournamentPhaseState={tournamentPhaseState}
      tournamentState={tournamentState}
      teamState={teamState}
    />
  );
};

export default Wrapper;
