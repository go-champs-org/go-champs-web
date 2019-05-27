import React from 'react';
import ListByDate from './Games/ListByDate';
import { TournamentGameState } from './Games/state';
import { TournamentGroupState } from './Groups/state';
import { TournamentState } from './state';
import { TournamentTeamState } from './Teams/state';

interface HomeProps {
	currentTournamentSlug: string;
	tournamentState: TournamentState;
	tournamentGameState: TournamentGameState;
	tournamentGroupState: TournamentGroupState;
	tournamentTeamState: TournamentTeamState;
};

const Home: React.FC<HomeProps> = ({ tournamentState, tournamentGameState, tournamentGroupState, tournamentTeamState, currentTournamentSlug }) => {
	const tournament = tournamentState.tournaments[currentTournamentSlug];
	return (
		<div className="columns is-multiline">
			<header className="column is-12">
				<h1>
					{tournament.name}
				</h1>
			</header>
			<div className="column is-8">
				Tournament teams
			</div>
			<aside className="column is-4">
				<ListByDate tournamentGameState={tournamentGameState} />
			</aside>
		</div>
	);
}

export default Home;