import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestTournament } from "../Tournaments/actions";
import { deleteTournamentGroup } from "../Tournaments/Groups/actions";
import { default as TournamentGroupList } from "../Tournaments/Groups/List";
import { TournamentGroupState } from "../Tournaments/Groups/state";
import { TournamentState } from "../Tournaments/state";
import { deleteTournamentTeam } from "../Tournaments/Teams/actions";
import { default as TournamentTeamList } from "../Tournaments/Teams/List";
import { TournamentTeamState } from "../Tournaments/Teams/state";
import { TournamentHomeMatchProps } from "./support/routerInterfaces";
import withTournaments from "./support/withTournaments";

interface TournamentHomeProps extends RouteComponentProps<TournamentHomeMatchProps> {
	deleteTournamentGroup: any,
	deleteTournamentTeam: any,
	tournamentState: TournamentState,
	tournamentGroupState: TournamentGroupState,
	tournamentTeamState: TournamentTeamState,
	requestTournament: any,
}

class TournamentHome extends React.Component<TournamentHomeProps> {
	render() {
		return (
			<div>
				<Link to={`${this.props.match.url}/TournamentTeamEdit`}>New team</Link>
				<Link to={`${this.props.match.url}/TournamentGroupEdit`}>New group</Link>
				{this.props.tournamentState.isLoadingRequestTournament ?
					<div>Loading...</div> :
					<div>{this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug] && this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug].name}</div>
				}
				<h1>Teams</h1>
				<TournamentTeamList tournamentTeamState={this.props.tournamentTeamState} deleteTournamentTeam={this.props.deleteTournamentTeam} />
				<h1>Groups</h1>
				<TournamentGroupList tournamentGroupState={this.props.tournamentGroupState} deleteTournamentGroup={this.props.deleteTournamentGroup} />
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
	tournamentGroupState: state.tournamentGroups,
	tournamentTeamState: state.tournamentTeams,
});

const mapDispatchToProps = (dispatch: any, state: any) => {
	const tournamentId = state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
	return bindActionCreators({
		deleteTournamentGroup: deleteTournamentGroup(tournamentId),
		deleteTournamentTeam: deleteTournamentTeam(tournamentId),
		requestTournament,
	}, dispatch)
};

export default withTournaments(connect(mapStateToProps, mapDispatchToProps)(TournamentHome));