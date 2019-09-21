import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  loadDefaultPhasePayload,
  LoadDefaultPhasePayload,
  loadPhasePayload,
  LoadPhasePayload
} from '../Shared/store/routerActions';
import PageLoader from '../Shared/UI/PageLoader';
import { StoreState } from '../store';
import { gamesLoading } from '../Tournaments/Games/selectors';
import { TournamentGameState } from '../Tournaments/Games/state';
import { TournamentGroupState } from '../Tournaments/Groups/state';
import {
  isInProgressPhase,
  phaseLoading
} from '../Tournaments/Phases/selectors';
import {
  TournamentPhaseEntity,
  TournamentPhaseState
} from '../Tournaments/Phases/state';
import {
  tournamentBySlug,
  tournamentLoading,
  tournamentsLoading
} from '../Tournaments/selectors';
import { TournamentEntity, TournamentState } from '../Tournaments/state';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { TournamentTeamState } from '../Tournaments/Teams/state';
import PhaseDefaultRedirect from './PhaseDefaultRedirect';
import PhaseSelectedHome from './PhaseSelectedHome';
import { TournamentHomeMatchProps } from './support/routerInterfaces';

interface TournamentHomeProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  loadDefaultPhasePayload: (payload: LoadDefaultPhasePayload) => {};
  loadPhasePayload: (payload: LoadPhasePayload) => {};
  phase: TournamentPhaseEntity | undefined;
  tournament: TournamentEntity | undefined;
  tournamentsLoading: boolean;
  tournamentLoading: boolean;
  phaseLoading: boolean;
  gamesLoading: boolean;
  tournamentPhaseState: TournamentPhaseState;
  tournamentState: TournamentState;
  tournamentGameState: TournamentGameState;
  tournamentGroupState: TournamentGroupState;
  tournamentTeamState: TournamentTeamState;
  tournamentStatState: TournamentStatState;
}

class TournamentHome extends React.Component<TournamentHomeProps> {
  render() {
    const { match, tournamentLoading } = this.props;
    return (
      <PageLoader canRender={!tournamentLoading}>
        <Switch>
          <Route
            path={`${match.url}/phase/:phaseId`}
            component={PhaseSelectedHome}
          />
          <Route path={match.url} component={PhaseDefaultRedirect} />
        </Switch>
      </PageLoader>
    );
  }

  componentDidMount() {
    const { organizationSlug, tournamentSlug } = this.props.match.params;
    this.props.loadDefaultPhasePayload({ organizationSlug, tournamentSlug });
  }
}

const mapStateToProps = (state: StoreState, props: TournamentHomeProps) => {
  const {
    match: {
      params: { tournamentSlug }
    }
  } = props;
  return {
    tournamentsLoading: tournamentsLoading(state.tournaments),
    tournamentLoading: tournamentLoading(state.tournaments, tournamentSlug),
    phaseLoading: phaseLoading(state.tournamentPhases),
    gamesLoading: gamesLoading(state.tournamentGames),
    phase: isInProgressPhase(state.tournamentPhases),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    tournamentPhaseState: state.tournamentPhases,
    tournamentState: state.tournaments,
    tournamentGameState: state.tournamentGames,
    tournamentGroupState: state.tournamentGroups,
    tournamentTeamState: state.tournamentTeams,
    tournamentStatState: state.tournamentStats
  };
};

const mapDispatchToProps = (dispatch: any, state: any) => {
  return bindActionCreators(
    {
      loadDefaultPhasePayload,
      loadPhasePayload
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TournamentHome);
