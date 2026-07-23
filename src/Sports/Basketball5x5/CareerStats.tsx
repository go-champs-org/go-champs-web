import React from 'react';
import { useTranslation } from 'react-i18next';
import { ApiCareerStatsBySport } from '../../Shared/httpClient/apiTypes';
import { selectBasketball5x5CareerStatEntries } from './careerStats';

interface CareerStatsProps {
  sportStats: ApiCareerStatsBySport;
}

function CareerStats({ sportStats }: CareerStatsProps) {
  const { t } = useTranslation();
  const entries = selectBasketball5x5CareerStatEntries(sportStats.stats);

  return (
    <div className="columns is-multiline">
      {entries.map(({ slug, total }) => (
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

export default CareerStats;
