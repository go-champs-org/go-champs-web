import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { getGamesByFilter } from '../../Games/effects';
import { getPhase } from '../../Phases/effects';
import { RequestFilter } from '../../Shared/httpClient/requestFilter';
import { StoreState } from '../../store';
import { tournamentBySlug } from '../../Tournaments/selectors';
import { TournamentEntity } from '../../Tournaments/state';
import { PhaseHomeMatchProps } from './routerInterfaces';

interface WithPhaseProps extends RouteComponentProps<PhaseHomeMatchProps> {
  getPhase: (phaseId: string) => {};
  getGamesByFilter: (where: RequestFilter) => {};
  tournament: TournamentEntity;
}

const withPhase = (WrappedComponent: any) => {
  class WithPhase extends React.Component<WithPhaseProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      const {
        match: {
          params: { phaseId }
        }
      } = this.props;
      this.props.getPhase(phaseId);
      this.props.getGamesByFilter({ phase_id: phaseId });
    }
  }

  const mapStateToProps = (state: StoreState, props: WithPhaseProps) => {
    const {
      match: {
        params: { tournamentSlug }
      }
    } = props;
    return {
      tournament: tournamentBySlug(state.tournaments, tournamentSlug)
    };
  };

  const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
      {
        getGamesByFilter,
        getPhase
      },
      dispatch
    );
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithPhase);
};

export default withPhase;
