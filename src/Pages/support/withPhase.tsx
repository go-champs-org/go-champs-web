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

const withPhase = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  class WithPhase extends React.Component<T & WithNewPhaseProps> {
    state = { currentPhaseId: '' };
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      if (this.props.phaseId !== this.state.currentPhaseId) {
        this.props.getPhase(this.props.phaseId);
        this.props.getGamesByFilter({ phase_id: this.props.phaseId });
        this.setState({
          currentPhaseId: this.props.phaseId
        });
      }
    }

    componentDidUpdate() {
      if (this.props.phaseId !== this.state.currentPhaseId) {
        this.props.getPhase(this.props.phaseId);
        this.props.getGamesByFilter({ phase_id: this.props.phaseId });
        this.setState({
          currentPhaseId: this.props.phaseId
        });
      }
    }
  }

  return WithPhase;
};

export default withPhase;
