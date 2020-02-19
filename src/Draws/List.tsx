import React from 'react';
import { DrawEntity } from './state';
import { Dispatch, AnyAction } from 'redux';

export const ListLoading: React.FC = () => <div>Loading</div>;

const List: React.FC<{
  baseUrl: string;
  deleteDraw: (
    game: DrawEntity
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  draws: DrawEntity[];
}> = () => <div>Draw list</div>;

export default List;
