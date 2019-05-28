import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown, { DropdownDivider, DropdownItem } from '../../Shared/UI/Dropdown';
import { TournamentEntity } from '../state';

const NavBar: React.FC<{ organizationSlug: string, tournament: TournamentEntity, tournamentSlug: string, url: string }> = ({ organizationSlug, tournament, tournamentSlug, url }) => (
	<nav className="level">
		<div className="level-left">
			<div className="level-item">
				<Link to={`/${organizationSlug}/${tournamentSlug}`}>
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

export default NavBar;