import { useEffect, useState } from 'react';
import { Scope, Statistic } from './state';

const useStatistics = (statistics: Statistic[], scopeFilter: Scope) => {
  const [currentStatistics, setStatistics] = useState([] as string[]);

  useEffect(() => {
    const filteredStatistics = statistics
      .filter(stat => stat.scope === scopeFilter)
      .map(stat => stat.slug);

    setStatistics(filteredStatistics);
  }, [scopeFilter, statistics]);

  return currentStatistics;
};

export default useStatistics;
