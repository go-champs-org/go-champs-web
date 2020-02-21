import React from 'react';
import { Link } from 'react-router-dom';
import Shimmer from '../Shared/UI/Shimmer';
import { DrawEntity } from './state';
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

const DrawCard: React.FC<{
  baseUrl: string;
  draw: DrawEntity;
  deleteDraw: (
    draw: DrawEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}> = ({ baseUrl, draw, deleteDraw }) => (
  <div className="card item">
    <div className="card-header">
      <Link className="card-header-title" to={`${baseUrl}/EditDraw/${draw.id}`}>
        <span className="title is-6">{draw.title}</span>
      </Link>

      <div className="card-header-icon">
        <button className="button is-text" onClick={() => deleteDraw(draw)}>
          <i className="fas fa-trash" />
        </button>
      </div>
    </div>
  </div>
);

export const List: React.FC<{
  baseUrl: string;
  deleteDraw: (
    draw: DrawEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  draws: DrawEntity[];
}> = ({ baseUrl, deleteDraw, draws }) => (
  <div>
    {draws.map((draw: DrawEntity) => (
      <DrawCard
        key={draw.id}
        baseUrl={baseUrl}
        deleteDraw={deleteDraw}
        draw={draw}
      />
    ))}
  </div>
);

export default List;
