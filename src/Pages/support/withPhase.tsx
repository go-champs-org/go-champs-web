import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { requestTournamentGamesByFilter } from '../../Games/actions';
import { RequestFilter } from '../../Games/gameHttpClient';
import { requestTournamentPhase } from '../../Phases/actions';
import { StoreState } from '../../store';
import { tournamentBySlug } from '../../Tournaments/selectors';
import { TournamentEntity } from '../../Tournaments/state';
import { TournamentPhaseHomeMatchProps } from './routerInterfaces';

interface WithPhaseProps
  extends RouteComponentProps<TournamentPhaseHomeMatchProps> {
  requestTournamentPhase: (phaseId: string) => {};
  requestTournamentGamesByFilter: (where: RequestFilter) => {};
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
      this.props.requestTournamentPhase(phaseId);
      this.props.requestTournamentGamesByFilter({ phase_id: phaseId });
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
        requestTournamentGamesByFilter,
        requestTournamentPhase
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
