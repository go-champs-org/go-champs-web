import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
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
  url: string;
  tournamentPhase: PhaseEntity;
  onMoveDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMoveUp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({ onDeletePhase, url, tournamentPhase, onMoveDown, onMoveUp }) => {
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
          <button className="button is-text" onClick={onMoveUp}>
            <i className="fas fa-arrow-up" />
          </button>

          <button className="button is-text" onClick={onMoveDown}>
            <i className="fas fa-arrow-down" />
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
  onMoveDown: (
    index: number
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMoveUp: (
    index: number
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  organizationSlug: string;
  phases: PhaseEntity[];
  tournamentSlug: string;
}

export const List: React.FC<PhaseListProps> = ({
  deletePhase,
  phases,
  onMoveDown,
  onMoveUp,
  organizationSlug,
  tournamentSlug
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
          onMoveDown={onMoveDown(index)}
          onMoveUp={onMoveUp(index)}
        />
      ))}
    </Fragment>
  );
};

export default List;
