import React from 'react';
import { RankingCriteria, StatEntity } from '../Phases/state';
import { TeamEntity } from '../Teams/state';
import { EliminationEntity, EliminationTeamStatEntity } from './state';
import './View.scss';
import { Link } from 'react-router-dom';
import Identifier from '../Teams/Indentifier';
import { Trans, useTranslation } from 'react-i18next';

const TeamEliminationRow: React.FC<{
  baseUrl: string;
  eliminationStats: StatEntity[];
  teamStats: { [statId: string]: string };
  rankingCriteriaUsed: EliminationTeamStatEntity['rankingCriteriaUsed'];
  rankingStatUsed?: string;
  team?: TeamEntity;
  teamPlaceholder?: string;
}> = ({
  baseUrl,
  eliminationStats,
  team,
  teamPlaceholder = '',
  teamStats,
  rankingCriteriaUsed,
  rankingStatUsed
}) => {
  const { t } = useTranslation();
  const firstColumnValue = team ? (
    <Link className="team-with-logo" to={`${baseUrl}/Teams/${team.id}`}>
      <Identifier team={team} logoSize={24} />
    </Link>
  ) : (
    <span>{teamPlaceholder}</span>
  );
  const isHeadToHead =
    rankingCriteriaUsed === RankingCriteria.headToHead && !!rankingStatUsed;
  const matchedStat = eliminationStats.find(
    stat => stat.teamStatSource === rankingStatUsed
  );
  const fallbackTitle = matchedStat ? matchedStat.title : rankingStatUsed;
  const rankingStatTitle = rankingStatUsed
    ? t(`sports.basketball_5x5.team_statistics.${rankingStatUsed}.title`, {
        defaultValue: fallbackTitle,
        keySeparator: '.'
      })
    : '';
  return (
    <tr>
      <td
        style={{
          paddingLeft: '0',
          width: '225px',
          position: 'relative'
        }}
      >
        {firstColumnValue}
        {isHeadToHead && (
          <span
            className="head-to-head-indicator has-tooltip-right"
            data-tooltip={t('headToHeadRankTooltip', {
              stat: rankingStatTitle
            })}
          />
        )}
      </td>

      {eliminationStats.map((stat: StatEntity) => (
        <td
          key={stat.id}
          className="has-text-centered"
          style={{ minWidth: '90px' }}
        >
          {teamStats[stat.id] ? teamStats[stat.id] : ''}
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
              <th style={{ paddingLeft: '0', width: '225px' }}>
                <Trans>team</Trans>
              </th>
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
                    rankingCriteriaUsed={teamStats.rankingCriteriaUsed}
                    rankingStatUsed={teamStats.rankingStatUsed}
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
