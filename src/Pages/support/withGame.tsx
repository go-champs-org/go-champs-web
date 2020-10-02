import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router';
import { AnyAction, Dispatch } from 'redux';

interface WithGameProps {
  getGame: (gameId: string) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  getTournamentBySlug: (
    organizationSlug: string,
    tournamentSlug: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withGame = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithGame: React.FC<T & WithGameProps> = props => {
    const { getGame, getTournamentBySlug } = props;
    const {
      params: { gameId, organizationSlug, tournamentSlug }
    } = useRouteMatch();
    useEffect(() => {
      if (organizationSlug && tournamentSlug && gameId) {
        getTournamentBySlug(organizationSlug, tournamentSlug);
        getGame(gameId);
      }

      return () => undefined;
    }, [
      organizationSlug,
      tournamentSlug,
      gameId,
      getGame,
      getTournamentBySlug
    ]);

    return <WrappedComponent {...props} />;
  };

  return WithGame;
};

export default withGame;
