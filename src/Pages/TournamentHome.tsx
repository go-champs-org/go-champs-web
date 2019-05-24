import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestTournament } from "../Tournaments/actions";
import { deleteTournamentGame, requestTournamentGames } from "../Tournaments/Games/actions";
import { default as TournamentGameList } from "../Tournaments/Games/List";
import { TournamentGameState } from "../Tournaments/Games/state";
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
	deleteTournamentGame: any,
	deleteTournamentGroup: any,
	deleteTournamentTeam: any,
	tournamentState: TournamentState,
	tournamentGameState: TournamentGameState,
	tournamentGroupState: TournamentGroupState,
	tournamentTeamState: TournamentTeamState,
	requestTournament: any,
	requestTournamentGames: any,
}

class TournamentHome extends React.Component<TournamentHomeProps> {
	render() {
		return (
			<div>
				<Link to={`${this.props.match.url}/TournamentTeamNew`}>New team</Link>
				<br />
				<Link to={`${this.props.match.url}/TournamentGroupNew`}>New group</Link>
				<br />
				<Link to={`${this.props.match.url}/TournamentGameNew`}>New game</Link>
				<br />
				{this.props.tournamentState.isLoadingRequestTournament ?
					<div>Loading...</div> :
					<div>{this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug] && this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug].name}</div>
				}
				<br />
				<h1>Teams</h1>
				<TournamentTeamList tournamentTeamState={this.props.tournamentTeamState} deleteTournamentTeam={this.props.deleteTournamentTeam} url={this.props.match.url} />
				<br />
				<h1>Groups</h1>
				<TournamentGroupList tournamentGroupState={this.props.tournamentGroupState} deleteTournamentGroup={this.props.deleteTournamentGroup} url={this.props.match.url} />
				<br />
				<h1>Games</h1>
				<TournamentGameList tournamentGameState={this.props.tournamentGameState}
					deleteTournamentGame={this.props.deleteTournamentGame} />
			</div>
		)
	}

	componentDidMount() {
		const tournamentId = this.props.tournamentState.tournaments[this.props.match.params.tournamentSlug].id;
		this.props.requestTournament(tournamentId);
		this.props.requestTournamentGames(tournamentId);
	}
}

const mapStateToProps = (state: any) => ({
	tournamentState: state.tournaments,
	tournamentGameState: state.tournamentGames,
	tournamentGroupState: state.tournamentGroups,
	tournamentTeamState: state.tournamentTeams,
});

const mapDispatchToProps = (dispatch: any, state: any) => {
	const tournamentId = state.tournamentState.tournaments[state.match.params.tournamentSlug].id;
	return bindActionCreators({
		deleteTournamentGame: deleteTournamentGame(tournamentId),
		deleteTournamentGroup: deleteTournamentGroup(tournamentId),
		deleteTournamentTeam: deleteTournamentTeam(tournamentId),
		requestTournamentGames: requestTournamentGames(tournamentId),
		requestTournament,
	}, dispatch)
};

export default withTournaments(connect(mapStateToProps, mapDispatchToProps)(TournamentHome));