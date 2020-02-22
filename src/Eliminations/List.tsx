import React from 'react';
import { Link } from 'react-router-dom';
import Shimmer from '../Shared/UI/Shimmer';
import { EliminationEntity } from './state';
import { AnyAction, Dispatch } from 'redux';

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
}> = ({ baseUrl, elimination, deleteElimination }) => (
  <div className="card item">
    <div className="card-header">
      <Link
        className="card-header-title"
        to={`${baseUrl}/EditElimination/${elimination.id}`}
      >
        <span className="title is-6">{elimination.title}</span>
      </Link>

      <div className="card-header-icon">
        <button
          className="button is-text"
          onClick={() => deleteElimination(elimination)}
        >
          <i className="fas fa-trash" />
        </button>
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
}> = ({ baseUrl, deleteElimination, eliminations }) => (
  <div>
    {eliminations.map((elimination: EliminationEntity) => (
      <EliminationCard
        key={elimination.id}
        baseUrl={baseUrl}
        deleteElimination={deleteElimination}
        elimination={elimination}
      />
    ))}
  </div>
);

export default List;
