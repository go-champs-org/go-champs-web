import React from 'react';
import { TournamentStatEntity } from '../Tournaments/Stats/state';
import { TournamentTeamEntity } from '../Tournaments/Teams/state';
import { EliminationEntity, EliminationTeamStatEntity } from './state';
import './View.scss';

const TournamentTeamStandingsRow: React.FC<{
  teamStats: { [statId: string]: string };
  phaseStats: TournamentStatEntity[];
  tournamentTeam: TournamentTeamEntity;
}> = ({ phaseStats, teamStats, tournamentTeam }) => {
  return (
    <tr>
      <td style={{ paddingLeft: '0', width: '225px' }}>
        {tournamentTeam.name}
      </td>
      {phaseStats.map((stat: TournamentStatEntity) => (
        <td key={stat.id} className="has-text-centered">
          {teamStats[stat.id]}
        </td>
      ))}
    </tr>
  );
};

const StandingHeader: React.FC<{ tournamentStat: TournamentStatEntity }> = ({
  tournamentStat
}) => <th className="has-text-centered">{tournamentStat.title}</th>;

interface StandingsProps {
  phaseStats: TournamentStatEntity[];
  eliminations: EliminationEntity;
  teams: { [id: string]: TournamentTeamEntity };
}

const Standings: React.FC<StandingsProps> = ({
  phaseStats,
  eliminations,
  teams
}) => {
  const TitleSection = eliminations.title ? (
    <div className="columns">
      <div className="column is-12">
        <h5 className="subtitle">{eliminations.title}</h5>
      </div>
    </div>
  ) : (
    <div></div>
  );
  return (
    <div className="group">
      {TitleSection}
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            <th style={{ paddingLeft: '0', width: '225px' }}>Name</th>
            {phaseStats.map((stat: TournamentStatEntity) => (
              <StandingHeader key={stat.id} tournamentStat={stat} />
            ))}
          </tr>
        </thead>
        <tbody>
          {eliminations.teamStats.map(
            (teamStats: EliminationTeamStatEntity) => (
              <TournamentTeamStandingsRow
                key={teamStats.id}
                phaseStats={phaseStats}
                tournamentTeam={teams[teamStats.teamId]}
                teamStats={teamStats.stats}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

interface TournamentStandingsViewProps {
  phaseStats: TournamentStatEntity[];
  eliminations: EliminationEntity[];
  teams: { [id: string]: TournamentTeamEntity };
}

export const View: React.FC<TournamentStandingsViewProps> = ({
  phaseStats,
  eliminations,
  teams
}) => {
  return (
    <div>
      {eliminations.map((standing: EliminationEntity) => (
        <Standings
          key={standing.id}
          eliminations={standing}
          phaseStats={phaseStats}
          teams={teams}
        />
      ))}
    </div>
  );
};

export default View;
