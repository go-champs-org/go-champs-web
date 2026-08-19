'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { SearchResultEntity } from '@gochamps/api-client';

const DEBOUNCE_MS = 500;
const MAX_RESULTS = 15;
const MAX_INITIALS = 3;
const CAPITAL_LETTER_REGEX = /^[A-Z]$/;

const initials = (name: string): string => {
  const capitalLetters = name
    .split('')
    .filter(char => CAPITAL_LETTER_REGEX.test(char));
  if (capitalLetters.length > 0) {
    return capitalLetters.slice(0, MAX_INITIALS).join('');
  }

  return name
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .slice(0, MAX_INITIALS)
    .join('');
};

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

const ResultShimmer = () => (
  <div className="flex animate-pulse flex-col rounded-xl border border-border bg-surface p-4">
    <div className="flex h-12 w-full items-center gap-2">
      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-border" />
      <div className="h-4 flex-1 rounded bg-border" />
    </div>
    <div className="my-4 h-4 w-2/3 rounded bg-border" />
  </div>
);

const ResultGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
    {children}
  </div>
);

interface TournamentMiniCardProps {
  tournament: SearchResultEntity;
  href: string;
}

const TournamentMiniCard = ({ tournament, href }: TournamentMiniCardProps) => (
  <a
    href={href}
    className="flex flex-col rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-[0_4px_16px_var(--shadow-elevated)]"
  >
    <header className="flex h-12 w-full items-center font-semibold text-foreground">
      {tournament.logoUrl ? (
        // Tournament logos are arbitrary user-uploaded URLs, so they stay on a
        // plain <img> — next/image would need every host allow-listed in
        // next.config.js.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tournament.logoUrl}
          alt=""
          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-border text-base">
          {initials(tournament.name)}
        </div>
      )}
      <span className="ml-2 line-clamp-2 flex-1">{tournament.name}</span>
    </header>
    <span className="my-4 block w-full truncate font-semibold text-primary-dark">
      {tournament.organizationName}
    </span>
  </a>
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
    return (
      <ResultGrid>
        <ResultShimmer />
        <ResultShimmer />
        <ResultShimmer />
      </ResultGrid>
    );
  }

  if (results.length === 0) {
    return (
      <div className="px-4 py-12 text-center md:px-8 md:py-16">
        <p className="text-xl text-muted md:text-2xl">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ResultGrid>
      {results.slice(0, MAX_RESULTS).map(tournament => (
        <TournamentMiniCard
          key={tournament.id}
          tournament={tournament}
          href={`${cmsUrl}/${tournament.organizationSlug}/${tournament.slug}`}
        />
      ))}
    </ResultGrid>
  );
};

interface SearchIslandProps {
  cmsUrl: string;
}

export const SearchIsland = ({ cmsUrl }: SearchIslandProps) => {
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
        <SearchResults
          isSearching={isSearching}
          results={results}
          cmsUrl={cmsUrl}
          emptyMessage={
            isSearchMode && haveSearched
              ? t('tournamentNotFound')
              : t('startTyping')
          }
        />
      </section>
    </div>
  );
};
