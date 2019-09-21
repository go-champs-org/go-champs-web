import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { LoadDefaultPhasePayload } from '../Shared/store/routerActions';
import PageLoader from '../Shared/UI/PageLoader';
import { StoreState } from '../store';
import { tournamentLoading } from '../Tournaments/selectors';
import PhaseDefaultRedirect from './PhaseDefaultRedirect';
import PhaseNotFound from './PhaseNotFound';
import PhaseSelectedHome from './PhaseSelectedHome';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournament from './support/withTournament';

interface TournamentHomeProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  loadDefaultPhasePayload: (payload: LoadDefaultPhasePayload) => {};
  tournamentLoading: boolean;
}

class TournamentHome extends React.Component<TournamentHomeProps> {
  render() {
    const { match, tournamentLoading } = this.props;

    return (
      <PageLoader canRender={!tournamentLoading}>
        <Switch>
          <Route
            path={`/:organizationSlug/:tournamentSlug/empty`}
            component={PhaseNotFound}
          />
          <Route
            path={`/:organizationSlug/:tournamentSlug/phase/:phaseId`}
            component={PhaseSelectedHome}
          />
          <Route path={match.url} component={PhaseDefaultRedirect} />
        </Switch>
      </PageLoader>
    );
  }
}

const mapStateToProps = (state: StoreState, props: TournamentHomeProps) => {
  const {
    match: {
      params: { tournamentSlug }
    }
  } = props;
  return {
    tournamentLoading: tournamentLoading(state.tournaments, tournamentSlug)
  };
};

export default withTournament(connect(mapStateToProps)(TournamentHome));
