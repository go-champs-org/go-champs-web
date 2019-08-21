import React from 'react';
import { Link } from 'react-router-dom';
import DraggableItem, { DragTypes } from '../../Shared/UI/DnD/DraggableItem';
import withDraggableList, {
  DraggableListProps
} from '../../Shared/UI/DnD/withDraggableList';
import Top from '../Common/Top';
import { TournamentState } from '../state';
import './List.scss';
import { TournamentPhaseEntity, TournamentPhaseState } from './state';

const TournamentPhaseCard: React.FC<{
  onDeleteTournamentPhase: any;
  onPatchTournamentPhase: any;
  url: string;
  tournamentPhase: TournamentPhaseEntity;
  order: number;
}> = ({
  onDeleteTournamentPhase,
  url,
  tournamentPhase,
  order,
  onPatchTournamentPhase
}) => {
  // TODO: Find better way to update order
  const tournamentPhaseWithOrder = {
    ...tournamentPhase,
    order
  };
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
            onClick={() => onPatchTournamentPhase(tournamentPhaseWithOrder)}
          >
            Save order (Temp)
          </button>
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
  patchTournamentPhase: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
}

export const List: React.FC<WrapperProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentPhase,
  patchTournamentPhase,
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
        <Top
          organizationSlug={currentOrganizationSlug}
          tournament={tournament}
          tournamentPhases={tournamentPhaseState.tournamentPhases}
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
              order={index + 1}
              onPatchTournamentPhase={patchTournamentPhase}
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
  patchTournamentPhase,
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
      patchTournamentPhase={patchTournamentPhase}
      tournamentPhaseState={tournamentPhaseState}
      tournamentState={tournamentState}
      moveItem={moveItem}
      sortedItems={sortedItems}
    />
  );
};

interface StateProps {
  tournamentPhaseState: TournamentPhaseState;
}

export default withDraggableList<TournamentPhaseEntity>({
  getInitialItems: (props: StateProps) => {
    return Object.keys(props.tournamentPhaseState.tournamentPhases).map(
      (key: string) => props.tournamentPhaseState.tournamentPhases[key]
    );
  }
})(Wrapper);
