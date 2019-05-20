import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestTournament } from "../Tournaments/actions";
import { TournamentState } from "../Tournaments/state";
import { deleteTournamentTeam } from "../Tournaments/Teams/actions";
import { List } from "../Tournaments/Teams/List";
import { TournamentTeamState } from "../Tournaments/Teams/state";
import { TournamentHomeMatchProps } from "./support/routerInterfaces";
import withTournaments from "./support/withTournaments";

interface TournamentHomeProps extends RouteComponentProps<TournamentHomeMatchProps> {
	deleteTournamentTeam: any,
	tournamentState: TournamentState,
	tournamentTeamState: TournamentTeamState,
	requestTournament: any,
}

class TournamentHome extends React.Component<TournamentHomeProps> {
	render() {
		return (
			<div>
				<Link to={`${this.props.match.url}/TournamentEdit`}>New team</Link>
				{this.props.tournamentState.isLoadingRequestTournament ?
					<div>Loading...</div> :
					<div>{this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug] && this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug].name}</div>
				}
				<h1>Teams</h1>
				<List tournamentTeamState={this.props.tournamentTeamState} deleteTournamentTeam={this.props.deleteTournamentTeam} />
			</div>
		)
	}

	componentDidMount() {
		const tournamentId = this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug].id;
		this.props.requestTournament(tournamentId);
	}
}

const mapStateToProps = (state: any) => ({
	tournamentState: state.tournaments,
	tournamentTeamState: state.tournamentTeams,
});

const mapDispatchToProps = (dispatch: any, state: any) => {
	const tournamentId = state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
	return bindActionCreators({
		deleteTournamentTeam: deleteTournamentTeam(tournamentId),
		requestTournament,
	}, dispatch)
};

export default withTournaments(connect(mapStateToProps, mapDispatchToProps)(TournamentHome));