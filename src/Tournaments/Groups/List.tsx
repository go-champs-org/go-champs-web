import React from 'react';
import { Link } from 'react-router-dom';
import Top from '../Common/Top';
import { TournamentPhaseEntity, TournamentPhaseState } from '../Phases/state';
import { TournamentState } from '../state';
import './List.scss';
import { TournamentGroupEntity, TournamentGroupState } from './state';

const TournamentGroupCard: React.FC<{
  onDeleteTournamentGroup: any;
  url: string;
  tournamentGroup: TournamentGroupEntity;
}> = ({ onDeleteTournamentGroup, url, tournamentGroup }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`${url}/PhaseGroupEdit/${tournamentGroup.id}`}
      >
        <span className="title is-6">{tournamentGroup.name}</span>
      </Link>
      <div className="card-header-icon">
        <button
          className="button is-text"
          onClick={() => onDeleteTournamentGroup(tournamentGroup)}
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
  deleteTournamentGroup: any;
  phase: TournamentPhaseEntity;
  tournamentGroupState: TournamentGroupState;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentGroup,
  phase,
  tournamentGroupState,
  tournamentPhaseState,
  tournamentState
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <Top
          organizationSlug={currentOrganizationSlug}
          phase={phase}
          tournament={tournament}
          tournamentPhases={tournamentPhaseState.tournamentPhases}
          tournamentSlug={currentTournamentSlug}
        />
      </header>
      <div className="column is-8">
        <div className="columns is-mobile is-vcentered">
          <div className="column is-8">
            <h2 className="subtitle">Groups</h2>
          </div>
          <div className="column is-4 has-text-right">
            <Link className="button" to={`./PhaseGroupNew`}>
              New group
            </Link>
          </div>
        </div>
        {Object.keys(tournamentGroupState.tournamentGroups).map(
          (key: string) => (
            <TournamentGroupCard
              key={key}
              url={baseTournamentUrl}
              tournamentGroup={tournamentGroupState.tournamentGroups[key]}
              onDeleteTournamentGroup={deleteTournamentGroup}
            />
          )
        )}
      </div>
    </div>
  );
};

export const Wrapper: React.FC<{
  deleteTournamentGroup: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  phase: TournamentPhaseEntity;
  tournamentState: TournamentState;
  tournamentGroupState: TournamentGroupState;
  tournamentPhaseState: TournamentPhaseState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentGroup,
  phase,
  tournamentState,
  tournamentGroupState,
  tournamentPhaseState
}) => {
  return (
    <List
      currentOrganizationSlug={currentOrganizationSlug}
      currentTournamentSlug={currentTournamentSlug}
      deleteTournamentGroup={deleteTournamentGroup}
      phase={phase}
      tournamentState={tournamentState}
      tournamentGroupState={tournamentGroupState}
      tournamentPhaseState={tournamentPhaseState}
    />
  );
};

export default Wrapper;
