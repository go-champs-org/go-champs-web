import React, { useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';

interface WithNewPhaseProps {
  phaseId: string;
  getPhase: (
    phaseId: string
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
  getGamesByFilter: (
    where: RequestFilter
  ) => (dispatch: Dispatch<AnyAction>) => Promise<void>;
}

const withPhase = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  const WithPhase: React.FC<T & WithNewPhaseProps> = props => {
    const { getGamesByFilter, getPhase, phaseId } = props;

    useEffect(() => {
      if (phaseId) {
        getPhase(phaseId);
        getGamesByFilter({ phase_id: phaseId });
      }

      return () => undefined;
    }, [getGamesByFilter, getPhase, phaseId]);

    return <WrappedComponent {...props} />;
  };

  return WithPhase;
};

export default withPhase;
