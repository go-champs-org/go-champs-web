import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { requestTournament } from "../Tournaments/actions";
import { TournamentState } from "../Tournaments/state";
import { TournamentHomeMatchProps } from "./support/routerInterfaces";
import withTournaments from "./support/withTournaments";

interface TournamentHomeProps extends RouteComponentProps<TournamentHomeMatchProps> {
	tournamentState: TournamentState,
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
});

const mapDispatchToProps = (dispatch: any) => (
	bindActionCreators({
		requestTournament,
	}, dispatch)
)

export default withTournaments(connect(mapStateToProps, mapDispatchToProps)(TournamentHome));