import React from 'react';
import { ApiCareerStatsBySport } from '../Shared/httpClient/apiTypes';
import CareerStatsGrid from '../Shared/UI/CareerStatsGrid';

interface GeneralCareerStatsProps {
  sportStats: ApiCareerStatsBySport;
}

function GeneralCareerStats({ sportStats }: GeneralCareerStatsProps) {
  const entries = Object.entries(sportStats.stats).map(([slug, total]) => ({
    slug,
    total
  }));

  return (
    <CareerStatsGrid sportSlug={sportStats.sport_slug} entries={entries} />
  );
}

export default GeneralCareerStats;
