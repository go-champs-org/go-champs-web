import React from 'react';
import { useTranslation } from 'react-i18next';
import { ApiCareerStatsBySport } from '../Shared/httpClient/apiTypes';

interface CareerStatsProps {
  careerStats?: ApiCareerStatsBySport[];
}

function CareerStats({ careerStats }: CareerStatsProps) {
  const { t } = useTranslation();

  if (!careerStats || careerStats.length === 0) {
    return null;
  }

  return (
    <div className="career-stats">
      {careerStats.map(sportStats => (
        <div key={sportStats.sport_slug} className="career-stats-sport">
          <h3 className="title is-5">
            {sportStats.sport_name}
            <span className="career-stats-tournament-count">
              {' '}
              ({sportStats.tournaments_count}{' '}
              {sportStats.tournaments_count === 1 ? 'torneio' : 'torneios'})
            </span>
          </h3>

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
        </div>
      ))}
    </div>
  );
}

export default CareerStats;
