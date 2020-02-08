import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DraggableItem, { DragTypes } from '../Shared/UI/DnD/DraggableItem';
import withDraggableList, {
  DraggableListProps
} from '../Shared/UI/DnD/withDraggableList';
import './List.scss';
import { PhaseEntity } from './state';

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

interface PhaseListProps {
  deletePhase: any;
  patchPhase: any;
  organizationSlug: string;
  tournamentSlug: string;
  phases: PhaseEntity[];
}

export const List: React.RefForwardingComponent<
  DraggableListProps<PhaseEntity>,
  PhaseListProps & DraggableListProps<PhaseEntity>
> = ({
  organizationSlug,
  tournamentSlug,
  deletePhase,
  patchPhase,
  sortedItems,
  moveItem
}) => {
  const baseTournamentUrl = `/${organizationSlug}/${tournamentSlug}`;
  return (
    <Fragment>
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
    </Fragment>
  );
};

const mapPropsToInitialItems = (props: PhaseListProps) => props.phases;

export default withDraggableList<PhaseListProps, PhaseEntity>(
  mapPropsToInitialItems
)(List);
