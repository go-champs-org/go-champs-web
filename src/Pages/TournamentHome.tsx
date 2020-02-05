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

const mapStateToProps = (
  state: StoreState,
  props: RouteComponentProps<RouteProps>
) => ({
  tournament: tournamentBySlug(
    state.tournaments,
    props.match.params.tournamentSlug
  ),
  tournamentLoading: tournamentLoading(state.tournaments)
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

const TournamentHome: React.FC<TournamentHomeProps> = () => {
  return (
    <div>
      <Switch>
        <Route
          path={`/:organizationSlug/:tournamentSlug/empty`}
          component={PhaseNotFound}
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
