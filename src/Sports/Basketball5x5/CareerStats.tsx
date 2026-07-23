import React from 'react';
import { ApiCareerStatsBySport } from '../../Shared/httpClient/apiTypes';
import CareerStatsGrid from '../../Shared/UI/CareerStatsGrid';
import { selectBasketball5x5CareerStatEntries } from './careerStatsSelectors';

interface CareerStatsProps {
  sportStats: ApiCareerStatsBySport;
}

function CareerStats({ sportStats }: CareerStatsProps) {
  const entries = selectBasketball5x5CareerStatEntries(sportStats.stats);

  return (
    <CareerStatsGrid
      sportSlug={sportStats.sport_slug}
      entries={entries}
      tooltipPosition="top"
    />
  );
}

export default CareerStats;
