import React from 'react';
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

export const withPhase = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  class WithPhase extends React.Component<T & WithNewPhaseProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      if (this.props.phaseId) {
        this.props.getPhase(this.props.phaseId);
        this.props.getGamesByFilter({ phase_id: this.props.phaseId });
      }
    }
  }

  return WithPhase;
};

export default withPhase;
