import React from 'react';
import { useTranslation } from 'react-i18next';
import { CareerStatsBySport } from './state';

interface CareerStatsProps {
  careerStats?: CareerStatsBySport[];
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
            {sportStats.stats.map(stat => (
              <div key={stat.slug} className="column is-narrow">
                <div className="career-stat-card box">
                  <p className="career-stat-label heading">
                    {t(
                      `sports.${sportStats.sport_slug}.statistics.${stat.slug}.abbreviation`,
                      { defaultValue: stat.slug }
                    )}
                  </p>
                  <p className="career-stat-total title is-4">{stat.total}</p>
                  <p className="career-stat-average subtitle is-6">
                    {stat.average.toFixed(1)} / torneio
                  </p>
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
