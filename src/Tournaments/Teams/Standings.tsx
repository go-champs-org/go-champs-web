import React from 'react';
import { TournamentTeamEntity } from './state';

const StandingTeamRow: React.FC<{ position: number, tournamentTeam: TournamentTeamEntity }> = ({ position, tournamentTeam }) => {
	return (
		<tr>
			<td>
				{position}
			</td>
			<td>
				{tournamentTeam.name}
			</td>
		</tr>
	);
};

interface StandingsProps {
	teams: { [key: string]: TournamentTeamEntity }
}

const Standings: React.FC<StandingsProps> = ({ teams }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Pos</th>
					<th>Team</th>
				</tr>
			</thead>
			<tbody>
				{Object.keys(teams).map((key: string, index: number) => <StandingTeamRow key={key} position={index} tournamentTeam={teams[key]} />)}
			</tbody>
		</table>
	);
};

export default Standings;
