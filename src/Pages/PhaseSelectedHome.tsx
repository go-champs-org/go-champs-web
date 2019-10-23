import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { phaseLoading, selectedPhase, sortedPhases } from '../Phases/selectors';
import { PhaseEntity } from '../Phases/state';
import PageLoader from '../Shared/UI/PageLoader';
import { StoreState } from '../store';
import Top from '../Tournaments/Common/Top';
import { tournamentBySlug } from '../Tournaments/selectors';
import { TournamentEntity } from '../Tournaments/state';
import PhaseHome from './PhaseHome';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withPhase from './support/withPhase';

interface PhaseSelectedHomeProps
  extends RouteComponentProps<TournamentHomeMatchProps> {
  phase: PhaseEntity | undefined;
  phases: PhaseEntity[];
  phaseLoading: boolean;
  tournament: TournamentEntity;
}

class PhaseSelectedHome extends React.Component<PhaseSelectedHomeProps> {
  render() {
    const {
      match: {
        params: { organizationSlug, tournamentSlug }
      },
      phase,
      phases,
      phaseLoading,
      tournament
    } = this.props;
    return (
      <PageLoader canRender={!phaseLoading}>
        <div className="columns is-multiline">
          <header className="column is-12">
            <Top
              {...{
                organizationSlug,
                phase: phase!,
                phases,
                tournament,
                tournamentSlug
              }}
            />
          </header>
          <div className="column is-12">
            <Switch>
              <Route
                path={`/:organizationSlug/:tournamentSlug`}
                component={PhaseHome}
              />
            </Switch>
          </div>
        </div>
      </PageLoader>
    );
  }
}

const mapStateToProps = (state: StoreState, props: PhaseSelectedHomeProps) => {
  const {
    match: {
      params: { tournamentSlug }
    }
  } = props;
  return {
    phase: selectedPhase(state.phases),
    phases: sortedPhases(state.phases),
    phaseLoading: phaseLoading(state.phases),
    tournament: tournamentBySlug(state.tournaments, tournamentSlug)
  };
};

export default withPhase(connect(mapStateToProps)(PhaseSelectedHome));
