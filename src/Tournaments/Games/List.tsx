import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../Common/NavBar';
import { TournamentState } from '../state';
import { TournamentGameEntity, TournamentGameState } from "./state";

const TournamentGameCard: React.FC<{ onDeleteTournamentGame: any, url: string, tournamentGame: TournamentGameEntity }> = ({ onDeleteTournamentGame, url, tournamentGame }) => (
	<div>
		<br />
		<div style={{ background: 'red' }}>
			{tournamentGame.game.awayTeamName}
			-
			{tournamentGame.game.awayScore}
		</div>
		<div style={{ background: 'green' }}>
			{tournamentGame.game.homeTeamName}
			-
			{tournamentGame.game.homeScore}
		</div>
		<p>
			{tournamentGame.game.location}
		</p>
		<p>
			{tournamentGame.game.datetime}
		</p>
		<button onClick={() => onDeleteTournamentGame(tournamentGame)}>Delete</button>
		<Link to={`${url}/TournamentGameEdit/${tournamentGame.id}`}>Edit</Link>
	</div>
);

const List: React.FC<{ deleteTournamentGame: any, currentOrganizationSlug: string, currentTournamentSlug: string, tournamentState: TournamentState, tournamentGameState: TournamentGameState, url: string }> = ({ currentOrganizationSlug, currentTournamentSlug, deleteTournamentGame, tournamentState, tournamentGameState, url }) => {
	const tournament = tournamentState.tournaments[currentTournamentSlug];
	const baseTournamentUrl = `/${currentOrganizationSlug}/${currentTournamentSlug}`;
	return (
		<div className="columns is-multiline">
			<header className="column is-12">
				<NavBar
					organizationSlug={currentOrganizationSlug}
					tournament={tournament}
					tournamentSlug={currentTournamentSlug} />
			</header>
			<div className="column is-12">
				<h2 className="subtitle">
					Games
				</h2>
				{Object.keys(tournamentGameState.tournamentGames).map((key: string) => <TournamentGameCard key={key} url={baseTournamentUrl} tournamentGame={tournamentGameState.tournamentGames[key]} onDeleteTournamentGame={deleteTournamentGame} />)}
			</div>
		</div>
	);
};

const Loading: React.FC = () => (
	<div>Loading...</div>
)

export const Wrapper: React.FC<{ deleteTournamentGame: any, currentOrganizationSlug: string, currentTournamentSlug: string, tournamentState: TournamentState, tournamentGameState: TournamentGameState, url: string }> = ({ currentOrganizationSlug, currentTournamentSlug, deleteTournamentGame, tournamentState, tournamentGameState, url }) => {
	if (tournamentGameState.isLoadingRequestTournamentGames) {
		return <Loading />
	}

	return <List
		currentOrganizationSlug={currentOrganizationSlug}
		currentTournamentSlug={currentTournamentSlug}
		deleteTournamentGame={deleteTournamentGame}
		tournamentState={tournamentState}
		tournamentGameState={tournamentGameState}
		url={url} />;
};

export default Wrapper;