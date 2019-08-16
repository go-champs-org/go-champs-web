import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournament } from '../Tournaments/actions';
import { patchTournamentPhase } from '../Tournaments/Phases/actions';
import Edit from '../Tournaments/Phases/Edit';
import { TournamentPhaseState } from '../Tournaments/Phases/state';
import { TournamentState } from '../Tournaments/state';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentPhaseEditMatch extends TournamentHomeMatchProps {
  tournamentPhaseId: string;
}

interface TournamentPhaseEditProps
  extends RouteComponentProps<TournamentPhaseEditMatch> {
  patchTournamentPhase: any;
  requestTournament: any;
  tournamentState: TournamentState;
  tournamentPhaseState: TournamentPhaseState;
}

class TournamentPhaseEdit extends React.Component<TournamentPhaseEditProps> {
  render() {
    const tournamentPhase = this.props.tournamentPhaseState.tournamentPhases[
      this.props.match.params.tournamentPhaseId
    ];
    return (
      <Edit
        currentOrganizationSlug={this.props.match.params.organizationSlug}
        currentTournamentSlug={this.props.match.params.tournamentSlug}
        patchTournamentPhase={this.props.patchTournamentPhase}
        tournamentState={this.props.tournamentState}
        tournamentPhase={tournamentPhase}
      />
    );
  }

  componentDidMount() {
    const tournamentId = this.props.tournamentState.tournaments[
      this.props.match.params.tournamentSlug
    ].id;
    this.props.requestTournament(tournamentId);
  }
}

const mapStateToProps = (state: any) => ({
  tournamentState: state.tournaments,
  tournamentPhaseState: state.tournamentPhases
});

const mapDispatchToProps = (dispatch: any, state: any) => {
  const tournamentId =
    state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
  return bindActionCreators(
    {
      patchTournamentPhase: patchTournamentPhase(tournamentId),
      requestTournament
    },
    dispatch
  );
};

export default withTournaments(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TournamentPhaseEdit)
);
