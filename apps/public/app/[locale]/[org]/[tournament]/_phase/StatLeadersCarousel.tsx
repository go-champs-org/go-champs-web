'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Stacked on a phone; from a tablet up, one row that slides sideways, with two
// cards in view on a tablet and three on a desktop. The scrollbar is hidden:
// the arrows are how a mouse moves the row, a trackpad or a finger still
// swipes it.
const CARDS_ROW =
  'flex flex-col gap-4 md:snap-x md:snap-mandatory md:flex-row md:overflow-x-auto md:pt-1 lg:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

// The arrows live in gutters of their own on each side of the row, so they
// never sit on top of a card's values.
const ARROW =
  'absolute top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface text-foreground shadow-[0_2px_10px_var(--shadow-elevated)] transition-colors hover:text-accent-text md:flex';

// A whole fold per click: the cards in view plus the gap after the last one,
// so the next fold starts on a card's edge the way the snap points would.
const foldStep = (row: HTMLElement): number => {
  const gap = Number.parseFloat(getComputedStyle(row).columnGap) || 0;

  return row.clientWidth + gap;
};

// A pixel of slack: a fractional scroll position never quite reaches the end.
const hasMoreToTheRight = (row: HTMLElement): boolean =>
  row.scrollLeft + row.clientWidth < row.scrollWidth - 1;

interface StatLeadersCarouselProps {
  children: ReactNode;
  previousLabel: string;
  nextLabel: string;
}

export function StatLeadersCarousel({
  children,
  previousLabel,
  nextLabel
}: StatLeadersCarouselProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const updateArrows = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;

    setCanGoBack(row.scrollLeft > 0);
    setCanGoForward(hasMoreToTheRight(row));
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [updateArrows]);

  const slide = (direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;

    row.scrollBy({ left: direction * foldStep(row), behavior: 'smooth' });
  };

  return (
    <div className="relative md:px-10">
      <div ref={rowRef} onScroll={updateArrows} className={CARDS_ROW}>
        {children}
      </div>
      {canGoBack && (
        <button
          type="button"
          aria-label={previousLabel}
          onClick={() => slide(-1)}
          className={`${ARROW} left-0`}
        >
          <FaChevronLeft aria-hidden="true" />
        </button>
      )}
      {canGoForward && (
        <button
          type="button"
          aria-label={nextLabel}
          onClick={() => slide(1)}
          className={`${ARROW} right-0`}
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
