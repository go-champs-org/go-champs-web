import React from 'react';
import { TournamentTeamEntity } from './state';

const StandingTeamRow: React.FC<{
  position: number;
  tournamentTeam: TournamentTeamEntity;
}> = ({ position, tournamentTeam }) => {
  return (
    <tr>
      <td style={{ paddingLeft: 0 }}>{position}</td>
      <td>{tournamentTeam.name}</td>
    </tr>
  );
};

interface StandingsProps {
  teams: { [key: string]: TournamentTeamEntity };
}

const Standings: React.FC<StandingsProps> = ({ teams }) => {
  return (
    <div>
      <h2 className="subtitle">Standings</h2>
      <table className="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th style={{ paddingLeft: 0, width: '38px' }}>Pos</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(teams).map((key: string, index: number) => (
            <StandingTeamRow
              key={key}
              position={index}
              tournamentTeam={teams[key]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
