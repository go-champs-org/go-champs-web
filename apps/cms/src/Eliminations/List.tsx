import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Shimmer from '../Shared/UI/Shimmer';
import { EliminationEntity } from './state';
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

const EliminationCard: React.FC<{
  baseUrl: string;
  elimination: EliminationEntity;
  deleteElimination: (
    elimination: EliminationEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  onMoveDown: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMoveUp: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  shouldDisplaySortButtons: boolean;
}> = ({
  baseUrl,
  elimination,
  deleteElimination,
  onMoveDown,
  onMoveUp,
  shouldDisplaySortButtons
}) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`${baseUrl}/EditElimination/${elimination.id}`}
      >
        <span className="title is-6">{elimination.title}</span>
      </Link>

      <div className="card-header-icon">
        {shouldDisplaySortButtons && (
          <Fragment>
            <button className="button is-text" onClick={onMoveUp}>
              <i className="fas fa-arrow-up" />
            </button>

            <button className="button is-text" onClick={onMoveDown}>
              <i className="fas fa-arrow-down" />
            </button>
          </Fragment>
        )}

        <DoubleClickButton
          className="button is-text"
          onClick={() => deleteElimination(elimination)}
        >
          <i className="fas fa-trash" />
        </DoubleClickButton>
      </div>
    </div>
  </div>
);

export const List: React.FC<{
  baseUrl: string;
  deleteElimination: (
    elimination: EliminationEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  eliminations: EliminationEntity[];
  shouldDisplaySortButtons: boolean;
  onMoveDown: (
    index: number
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMoveUp: (
    index: number
  ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = ({
  baseUrl,
  deleteElimination,
  eliminations,
  onMoveDown,
  onMoveUp,
  shouldDisplaySortButtons
}) => (
  <div>
    {eliminations.map((elimination: EliminationEntity, index: number) => (
      <EliminationCard
        key={elimination.id}
        baseUrl={baseUrl}
        deleteElimination={deleteElimination}
        elimination={elimination}
        shouldDisplaySortButtons={shouldDisplaySortButtons}
        onMoveDown={onMoveDown(index)}
        onMoveUp={onMoveUp(index)}
      />
    ))}
  </div>
);

export default List;
