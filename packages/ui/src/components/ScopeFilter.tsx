const SCOPE_CLASS =
  'cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition-colors';

const scopeClass = (isActive: boolean): string =>
  isActive
    ? `${SCOPE_CLASS} border-primary-dark bg-primary-dark text-neutral-100`
    : `${SCOPE_CLASS} border-border text-muted hover:bg-background`;

export interface ScopeFilterProps<TScope extends string> {
  scopes: TScope[];
  scopeLabels: Record<string, string>;
  legend: string;
  activeScope: TScope;
  onSelect: (scope: TScope) => void;
  testId: string;
}

// A select in the CMS, a pair of pills here: two options never earn a
// dropdown. Shared by every stats table that offers an aggregate/per-game
// scope (roster, player, box score).
export function ScopeFilter<TScope extends string>({
  scopes,
  scopeLabels,
  legend,
  activeScope,
  onSelect,
  testId
}: ScopeFilterProps<TScope>) {
  return (
    <div role="group" aria-label={legend} className="flex flex-wrap gap-2" data-testid={testId}>
      {scopes.map(scope => (
        <button
          key={scope}
          type="button"
          aria-pressed={scope === activeScope}
          onClick={() => onSelect(scope)}
          className={scopeClass(scope === activeScope)}
        >
          {scopeLabels[scope]}
        </button>
      ))}
    </div>
  );
}
