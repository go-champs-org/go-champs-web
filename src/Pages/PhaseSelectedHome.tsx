import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { StoreState } from '../store';
import { requestTournamentPhase } from '../Tournaments/Phases/actions';
import { tournamentBySlug } from '../Tournaments/selectors';
import { TournamentEntity } from '../Tournaments/state';
import { TournamentPhaseHomeMatchProps } from './support/routerInterfaces';

interface PhaseSelectedHomeProps
  extends RouteComponentProps<TournamentPhaseHomeMatchProps> {
  requestTournamentPhase: (tournamentId: string, phaseId: string) => {};
  tournament: TournamentEntity;
}

class PhaseSelectedHome extends React.Component<PhaseSelectedHomeProps> {
  render() {
    return <div>PhaseSelectedHome</div>;
  }

  componentDidMount() {
    const {
      tournament,
      match: {
        params: { phaseId }
      }
    } = this.props;
    this.props.requestTournamentPhase(tournament.id, phaseId);
  }
}

const mapStateToProps = (state: StoreState, props: PhaseSelectedHomeProps) => {
  const {
    match: {
      params: { tournamentSlug }
    }
  } = props;
  return {
    tournament: tournamentBySlug(state.tournaments, tournamentSlug)
  };
};

const mapDispatchToProps = (dispatch: any, state: any) => {
  return bindActionCreators(
    {
      requestTournamentPhase
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhaseSelectedHome);
