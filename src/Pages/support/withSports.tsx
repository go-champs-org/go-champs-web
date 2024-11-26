import React, { useEffect } from 'react';
import { AnyAction, Dispatch } from 'redux';

interface WithSportsProps {
  getSports: () => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withSports = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithSports: React.FC<T & WithSportsProps> = props => {
    const { getSports } = props;

    useEffect(() => {
      getSports();

      return () => undefined;
    }, [getSports]);

    return <WrappedComponent {...props} />;
  };

  return WithSports;
};

export default withSports;
