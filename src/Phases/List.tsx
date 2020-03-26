import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DraggableItem, { DragTypes } from '../Shared/UI/DnD/DraggableItem';
import withDraggableList, {
  DraggableListProps
} from '../Shared/UI/DnD/withDraggableList';
import { PhaseEntity } from './state';
import Shimmer from '../Shared/UI/Shimmer';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';

const LoadingCard: React.FC = () => (
  <div className="card item">
    <div className="card-header">
      <div className="card-header-title">
        <Shimmer>
          <div
            style={{
              height: '13px',
              marginTop: '13px',
              width: '250px'
            }}
          ></div>
        </Shimmer>
      </div>
    </div>
  </div>
);

export const ListLoading: React.FC = () => (
  <div>
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </div>
);

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
          to={`${url}/EditPhase/${tournamentPhase.id}`}
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

          <DoubleClickButton
            className="button is-text"
            onClick={() => onDeletePhase(tournamentPhase)}
          >
            <i className="fas fa-trash" />
          </DoubleClickButton>
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

export const List: React.FC<PhaseListProps> = ({
  organizationSlug,
  tournamentSlug,
  deletePhase,
  patchPhase,
  phases
}) => {
  const baseTournamentUrl = `/${organizationSlug}/${tournamentSlug}`;
  return (
    <Fragment>
      {phases.map((phase: PhaseEntity, index: number) => (
        <PhaseCard
          key={phase.id}
          url={baseTournamentUrl}
          tournamentPhase={phase}
          onDeletePhase={deletePhase}
          order={index + 1}
          onPatchPhase={patchPhase}
        />
      ))}
    </Fragment>
  );
};

export default List;
