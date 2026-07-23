import React from 'react';
import { useTranslation } from 'react-i18next';
import { ApiCareerStatsBySport } from '../Shared/httpClient/apiTypes';
import GeneralCareerStats from './GeneralCareerStats';
import BasketballCareerStats from '../Sports/Basketball5x5/CareerStats';

type CareerStatsViewer = React.ComponentType<{
  sportStats: ApiCareerStatsBySport;
}>;

const CAREER_STATS_VIEWERS: { [key: string]: CareerStatsViewer } = {
  basketball_5x5: BasketballCareerStats
};

export const selectCareerStatsViewer = (
  sportSlug: string
): CareerStatsViewer => CAREER_STATS_VIEWERS[sportSlug] || GeneralCareerStats;

interface CareerStatsProps {
  careerStats: ApiCareerStatsBySport[];
}

function CareerStats({ careerStats }: CareerStatsProps) {
  const { t } = useTranslation();

  return (
    <div className="career-stats">
      {careerStats.map(sportStats => {
        const Viewer = selectCareerStatsViewer(sportStats.sport_slug);

        return (
          <div key={sportStats.sport_slug} className="career-stats-sport">
            <h3 className="title is-5">
              {sportStats.sport_name}
              <span className="career-stats-tournament-count">
                {' '}
                ({sportStats.tournaments_count}{' '}
                {sportStats.tournaments_count === 1
                  ? t('tournament')
                  : t('tournaments')}
                )
              </span>
            </h3>

            <Viewer sportStats={sportStats} />
          </div>
        );
      })}
    </div>
  );
}

export default CareerStats;
