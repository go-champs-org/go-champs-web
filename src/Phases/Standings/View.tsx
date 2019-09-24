import React from 'react';
import { TournamentStatEntity } from '../../Tournaments/Stats/state';
import { TournamentTeamEntity } from '../../Tournaments/Teams/state';
import { PhaseStandingsEntity, PhaseStandingsTeamStatEntity } from './state';
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
  standings: PhaseStandingsEntity;
  teams: { [id: string]: TournamentTeamEntity };
}

const Standings: React.FC<StandingsProps> = ({
  phaseStats,
  standings,
  teams
}) => {
  return (
    <div className="group">
      <div className="columns">
        <div className="column is-12">
          <h5 className="subtitle">{standings.title}</h5>
        </div>
      </div>
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
          {standings.teamStats.map(
            (teamStats: PhaseStandingsTeamStatEntity) => (
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
  standings: PhaseStandingsEntity[];
  teams: { [id: string]: TournamentTeamEntity };
}

export const View: React.FC<TournamentStandingsViewProps> = ({
  phaseStats,
  standings,
  teams
}) => {
  return (
    <div>
      {standings.map((standing: PhaseStandingsEntity) => (
        <Standings
          key={standing.id}
          standings={standing}
          phaseStats={phaseStats}
          teams={teams}
        />
      ))}
    </div>
  );
};

export default View;
