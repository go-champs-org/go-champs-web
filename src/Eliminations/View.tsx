import React from 'react';
import { StatEntity } from '../Phases/state';
import { TeamEntity } from '../Teams/state';
import { EliminationEntity, EliminationTeamStatEntity } from './state';
import './View.scss';
import { Link } from 'react-router-dom';

const TeamEliminationRow: React.FC<{
  baseUrl: string;
  eliminationStats: StatEntity[];
  teamStats: { [statId: string]: string };
  team?: TeamEntity;
  teamPlaceholder?: string;
}> = ({ baseUrl, eliminationStats, team, teamPlaceholder = '', teamStats }) => {
  const firstColumnValue = team ? (
    <Link className="team-with-logo" to={`${baseUrl}/Teams/${team.id}`}>
      {team.logoUrl && (
        <img src={team.logoUrl} alt={`${team.name} logo`} className="logo" />
      )}
      <span className="name">{team.name}</span>
    </Link>
  ) : (
    <span>{teamPlaceholder}</span>
  );
  return (
    <tr>
      <td
        style={{
          paddingLeft: '0',
          width: '225px'
        }}
      >
        {firstColumnValue}
      </td>

      {eliminationStats.map((stat: StatEntity) => (
        <td
          key={stat.id}
          className="has-text-centered"
          style={{ minWidth: '90px' }}
        >
          {teamStats[stat.id]}
        </td>
      ))}
    </tr>
  );
};

const EliminationHeader: React.FC<{
  tournamentStat: StatEntity;
}> = ({ tournamentStat }) => (
  <th className="has-text-centered">{tournamentStat.title}</th>
);

interface EliminationProps {
  baseUrl: string;
  eliminationStats: StatEntity[];
  eliminations: EliminationEntity;
  teams: { [id: string]: TeamEntity };
}

const Elimination: React.FC<EliminationProps> = ({
  baseUrl,
  eliminationStats,
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
      <div className="table-container">
        <table className="table is-fullwidth is-striped is-hoverable is-narrow">
          <thead>
            <tr>
              <th style={{ paddingLeft: '0', width: '225px' }}>Equipe</th>
              {eliminationStats.map((stat: StatEntity) => (
                <EliminationHeader key={stat.id} tournamentStat={stat} />
              ))}
            </tr>
          </thead>
          <tbody>
            {eliminations.teamStats.map(
              (teamStats: EliminationTeamStatEntity) => {
                return (
                  <TeamEliminationRow
                    key={teamStats.id}
                    baseUrl={baseUrl}
                    team={teams[teamStats.teamId]}
                    teamPlaceholder={teamStats.placeholder}
                    eliminationStats={eliminationStats}
                    teamStats={teamStats.stats}
                  />
                );
              }
            )}
          </tbody>

          <tfoot></tfoot>
        </table>

        {eliminations.info && (
          <p className="elimination-info is-size-7">{eliminations.info}</p>
        )}
      </div>
    </div>
  );
};

interface TournamentEliminationViewProps {
  baseUrl: string;
  eliminationStats: StatEntity[];
  eliminations: EliminationEntity[];
  teams: { [id: string]: TeamEntity };
}

export const View: React.FC<TournamentEliminationViewProps> = ({
  baseUrl,
  eliminationStats,
  eliminations,
  teams
}) => {
  return (
    <div>
      {eliminations.map((standing: EliminationEntity) => (
        <Elimination
          key={standing.id}
          baseUrl={baseUrl}
          eliminations={standing}
          eliminationStats={eliminationStats}
          teams={teams}
        />
      ))}
    </div>
  );
};

export default View;
