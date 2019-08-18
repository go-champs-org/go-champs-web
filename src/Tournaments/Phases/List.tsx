import { XYCoord } from 'dnd-core';
import React, { useCallback, useRef, useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router-dom';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import './List.scss';
import { PhaseTypes, TournamentPhaseEntity, TournamentPhaseState } from './state';

const DragType = {
  PHASE: 'PHASE'
}

interface DragItem {
  index: number
  id: string
  type: string
}

const TournamentPhaseCard: React.FC<{
  onDeleteTournamentPhase: any;
  url: string;
  tournamentPhase: TournamentPhaseEntity;
  index: number;
  movePhase: any;
}> = ({ onDeleteTournamentPhase, url, tournamentPhase, index, movePhase }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: DragType.PHASE,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      movePhase(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: DragType.PHASE, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div className="card item"
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}>
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

export const List: React.FC<{
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  deleteTournamentPhase: any;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentPhase,
  tournamentPhaseState,
  tournamentState
}) => {
    const tournament = tournamentState.tournaments[currentTournamentSlug];
    const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;

    const [phases, setPhases] = useState([
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
      },
    ]);

    const movePhase = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const newPhases = [...phases];
        const dragPhase = newPhases[dragIndex];
        newPhases.splice(dragIndex, 1);
        newPhases.splice(hoverIndex, 0, dragPhase);
        setPhases(newPhases);
      },
      [phases],
    );

    console.log(phases);

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
          {phases.map(
            (phase: TournamentPhaseEntity, index: number) => (
              <TournamentPhaseCard
                key={phase.id}
                url={baseTournamentUrl}
                tournamentPhase={phase}
                onDeleteTournamentPhase={deleteTournamentPhase}
                movePhase={movePhase}
                index={index}
              />
            )
          )}
        </div>
      </div>
    );
  };

export const Wrapper: React.FC<{
  deleteTournamentPhase: any;
  currentOrganizationSlug: string;
  currentTournamentSlug: string;
  tournamentState: TournamentState;
  tournamentPhaseState: TournamentPhaseState;
}> = ({
  currentOrganizationSlug,
  currentTournamentSlug,
  deleteTournamentPhase,
  tournamentState,
  tournamentPhaseState
}) => {
    return (
      <List
        currentOrganizationSlug={currentOrganizationSlug}
        currentTournamentSlug={currentTournamentSlug}
        deleteTournamentPhase={deleteTournamentPhase}
        tournamentState={tournamentState}
        tournamentPhaseState={tournamentPhaseState}
      />
    );
  };

export default Wrapper;
