import React from 'react';
import { useTranslation } from 'react-i18next';

export interface CareerStatEntry {
  slug: string;
  total: number;
}

interface CareerStatsGridProps {
  sportSlug: string;
  entries: CareerStatEntry[];
  tooltipPosition?: 'top' | 'bottom';
}

function CareerStatsGrid({
  sportSlug,
  entries,
  tooltipPosition = 'bottom'
}: CareerStatsGridProps) {
  const { t } = useTranslation();

  return (
    <div className="columns is-multiline">
      {entries.map(({ slug, total }) => (
        <div key={slug} className="column is-narrow">
          <div className="career-stat-card box">
            <p
              className={`career-stat-label heading has-tooltip-${tooltipPosition}`}
              data-tooltip={t(`sports.${sportSlug}.statistics.${slug}.title`, {
                defaultValue: slug
              })}
            >
              {t(`sports.${sportSlug}.statistics.${slug}.abbreviation`, {
                defaultValue: slug
              })}
            </p>
            <p className="career-stat-total title is-4">{total}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CareerStatsGrid;
