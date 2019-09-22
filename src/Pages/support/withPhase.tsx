import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { StoreState } from '../../store';
import { requestTournamentGames } from '../../Tournaments/Games/actions';
import { requestTournamentPhase } from '../../Tournaments/Phases/actions';
import { tournamentBySlug } from '../../Tournaments/selectors';
import { TournamentEntity } from '../../Tournaments/state';
import { TournamentPhaseHomeMatchProps } from './routerInterfaces';

interface WithPhaseProps
  extends RouteComponentProps<TournamentPhaseHomeMatchProps> {
  requestTournamentPhase: (tournamentId: string, phaseId: string) => {};
  requestTournamentGames: (phaseId: string) => {};
  tournament: TournamentEntity;
}

const withPhase = (WrappedComponent: any) => {
  class WithPhase extends React.Component<WithPhaseProps> {
    render() {
      return <WrappedComponent {...this.props} />;
    }

    componentDidMount() {
      const {
        tournament,
        match: {
          params: { phaseId }
        }
      } = this.props;
      this.props.requestTournamentPhase(tournament.id, phaseId);
      this.props.requestTournamentGames(phaseId);
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
        requestTournamentGames,
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
