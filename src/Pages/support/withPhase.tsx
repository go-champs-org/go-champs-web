import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getGamesByFilter } from '../../Games/effects';
import { getPhase } from '../../Phases/effects';
import { selectedPhaseId } from '../../Phases/selectors';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { StoreState } from '../../store';
import { TournamentHomeMatchProps } from './routerInterfaces';

interface WithPhaseProps extends RouteComponentProps<TournamentHomeMatchProps> {
  getPhase: (phaseId: string) => {};
  getGamesByFilter: (where: RequestFilter) => {};
  selectedPhaseId: string;
}

const withPhase = (WrappedComponent: any) => {
  class WithPhase extends React.Component<WithPhaseProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      this.props.getPhase(this.props.selectedPhaseId);
      this.props.getGamesByFilter({ phase_id: this.props.selectedPhaseId });
    }
  }

  const mapStateToProps = (state: StoreState) => ({
    selectedPhaseId: selectedPhaseId(state.phases)
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

export default withPhase;
