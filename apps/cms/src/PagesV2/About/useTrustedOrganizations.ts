import { useEffect, useState } from 'react';
import organizationHttpClient from '../../Organizations/organizationHttpClient';
import {
  FIXED_TRUSTED_ORGANIZATIONS,
  ROTATING_SLOTS,
  TrustedOrganization,
  getRotatingWindow,
  selectRotatingCandidates
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

/**
 * The fixed organizations followed by up to ROTATING_SLOTS recently viewed
 * organizations whose logo loads, rotating through them while there are more
 * than fit.
 */
function useTrustedOrganizations() {
  const [rotating, setRotating] = useState<TrustedOrganization[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadRotating = async () => {
      try {
        const organizations = await organizationHttpClient.getRecentlyViewed();
        const candidates = selectRotatingCandidates(
          organizations,
          FIXED_TRUSTED_ORGANIZATIONS.map(organization => organization.slug)
        );
        const loadable = await Promise.all(
          candidates.map(candidate => isLogoLoadable(candidate.logoUrl))
        );

        if (isActive) {
          setRotating(candidates.filter((_, index) => loadable[index]));
        }
      } catch (error) {
        // The strip still shows the fixed organizations.
        console.error('Failed to fetch recently viewed organizations:', error);
      }
    };

    loadRotating();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (rotating.length <= ROTATING_SLOTS || prefersReducedMotion()) {
      return;
    }

    const interval = window.setInterval(
      () => setPage(current => current + 1),
      ROTATION_INTERVAL_MS
    );

    return () => window.clearInterval(interval);
  }, [rotating.length]);

  return {
    fixed: FIXED_TRUSTED_ORGANIZATIONS,
    rotating: getRotatingWindow(rotating, page, ROTATING_SLOTS),
    page
  };
}

export default useTrustedOrganizations;
