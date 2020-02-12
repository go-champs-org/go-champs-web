import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getGamesByFilter } from '../../Games/effects';
import { getPhase } from '../../Phases/effects';
import { currentPhaseId } from '../../Phases/selectors';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { StoreState } from '../../store';
import { RouteProps } from './routerInterfaces';

interface WithPhaseProps extends RouteComponentProps<RouteProps> {
  getPhase: (phaseId: string) => {};
  getGamesByFilter: (where: RequestFilter) => {};
  currentPhaseId: string; // TODO: Remove this property
  phaseId?: string;
}

const withPhase = (WrappedComponent: any) => {
  class WithPhase extends React.Component<WithPhaseProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      this.props.getPhase(this.props.currentPhaseId);
      this.props.getGamesByFilter({ phase_id: this.props.currentPhaseId });
    }
  }

  const mapStateToProps = (state: StoreState) => ({
    currentPhaseId: currentPhaseId(state.phases)
  });

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
      {
        getGamesByFilter,
        getPhase
      },
      dispatch
    );
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithPhase);
};

export const newWithPhase = <T extends object>(
  WrappedComponent: React.ComponentType<T>
) => {
  class WithPhase extends React.Component<T & WithPhaseProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      // TODO: Remove bang from phaseId
      this.props.getPhase(this.props.phaseId!);
      this.props.getGamesByFilter({ phase_id: this.props.phaseId! });
    }
  }

  return WithPhase;
};

export default withPhase;
