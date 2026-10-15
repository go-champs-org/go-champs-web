'use client';

import { useEffect, useState } from 'react';
import {
  getRotatingWindow,
  ROTATING_SLOTS,
  type TrustedOrganization
} from './trustedOrganizations';

const ROTATION_INTERVAL_MS = 4000;

// Logos are served without CORS headers, so a fetch() status can't be read
// from the page. Loading the URL as an image succeeds only when it answers
// 200 with an image the browser can decode.
const isLogoLoadable = (url: string): Promise<boolean> =>
  new Promise(resolve => {
    const image = new Image();
    image.onload = () => resolve(image.naturalWidth > 0);
    image.onerror = () => resolve(false);
    image.src = url;
  });

const prefersReducedMotion = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const emptied = (current: TrustedOrganization[]): TrustedOrganization[] =>
  current.length === 0 ? current : [];

const useLoadableOrganizations =(candidates: TrustedOrganization[]) => {
  const [loadable, setLoadable] = useState<TrustedOrganization[]>([]);

  useEffect(() => {
    if (candidates.length === 0) {
      setLoadable(emptied);
      return;
    }

    let isActive = true;

    Promise.all(
      candidates.map(candidate => isLogoLoadable(candidate.logoUrl))
    ).then(results => {
      if (isActive) {
        setLoadable(candidates.filter((_, index) => results[index]));
      }
    });

    return () => {
      isActive = false;
    };
  }, [candidates]);

  return loadable;
};

const useRotationPage = (itemCount: number) => {
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (itemCount <= ROTATING_SLOTS || prefersReducedMotion()) {
      return;
    }

    const interval = window.setInterval(
      () => setPage(current => current + 1),
      ROTATION_INTERVAL_MS
    );

    return () => window.clearInterval(interval);
  }, [itemCount]);

  return page;
};

export function useRotatingOrganizations(candidates: TrustedOrganization[]) {
  const loadable = useLoadableOrganizations(candidates);
  const page = useRotationPage(loadable.length);

  return {
    organizations: getRotatingWindow(loadable, page, ROTATING_SLOTS),
    page
  };
}
