import React from 'react';
import { Link } from 'react-router-dom';
import DraggableItem, { DragTypes } from '../../Shared/UI/DnD/DraggableItem';
import withDraggableList, {
  DraggableListProps
} from '../../Shared/UI/DnD/withDraggableList';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import './List.scss';
import {
  PhaseTypes,
  TournamentPhaseEntity,
  TournamentPhaseState
} from './state';

const TournamentPhaseCard: React.FC<{
  onDeleteTournamentPhase: any;
  url: string;
  tournamentPhase: TournamentPhaseEntity;
}> = ({ onDeleteTournamentPhase, url, tournamentPhase }) => {
  return (
    <div className="card item">
      <div className="card-header">
        <Link
          className="card-header-title"
          to={`${url}/TournamentPhaseEdit/${tournamentPhase.id}`}
        >
          <span className="title is-6">{tournamentPhase.title}</span>
        </Link>
        <div className="card-header-icon">
          <button
            className="button is-text"
            onClick={() => onDeleteTournamentPhase(tournamentPhase)}
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface WrapperProps extends DraggableListProps<TournamentPhaseEntity> {
  deleteTournamentPhase: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  tournamentState: TournamentState;
  tournamentPhaseState: TournamentPhaseState;
}

export const List: React.FC<WrapperProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentPhase,
  tournamentPhaseState,
  tournamentState,
  sortedItems,
  moveItem
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
            <h2 className="subtitle">Phases</h2>
          </div>
          <div className="column is-4 has-text-right">
            <Link className="button" to={`./TournamentPhaseNew`}>
              New phase
            </Link>
          </div>
        </div>
        {sortedItems.map((phase: TournamentPhaseEntity, index: number) => (
          <DraggableItem
            index={index}
            key={phase.id}
            moveItem={moveItem}
            type={DragTypes.PHASE}
          >
            <TournamentPhaseCard
              url={baseTournamentUrl}
              tournamentPhase={phase}
              onDeleteTournamentPhase={deleteTournamentPhase}
            />
          </DraggableItem>
        ))}
      </div>
    </div>
  );
};

export const Wrapper: React.FC<WrapperProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentPhase,
  tournamentState,
  tournamentPhaseState,
  moveItem,
  sortedItems
}) => {
  return (
    <List
      currentOrganizationSlug={currentOrganizationSlug}
      currentTournamentSlug={currentTournamentSlug}
      deleteTournamentPhase={deleteTournamentPhase}
      tournamentState={tournamentState}
      tournamentPhaseState={tournamentPhaseState}
      moveItem={moveItem}
      sortedItems={sortedItems}
    />
  );
};

const mockPhases = [
  {
    id: '1',
    title: 'Returno',
    type: PhaseTypes.standings
  },
  {
    id: '2',
    title: 'Turno',
    type: PhaseTypes.standings
  },
  {
    id: '3',
    title: 'Repescagem',
    type: PhaseTypes.standings
  },
  {
    id: '4',
    title: 'Mata-a-mata',
    type: PhaseTypes.standings
  },
  {
    id: '5',
    title: 'Semifinal',
    type: PhaseTypes.standings
  },
  {
    id: '6',
    title: 'Final',
    type: PhaseTypes.standings
  }
];

export default withDraggableList<TournamentPhaseEntity>({
  getInitialItems: props => {
    console.log(props);
    return mockPhases;
  }
})(Wrapper);
