import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
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
import Home from '../Tournaments/Home';
import { phaseById, phaseLoading } from '../Tournaments/Phases/selectors';
import {
  TournamentPhaseEntity,
  TournamentPhaseState
} from '../Tournaments/Phases/state';
import {
  tournamentLoading,
  tournamentsLoading
} from '../Tournaments/selectors';
import { TournamentState } from '../Tournaments/state';
import { TournamentStatState } from '../Tournaments/Stats/state';
import { TournamentTeamState } from '../Tournaments/Teams/state';
import { TournamentPhaseHomeMatchProps } from './support/routerInterfaces';

interface TournamentPhaseHomeProps
  extends RouteComponentProps<TournamentPhaseHomeMatchProps> {
  loadDefaultPhasePayload: (payload: LoadDefaultPhasePayload) => {};
  loadPhasePayload: (payload: LoadPhasePayload) => {};
  phase: TournamentPhaseEntity | undefined;
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

class TournamentPhaseHome extends React.Component<TournamentPhaseHomeProps> {
  render() {
    const {
      match,
      phase,
      tournamentsLoading,
      tournamentLoading,
      phaseLoading,
      gamesLoading,
      tournamentPhaseState,
      tournamentState,
      tournamentGameState,
      tournamentGroupState,
      tournamentTeamState,
      tournamentStatState
    } = this.props;
    if (!phase) {
      return (
        <PageLoader canRender={false}>
          <div></div>
        </PageLoader>
      );
    }
    const canRender =
      tournamentState.tournaments[match.params.tournamentSlug] &&
      (!tournamentsLoading &&
        !tournamentLoading &&
        !phaseLoading &&
        !gamesLoading);
    return (
      <PageLoader canRender={canRender}>
        <Home
          currentOrganizationSlug={match.params.organizationSlug}
          currentTournamentSlug={match.params.tournamentSlug}
          phase={phase}
          tournamentPhaseState={tournamentPhaseState}
          tournamentState={tournamentState}
          tournamentGameState={tournamentGameState}
          tournamentGroupState={tournamentGroupState}
          tournamentTeamState={tournamentTeamState}
          tournamentStatState={tournamentStatState}
        />
      </PageLoader>
    );
  }

  componentDidMount() {
    const {
      organizationSlug,
      tournamentSlug,
      phaseId
    } = this.props.match.params;
    this.props.loadPhasePayload({
      organizationSlug,
      tournamentSlug,
      phaseId
    });
  }
}

const mapStateToProps = (
  state: StoreState,
  props: TournamentPhaseHomeProps
) => ({
  tournamentsLoading: tournamentsLoading(state.tournaments),
  tournamentLoading: tournamentLoading(state.tournaments),
  phaseLoading: phaseLoading(state.tournamentPhases),
  gamesLoading: gamesLoading(state.tournamentGames),
  phase: phaseById(state.tournamentPhases, props.match.params.phaseId),
  tournamentPhaseState: state.tournamentPhases,
  tournamentState: state.tournaments,
  tournamentGameState: state.tournamentGames,
  tournamentGroupState: state.tournamentGroups,
  tournamentTeamState: state.tournamentTeams,
  tournamentStatState: state.tournamentStats
});

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
)(TournamentPhaseHome);
