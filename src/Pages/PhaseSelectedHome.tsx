import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import PageLoader from '../Shared/UI/PageLoader';
import { StoreState } from '../store';
import TopLevel from '../Tournaments/Common/TopLevel';
import { phaseById, phaseLoading } from '../Tournaments/Phases/selectors';
import { TournamentPhaseEntity } from '../Tournaments/Phases/state';
import { tournamentBySlug } from '../Tournaments/selectors';
import { TournamentEntity } from '../Tournaments/state';
import { TournamentPhaseHomeMatchProps } from './support/routerInterfaces';
import withPhase from './support/withPhase';

interface PhaseSelectedHomeProps
  extends RouteComponentProps<TournamentPhaseHomeMatchProps> {
  phase: TournamentPhaseEntity | undefined;
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
      phaseLoading,
      tournament
    } = this.props;
    return (
      <PageLoader canRender={!phaseLoading}>
        <TopLevel
          {...{
            organizationSlug,
            phase: phase!,
            tournament,
            tournamentSlug
          }}
        />
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
    tournament: tournamentBySlug(state.tournaments, tournamentSlug),
    phase: phaseById(state.tournamentPhases, props.match.params.phaseId),
    phaseLoading: phaseLoading(state.tournamentPhases)
  };
};

export default withPhase(connect(mapStateToProps)(PhaseSelectedHome));
