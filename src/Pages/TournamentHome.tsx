import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { StoreState } from '../store';
import { tournamentLoading, tournamentBySlug } from '../Tournaments/selectors';
import { getTournamentBySlug } from '../Tournaments/effects';
import PhaseDefaultRedirect from './PhaseDefaultRedirect';
import PhaseNotFound from './PhaseNotFound';
import { RouteProps } from './support/routerInterfaces';
import withTournament from './support/withTournament';
import { Dispatch, bindActionCreators } from 'redux';
import TopLevel, { LoadingTopLevel } from '../Tournaments/Common/TopLevel';
import ComponentLoader from '../Shared/UI/ComponentLoader';
import TournamentEdit from './TournamentEdit';
import PhaseList from './PhaseList';
import PhaseNew from './PhaseNew';
import PhaseEdit from './PhaseEdit';
import TeamList from './TeamList';
import TeamNew from './TeamNew';

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => ({
  organizationSlug: props.match.params.organizationSlug || '',
  tournament: tournamentBySlug(
    state.tournaments,
    props.match.params.tournamentSlug
  ),
  tournamentLoading: tournamentLoading(state.tournaments),
  tournamentSlug: props.match.params.tournamentSlug || ''
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getTournamentBySlug
    },
    dispatch
  );

const connector = connect(mapStateToProps, mapDispatchToProps);

type TournamentHomeProps = ConnectedProps<typeof connector>;

const TournamentHome: React.FC<TournamentHomeProps> = ({
  organizationSlug,
  tournament,
  tournamentLoading,
  tournamentSlug
}) => {
  return (
    <div className="columns is-multiline">
      <header className="column is-12">
        <ComponentLoader
          canRender={!tournamentLoading}
          loader={<LoadingTopLevel />}
        >
          <TopLevel
            organizationSlug={organizationSlug}
            tournamentSlug={tournamentSlug}
            tournament={tournament}
          />
        </ComponentLoader>
      </header>

      <Switch>
        <Route
          path={`/:organizationSlug/:tournamentSlug/empty`}
          component={PhaseNotFound}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Edit`}
          component={TournamentEdit}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/EditPhase/:phaseId`}
          component={PhaseEdit}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/NewPhase`}
          component={PhaseNew}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/NewTeam`}
          component={TeamNew}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Phases`}
          component={PhaseList}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug/Teams`}
          component={TeamList}
        />
        <Route
          path={`/:organizationSlug/:tournamentSlug`}
          component={PhaseDefaultRedirect}
        />
      </Switch>
    </div>
  );
};

export default connector(withTournament<TournamentHomeProps>(TournamentHome));
