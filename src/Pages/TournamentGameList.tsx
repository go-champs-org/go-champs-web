import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { bindActionCreators } from "redux";
import { requestTournament } from "../Tournaments/actions";
import { deleteTournamentGame, requestTournamentGames } from "../Tournaments/Games/actions";
import List from '../Tournaments/Games/List';
import { TournamentGameState } from "../Tournaments/Games/state";
import { TournamentState } from "../Tournaments/state";
import { TournamentHomeMatchProps } from "./support/routerInterfaces";
import withTournaments from "./support/withTournaments";

interface TournamentGameListProps extends RouteComponentProps<TournamentHomeMatchProps> {
	deleteTournamentGame: any,
	tournamentState: TournamentState,
	tournamentGameState: TournamentGameState,
	requestTournament: any,
	requestTournamentGames: any,
};


class TournamentGameList extends React.Component<TournamentGameListProps> {
	render() {
		const {
			deleteTournamentGame,
			match,
			tournamentState,
			tournamentGameState,
		} = this.props;

		return (
			<List
				currentOrganizationSlug={match.params.organizationSlug}
				currentTournamentSlug={match.params.tournamentSlug}
				deleteTournamentGame={deleteTournamentGame}
				tournamentState={tournamentState}
				tournamentGameState={tournamentGameState}
				url={match.url} />
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
		requestTournamentGames: requestTournamentGames(tournamentId),
		requestTournament,
	}, dispatch)
};

export default withTournaments(connect(mapStateToProps, mapDispatchToProps)(TournamentGameList));