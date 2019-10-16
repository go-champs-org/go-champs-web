import React from 'react';
import { Link } from 'react-router-dom';
import DraggableItem, { DragTypes } from '../Shared/UI/DnD/DraggableItem';
import withDraggableList, {
  DraggableListProps
} from '../Shared/UI/DnD/withDraggableList';
import { TournamentState } from '../Tournaments/state';
import { byOrder } from './compareFunctions';
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
  phase: TournamentPhaseEntity;
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
  phase,
  tournamentPhaseState,
  tournamentState,
  sortedItems,
  moveItem
}) => {
  const tournament = tournamentState.tournaments[currentTournamentSlug];
  const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;

  return (
    <div className="columns is-multiline">
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
  phase,
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
      phase={phase}
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
    return Object.keys(props.tournamentPhaseState.tournamentPhases)
      .map((key: string) => props.tournamentPhaseState.tournamentPhases[key])
      .sort(byOrder);
  }
})(Wrapper);
