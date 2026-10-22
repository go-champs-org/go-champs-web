import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import type { SortDirection } from '@/src/stats/rosterStats';

// Shows which column ranks a table and which way: down for best first, up
// for the other way around. A header that does not rank the table shows
// nothing. The header's `aria-sort` is what a screen reader gets; the arrow
// is for the eye.
export function SortArrow({ direction }: { direction: SortDirection | null }) {
  if (!direction) return null;

  const Arrow = direction === 'asc' ? FaArrowUp : FaArrowDown;

  return (
    <Arrow
      aria-hidden="true"
      data-testid={`sort-arrow-${direction}`}
      className="h-2.5 w-2.5 shrink-0 text-primary-dark"
    />
  );
}
