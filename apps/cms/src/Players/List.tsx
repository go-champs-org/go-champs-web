import React from 'react';
import { Link } from 'react-router-dom';
import Shimmer from '../Shared/UI/Shimmer';
import { PlayerEntity } from './state';
import { AnyAction, Dispatch } from 'redux';
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

const PlayerCard: React.FC<{
  deletePlayer: (
    player: PlayerEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  player: PlayerEntity;
  tournamentSlug: string;
}> = ({ deletePlayer, organizationSlug, player, tournamentSlug }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`/${organizationSlug}/${tournamentSlug}/EditPlayer/${player.id}`}
      >
        <span className="title is-6">{player.name}</span>
      </Link>

      <div className="card-header-icon">
        <DoubleClickButton
          className="button is-text"
          onClick={() => deletePlayer(player)}
        >
          <i className="fas fa-trash" />
        </DoubleClickButton>
      </div>
    </div>
  </div>
);

export const List: React.FC<{
  deletePlayer: (
    player: PlayerEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  organizationSlug: string;
  players: PlayerEntity[];
  tournamentSlug: string;
}> = ({ deletePlayer, organizationSlug, players, tournamentSlug }) => (
  <div>
    {players.map((player: PlayerEntity) => (
      <PlayerCard
        key={player.id}
        deletePlayer={deletePlayer}
        organizationSlug={organizationSlug}
        player={player}
        tournamentSlug={tournamentSlug}
      />
    ))}
  </div>
);

export default List;
