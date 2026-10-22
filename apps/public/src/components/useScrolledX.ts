'use client';

import { useState, type UIEvent } from 'react';

// Whether a horizontally scrolling box has left its start: the stats tables
// only draw the edge of their pinned column once columns are sliding under it.
// Returns the props of that box; `data-scrolled` is absent, not "false", at
// the start, so the CSS can match on its presence alone.
export const useScrolledX = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  return {
    'data-scrolled': isScrolled || undefined,
    onScroll: (event: UIEvent<HTMLElement>) =>
      setIsScrolled(event.currentTarget.scrollLeft > 0)
  };
};

// The scroll box of a stats table; its pinned column reads `data-scrolled`
// through the named group below.
export const SCROLL_GROUP = 'group/scroll';

// A soft gradient past the right edge of the pinned column, shown only while
// the table is scrolled. A pseudo element rather than a box-shadow: a table
// cell in a collapsed-border table does not reliably paint its shadow.
export const PINNED_EDGE_SHADOW =
  "after:pointer-events-none after:absolute after:inset-y-0 after:left-full after:w-2 after:bg-linear-to-r after:from-[var(--shadow-elevated)] after:to-transparent after:opacity-0 after:transition-opacity after:content-[''] group-data-scrolled/scroll:after:opacity-100";
