import React from 'react';
import { Link } from 'react-router-dom';
import DraggableItem, { DragTypes } from '../Shared/UI/DnD/DraggableItem';
import withDraggableList, {
  DraggableListProps
} from '../Shared/UI/DnD/withDraggableList';
import { TournamentState } from '../Tournaments/state';
import { byOrder } from './compareFunctions';
import './List.scss';
import { PhaseEntity, PhaseState } from './state';

const PhaseCard: React.FC<{
  onDeletePhase: any;
  onPatchPhase: any;
  url: string;
  tournamentPhase: PhaseEntity;
  order: number;
}> = ({ onDeletePhase, url, tournamentPhase, order, onPatchPhase }) => {
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
          to={`${url}/PhaseEdit/${tournamentPhase.id}`}
        >
          <span className="title is-6">{tournamentPhase.title}</span>
        </Link>
        <div className="card-header-icon">
          <button
            className="button is-text"
            onClick={() => onPatchPhase(tournamentPhaseWithOrder)}
          >
            Save order (Temp)
          </button>
          <button
            className="button is-text"
            onClick={() => onDeletePhase(tournamentPhase)}
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface WrapperProps extends DraggableListProps<PhaseEntity> {
  deletePhase: any;
  patchPhase: any;
  phase: PhaseEntity;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  tournamentPhaseState: PhaseState;
  tournamentState: TournamentState;
}

export const List: React.FC<WrapperProps> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deletePhase,
  patchPhase,
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
            <Link className="button" to={`./PhaseNew`}>
              New phase
            </Link>
          </div>
        </div>
        {sortedItems.map((phase: PhaseEntity, index: number) => (
          <DraggableItem
            index={index}
            key={phase.id}
            moveItem={moveItem}
            type={DragTypes.PHASE}
          >
            <PhaseCard
              url={baseTournamentUrl}
              tournamentPhase={phase}
              onDeletePhase={deletePhase}
              order={index + 1}
              onPatchPhase={patchPhase}
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
  deletePhase,
  patchPhase,
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
      deletePhase={deletePhase}
      patchPhase={patchPhase}
      phase={phase}
      tournamentPhaseState={tournamentPhaseState}
      tournamentState={tournamentState}
      moveItem={moveItem}
      sortedItems={sortedItems}
    />
  );
};

interface StateProps {
  tournamentPhaseState: PhaseState;
}

export default withDraggableList<PhaseEntity>({
  getInitialItems: (props: StateProps) => {
    return Object.keys(props.tournamentPhaseState.phases)
      .map((key: string) => props.tournamentPhaseState.phases[key])
      .sort(byOrder);
  }
})(Wrapper);
