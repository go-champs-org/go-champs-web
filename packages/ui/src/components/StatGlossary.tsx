import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdChromeReaderMode } from 'react-icons/md';

export interface StatGlossaryColumn {
  slug: string;
  label: string;
  description: string;
}

const ICON_SIZE = { md: 'h-6 w-6', sm: 'h-5 w-5' } as const;
const CHEVRON_SIZE = { md: 'h-5 w-5', sm: 'h-4 w-4' } as const;
const LABEL_SIZE = { md: 'text-base', sm: 'text-sm' } as const;

export interface StatGlossaryToggleProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  controls: string;
  size?: 'md' | 'sm';
}

// The roster and the player stats tables both toggle their glossary the same
// way; only their icon/label sizing differs (the roster table's header runs
// slightly larger).
export function StatGlossaryToggle({
  label,
  isOpen,
  onToggle,
  controls,
  size = 'md'
}: StatGlossaryToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={controls}
      className={`flex cursor-pointer items-center gap-2 font-semibold text-foreground ${LABEL_SIZE[size]}`}
    >
      <MdChromeReaderMode aria-hidden="true" className={`${ICON_SIZE[size]} text-primary-dark`} />
      {label}
      {isOpen ? (
        <FaChevronUp aria-hidden="true" className={CHEVRON_SIZE[size]} />
      ) : (
        <FaChevronDown aria-hidden="true" className={CHEVRON_SIZE[size]} />
      )}
    </button>
  );
}

export interface StatGlossaryListProps {
  id: string;
  columns: StatGlossaryColumn[];
  isOpen: boolean;
}

// Kept in the DOM while collapsed: what a column means is content a crawler
// and a find-in-page should reach without a click.
export function StatGlossaryList({ id, columns, isOpen }: StatGlossaryListProps) {
  return (
    <ul
      id={id}
      hidden={!isOpen}
      data-testid={id}
      className="columns-1 list-disc gap-8 pl-5 text-xs font-bold leading-6 text-foreground sm:columns-2 lg:columns-4"
    >
      {columns.map(column => (
        <li key={column.slug} className="break-inside-avoid">
          {column.label} - {column.description}
        </li>
      ))}
    </ul>
  );
}
