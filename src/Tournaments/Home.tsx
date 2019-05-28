import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown, { DropdownDivider, DropdownItem } from '../Shared/UI/Dropdown';
import ListByDate from './Games/ListByDate';
import { TournamentGameState } from './Games/state';
import { TournamentGroupState } from './Groups/state';
import { TournamentEntity, TournamentState } from './state';
import Standings from './Teams/Standings';
import { TournamentTeamState } from './Teams/state';

const NavBar: React.FC<{ tournament: TournamentEntity, url: string }> = ({ tournament, url }) => (
	<nav className="level">
		<div className="level-left">
			<div className="level-item">
				<Link to={''}>
					<h1 className="title">
						{tournament.name}
					</h1>
				</Link>
			</div>
		</div>

		<div className="level-right">
			<p className="level-item">
				<Dropdown label="Manage" className="is-right">
					<DropdownItem>
						<Link to={`${url}/TournamentEdit`}>Settings</Link>
					</DropdownItem>
					<DropdownDivider />
					<DropdownItem>
						<Link to={`${url}/TournamentGameList`}>Games</Link>
					</DropdownItem>
					<DropdownItem>
						<Link to={`${url}/TournamentGroupList`}>Groups</Link>
					</DropdownItem>
					<DropdownItem>
						<Link to={`${url}/TournamentTeamList`}>Teams</Link>
					</DropdownItem>
				</Dropdown>
			</p>
		</div>
	</nav>
);

interface HomeProps {
	currentTournamentSlug: string;
	tournamentState: TournamentState;
	tournamentGameState: TournamentGameState;
	tournamentGroupState: TournamentGroupState;
	tournamentTeamState: TournamentTeamState;
	url: string;
};

const Home: React.FC<HomeProps> = ({ tournamentState, tournamentGameState, tournamentGroupState, tournamentTeamState, currentTournamentSlug, url }) => {
	const tournament = tournamentState.tournaments[currentTournamentSlug];
	return (
		<div className="columns is-multiline">
			<header className="column is-12">
				<NavBar tournament={tournament} url={url} />
			</header>
			<div className="column is-8">
				<Standings teams={tournamentTeamState.tournamentTeams} />
			</div>
			<aside className="column is-4">
				<ListByDate tournamentGameState={tournamentGameState} />
			</aside>
		</div>
	);
}

export default Home;