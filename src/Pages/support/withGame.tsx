import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { AnyAction, Dispatch } from 'redux';

interface WithGameProps {
  getGame: (gameId: string) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withGame = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithGame: React.FC<T & WithGameProps> = props => {
    const { getGame } = props;
    const {
      params: { gameId }
    } = useRouteMatch();
    useEffect(() => {
      if (gameId) {
        getGame(gameId);
      }

      return () => undefined;
    }, [gameId, getGame]);

    return <WrappedComponent {...props} />;
  };

  return WithGame;
};

export default withGame;
