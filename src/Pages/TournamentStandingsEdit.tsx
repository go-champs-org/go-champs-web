import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { requestTournament } from '../Tournaments/actions';
import { Edit } from '../Tournaments/Standings/Edit';
import { TournamentState } from '../Tournaments/state';
import { patchTournamentTeam } from '../Tournaments/Teams/actions';
import { TournamentHomeMatchProps } from './support/routerInterfaces';
import withTournaments from './support/withTournaments';

interface TournamentStandingsEditProps
	extends RouteComponentProps<TournamentHomeMatchProps> {
	patchTournamentTeam: any;
	requestTournament: any;
	tournamentState: TournamentState;
}

class TournamentStandingsEdit extends React.Component<TournamentStandingsEditProps> {
	render() {
		return (
			<Edit
				currentOrganizationSlug={this.props.match.params.organizationSlug}
				currentTournamentSlug={this.props.match.params.tournamentSlug}
				postTournamentTeam={this.props.patchTournamentTeam}
				tournamentState={this.props.tournamentState} />
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
});

const mapDispatchToProps = (dispatch: any, state: any) => {
	const tournamentId =
		state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
	return bindActionCreators(
		{
			patchTournamentTeam: patchTournamentTeam(tournamentId),
			requestTournament
		},
		dispatch
	);
};

export default withTournaments(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(TournamentStandingsEdit)
);
