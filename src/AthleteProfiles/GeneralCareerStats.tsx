import React from 'react';
import { useTranslation } from 'react-i18next';
import { ApiCareerStatsBySport } from '../Shared/httpClient/apiTypes';

interface GeneralCareerStatsProps {
  sportStats: ApiCareerStatsBySport;
}

function GeneralCareerStats({ sportStats }: GeneralCareerStatsProps) {
  const { t } = useTranslation();

  return (
    <div className="columns is-multiline">
      {Object.entries(sportStats.stats).map(([slug, total]) => (
        <div key={slug} className="column is-narrow">
          <div className="career-stat-card box">
            <p className="career-stat-label heading">
              {t(
                `sports.${sportStats.sport_slug}.statistics.${slug}.abbreviation`,
                {
                  defaultValue: slug
                }
              )}
            </p>
            <p className="career-stat-total title is-4">{total}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GeneralCareerStats;
