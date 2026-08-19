'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import type {
  RecentlyViewEntity,
  SearchResultEntity
} from '@gochamps/api-client';
import { RecentTournaments } from './RecentTournaments';
import { TournamentGrid, TournamentGridShimmer } from '../../../src/components/tournaments/TournamentGrid';
import { TournamentMiniCard } from '../../../src/components/tournaments/TournamentMiniCard';

const DEBOUNCE_MS = 500;
const MAX_RESULTS = 15;

const useDebouncedValue = (value: string, delayMs: number) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
};

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

interface SearchResultsProps {
  isSearching: boolean;
  results: SearchResultEntity[];
  cmsUrl: string;
  emptyMessage: string;
}

const SearchResults = ({
  isSearching,
  results,
  cmsUrl,
  emptyMessage
}: SearchResultsProps) => {
  if (isSearching) {
    return <TournamentGridShimmer />;
  }

  if (results.length === 0) {
    return (
      <div className="px-4 py-12 text-center md:px-8 md:py-16">
        <p className="text-xl text-muted md:text-2xl">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <TournamentGrid>
      {results.slice(0, MAX_RESULTS).map(tournament => (
        <TournamentMiniCard
          key={tournament.id}
          name={tournament.name}
          organizationName={tournament.organizationName}
          organizationLogoUrl={tournament.organizationLogoUrl}
          href={`${cmsUrl}/${tournament.organizationSlug}/${tournament.slug}`}
        />
      ))}
    </TournamentGrid>
  );
};

interface SearchIslandProps {
  cmsUrl: string;
  recentlyViews: RecentlyViewEntity[];
}

export const SearchIsland = ({
  cmsUrl,
  recentlyViews
}: SearchIslandProps) => {
  const t = useTranslations('home');
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<SearchResultEntity[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [haveSearched, setHaveSearched] = useState(false);
  const debouncedTerm = useDebouncedValue(term, DEBOUNCE_MS);

  useEffect(() => {
    if (!debouncedTerm) {
      setHaveSearched(false);
      setResults([]);
      return;
    }

    let isCurrent = true;
    setIsSearching(true);

    fetch(`/api/search?term=${encodeURIComponent(debouncedTerm)}`)
      .then(response => (response.ok ? response.json() : []))
      .catch(() => [])
      .then((searchResults: SearchResultEntity[]) => {
        if (!isCurrent) return;
        setResults(searchResults);
        setHaveSearched(true);
        setIsSearching(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [debouncedTerm]);

  const isSearchMode = term.length > 0;

  return (
    <div className="w-full">
      <section className="mb-8 rounded-xl border border-border bg-surface p-4 md:mb-12 md:p-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex-1">
            <h1 className="mb-2 text-base font-bold text-foreground md:text-2xl">
              {t('onGoingTournaments')}
            </h1>
            <p className="hidden text-xs text-muted md:block md:text-base">
              {t('checkTheMostUpToDateGameResults')}
            </p>
          </div>
          <div className="relative flex-1 md:flex md:justify-end">
            <input
              type="search"
              placeholder={t('searchPlaceholder')}
              value={term}
              onChange={event => setTerm(event.target.value)}
              className="w-full max-w-[600px] rounded-lg border border-border bg-surface-input px-3.5 py-3 pr-11 text-[0.9375rem] text-foreground outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_var(--shadow-elevated)] md:max-w-[400px] md:px-4 md:py-3.5 md:pr-12 md:text-base"
            />
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
              <SearchIcon />
            </span>
          </div>
        </div>
      </section>

      <section className="mt-8 md:mt-12">
        {isSearchMode ? (
          <SearchResults
            isSearching={isSearching}
            results={results}
            cmsUrl={cmsUrl}
            emptyMessage={
              haveSearched ? t('tournamentNotFound') : t('startTyping')
            }
          />
        ) : (
          <RecentTournaments cmsUrl={cmsUrl} recentlyViews={recentlyViews} />
        )}
      </section>
    </div>
  );
};
