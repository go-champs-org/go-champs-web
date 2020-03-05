import React from 'react';
import { PhaseEliminationStatEntity } from '../Phases/EliminationStats/state';
import { TeamEntity } from '../Teams/state';
import { EliminationEntity, EliminationTeamStatEntity } from './state';
import './View.scss';

const TeamEliminationRow: React.FC<{
  eliminationStats: PhaseEliminationStatEntity[];
  firstColumnValue: string;
  teamStats: { [statId: string]: string };
}> = ({ eliminationStats, firstColumnValue, teamStats }) => {
  return (
    <tr>
      <td style={{ paddingLeft: '0', width: '225px' }}>{firstColumnValue}</td>
      {eliminationStats.map((stat: PhaseEliminationStatEntity) => (
        <td key={stat.id} className="has-text-centered">
          {teamStats[stat.id]}
        </td>
      ))}
    </tr>
  );
};

const EliminationHeader: React.FC<{
  tournamentStat: PhaseEliminationStatEntity;
}> = ({ tournamentStat }) => (
  <th className="has-text-centered">{tournamentStat.title}</th>
);

interface EliminationProps {
  eliminationStats: PhaseEliminationStatEntity[];
  eliminations: EliminationEntity;
  teams: { [id: string]: TeamEntity };
}

const Elimination: React.FC<EliminationProps> = ({
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
        <table className="table is-fullwidth is-striped is-hoverable">
          <thead>
            <tr>
              <th style={{ paddingLeft: '0', width: '225px' }}>Equipe</th>
              {eliminationStats.map((stat: PhaseEliminationStatEntity) => (
                <EliminationHeader key={stat.id} tournamentStat={stat} />
              ))}
            </tr>
          </thead>
          <tbody>
            {eliminations.teamStats.map(
              (teamStats: EliminationTeamStatEntity) => {
                const firstColumnValue = teamStats.teamId
                  ? teams[teamStats.teamId].name
                  : teamStats.placeholder;
                return (
                  <TeamEliminationRow
                    key={teamStats.id}
                    firstColumnValue={firstColumnValue}
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
  eliminationStats: PhaseEliminationStatEntity[];
  eliminations: EliminationEntity[];
  teams: { [id: string]: TeamEntity };
}

export const View: React.FC<TournamentEliminationViewProps> = ({
  eliminationStats,
  eliminations,
  teams
}) => {
  return (
    <div>
      {eliminations.map((standing: EliminationEntity) => (
        <Elimination
          key={standing.id}
          eliminations={standing}
          eliminationStats={eliminationStats}
          teams={teams}
        />
      ))}
    </div>
  );
};

export default View;
