import React from 'react';
import { Link } from 'react-router-dom';
import Shimmer from '../Shared/UI/Shimmer';
import { FixedPlayerStatsTableEntity } from './state';
import { AnyAction, Dispatch } from 'redux';
import DoubleClickButton from '../Shared/UI/DoubleClickButton';
import { PlayerStatMap } from '../Tournaments/state';

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

const FixedPlayerStatsTableCard: React.FC<{
  deleteFixedPlayerStatsTable: (
    fixedPlayerStatsTable: FixedPlayerStatsTableEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  fixedPlayerStatsTable: FixedPlayerStatsTableEntity;
  playerStatsMap: PlayerStatMap;
  tournamentSlug: string;
}> = ({
  deleteFixedPlayerStatsTable,
  organizationSlug,
  fixedPlayerStatsTable,
  playerStatsMap,
  tournamentSlug
}) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`/${organizationSlug}/${tournamentSlug}/EditFixedPlayerStatsTable/${fixedPlayerStatsTable.id}`}
      >
        <span className="title is-6">
          {playerStatsMap[fixedPlayerStatsTable.statId] ||
            playerStatsMap[fixedPlayerStatsTable.statId].title}
        </span>
      </Link>

      <div className="card-header-icon">
        <DoubleClickButton
          className="button is-text"
          onClick={() => deleteFixedPlayerStatsTable(fixedPlayerStatsTable)}
        >
          <i className="fas fa-trash" />
        </DoubleClickButton>
      </div>
    </div>
  </div>
);

export const List: React.FC<{
  deleteFixedPlayerStatsTable: (
    fixedPlayerStatsTable: FixedPlayerStatsTableEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  fixedPlayerStatsTables: FixedPlayerStatsTableEntity[];
  playerStatsMap: PlayerStatMap;
  tournamentSlug: string;
}> = ({
  deleteFixedPlayerStatsTable,
  organizationSlug,
  fixedPlayerStatsTables,
  playerStatsMap,
  tournamentSlug
}) => (
  <div>
    {fixedPlayerStatsTables.map(
      (fixedPlayerStatsTable: FixedPlayerStatsTableEntity) => (
        <FixedPlayerStatsTableCard
          key={fixedPlayerStatsTable.id}
          deleteFixedPlayerStatsTable={deleteFixedPlayerStatsTable}
          organizationSlug={organizationSlug}
          fixedPlayerStatsTable={fixedPlayerStatsTable}
          playerStatsMap={playerStatsMap}
          tournamentSlug={tournamentSlug}
        />
      )
    )}
  </div>
);

export default List;
