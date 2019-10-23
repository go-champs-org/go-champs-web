import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import PageLoader from '../Shared/UI/PageLoader';
import { StoreState } from '../store';
import { tournamentLoading } from '../Tournaments/selectors';
import PhaseSelectedHome from './PhaseSelectedHome';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournament from './support/withTournament';

interface TournamentHomeProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  tournamentLoading: boolean;
}

class TournamentHome extends React.Component<TournamentHomeProps> {
  render() {
    const { tournamentLoading } = this.props;

    return (
      <PageLoader canRender={!tournamentLoading}>
        <Switch>
          <Route
            path={`/:organizationSlug/:tournamentSlug`}
            component={PhaseSelectedHome}
          />
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
