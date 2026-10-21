'use client';

import { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaFilter } from 'react-icons/fa';

export interface StatsFilterOption {
  id: string;
  label: string;
}

export interface TournamentStatsFilterValues {
  phaseId: string;
  teamId: string;
  // Keyed by stat slug; a stat with no minimum is absent, not zero.
  minStats: Record<string, number>;
}

export const NO_STATS_FILTERS: TournamentStatsFilterValues = {
  phaseId: '',
  teamId: '',
  minStats: {}
};

export interface TournamentStatsFilterLabels {
  legend: string;
  phase: string;
  allPhases: string;
  team: string;
  allTeams: string;
}

// One callback per field rather than one for the whole set of values: the
// minimum fields report on a delay, and a whole set captured before that delay
// would undo a phase or team picked in the meantime.
interface TournamentStatsFiltersProps {
  phases: StatsFilterOption[];
  teams: StatsFilterOption[];
  // `id` is the stat slug, `label` what the field is called.
  minStatFilters: StatsFilterOption[];
  values: TournamentStatsFilterValues;
  onPhaseChange: (phaseId: string) => void;
  onTeamChange: (teamId: string) => void;
  onMinStatChange: (slug: string, minimum: number | null) => void;
  labels: TournamentStatsFilterLabels;
}

// Full width and stacked on a phone, side by side from md up.
const FIELD_CLASS = 'flex w-full flex-col gap-1 text-xs font-semibold text-muted md:w-auto';
const CONTROL_CLASS =
  'h-10 rounded-lg border border-border bg-surface-input px-3 py-2 text-sm font-normal text-foreground outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_var(--shadow-elevated)]';

// Each keystroke would otherwise be a request of its own.
const MIN_STAT_DEBOUNCE_MS = 400;

// Empty or zero is no minimum at all; anything else must be a positive
// number to be worth asking the API for.
const parseMinimum = (input: string): number | null => {
  const value = Number(input);

  return input.trim() !== '' && Number.isFinite(value) && value > 0 ? value : null;
};

// The same object back when nothing changed, so a settled field reporting
// again doesn't count as a new filter.
export const withMinimum = (
  minStats: Record<string, number>,
  slug: string,
  minimum: number | null
): Record<string, number> => {
  if ((minStats[slug] ?? null) === minimum) return minStats;

  const rest = { ...minStats };
  delete rest[slug];

  return minimum === null ? rest : { ...rest, [slug]: minimum };
};

interface SelectFilterProps {
  id: string;
  label: string;
  allLabel: string;
  options: StatsFilterOption[];
  // Fewer options than this and the filter isn't worth showing.
  minimumOptions: number;
  value: string;
  onChange: (value: string) => void;
}

function SelectFilter({
  id,
  label,
  allLabel,
  options,
  minimumOptions,
  value,
  onChange
}: SelectFilterProps) {
  if (options.length < minimumOptions) return null;

  return (
    <label htmlFor={id} className={FIELD_CLASS}>
      {label}
      <select
        id={id}
        value={value}
        onChange={event => onChange(event.target.value)}
        className={CONTROL_CLASS}
      >
        <option value="">{allLabel}</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

interface MinStatFilterProps {
  slug: string;
  label: string;
  onChange: (slug: string, minimum: number | null) => void;
}

// Keeps its own text so a half-typed value isn't reformatted under the
// visitor's cursor, and only reports a settled one.
function MinStatFilter({ slug, label, onChange }: MinStatFilterProps) {
  const [input, setInput] = useState('');

  useEffect(() => {
    const timeout = setTimeout(
      () => onChange(slug, parseMinimum(input)),
      MIN_STAT_DEBOUNCE_MS
    );

    return () => clearTimeout(timeout);
  }, [input]);

  const id = `stats-min-${slug}`;

  return (
    <label htmlFor={id} className={FIELD_CLASS}>
      {label}
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        step={1}
        value={input}
        onChange={event => setInput(event.target.value)}
        className={`${CONTROL_CLASS} w-full md:w-24`}
      />
    </label>
  );
}

// A single phase is the whole tournament already — "all" and that phase
// would be the same table — so phases need two to be a filter, teams one.
const MINIMUM_PHASES = 2;
const MINIMUM_TEAMS = 1;

const hasAnyFilter = (
  phases: StatsFilterOption[],
  teams: StatsFilterOption[],
  minStatFilters: StatsFilterOption[]
): boolean =>
  phases.length >= MINIMUM_PHASES ||
  teams.length >= MINIMUM_TEAMS ||
  minStatFilters.length > 0;

const PANEL_ID = 'stats-filters-panel';

const activeFilterCount = (values: TournamentStatsFilterValues): number =>
  Number(Boolean(values.phaseId)) +
  Number(Boolean(values.teamId)) +
  Object.keys(values.minStats).length;

// Collapsed, the toggle is all a phone shows of the filters, so it says how
// many are narrowing the table.
const toggleLabel = (legend: string, activeCount: number): string =>
  activeCount > 0 ? `${legend} (${activeCount})` : legend;

// Hidden by CSS, not unmounted: a minimum typed before collapsing is still
// there on the next expand. From md up the panel is always shown.
const panelClass = (isOpen: boolean): string =>
  `${isOpen ? 'flex' : 'hidden'} flex-col gap-3 md:flex md:flex-row md:flex-wrap md:items-end md:gap-4`;

interface FiltersToggleProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

// Phones only: the filters stacked one below another take more of the screen
// than the table they narrow.
function FiltersToggle({ label, isOpen, onToggle }: FiltersToggleProps) {
  const Chevron = isOpen ? FaChevronUp : FaChevronDown;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={PANEL_ID}
      className="flex cursor-pointer items-center gap-2 self-start text-sm font-semibold text-foreground md:hidden"
    >
      <FaFilter aria-hidden="true" className="h-4 w-4 text-primary-dark" />
      {label}
      <Chevron aria-hidden="true" className="h-4 w-4" />
    </button>
  );
}

export function TournamentStatsFilters({
  phases,
  teams,
  minStatFilters,
  values,
  onPhaseChange,
  onTeamChange,
  onMinStatChange,
  labels
}: TournamentStatsFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!hasAnyFilter(phases, teams, minStatFilters)) return null;

  return (
    <div
      role="group"
      aria-label={labels.legend}
      className="flex flex-col gap-3"
      data-testid="stats-filters"
    >
      <FiltersToggle
        label={toggleLabel(labels.legend, activeFilterCount(values))}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />

      <div id={PANEL_ID} className={panelClass(isOpen)}>
        <SelectFilter
          id="stats-phase"
          label={labels.phase}
          allLabel={labels.allPhases}
          options={phases}
          minimumOptions={MINIMUM_PHASES}
          value={values.phaseId}
          onChange={onPhaseChange}
        />

        <SelectFilter
          id="stats-team"
          label={labels.team}
          allLabel={labels.allTeams}
          options={teams}
          minimumOptions={MINIMUM_TEAMS}
          value={values.teamId}
          onChange={onTeamChange}
        />

        {minStatFilters.map(filter => (
          <MinStatFilter
            key={filter.id}
            slug={filter.id}
            label={filter.label}
            onChange={onMinStatChange}
          />
        ))}
      </div>
    </div>
  );
}
