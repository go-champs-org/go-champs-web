'use client';

const MAX_INITIALS = 3;
const CAPITAL_LETTER_REGEX = /^[A-Z]$/;

export const initials = (name: string): string => {
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

const PinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-3 w-3"
    aria-hidden="true"
  >
    <path d="M14 2 9.5 6.5 5 8l11 11 1.5-4.5L22 10 14 2ZM4 20l5-5" />
  </svg>
);

export interface TournamentMiniCardProps {
  name: string;
  organizationName: string;
  organizationLogoUrl: string;
  href: string;
  isPinned?: boolean;
  pinLabel?: string;
  onTogglePin?: () => void;
}

export const TournamentMiniCard = ({
  name,
  organizationName,
  organizationLogoUrl,
  href,
  isPinned = false,
  pinLabel,
  onTogglePin
}: TournamentMiniCardProps) => (
  <a
    href={href}
    className="flex flex-col rounded-xl border border-border bg-surface p-4 transition-shadow hover:shadow-[0_4px_16px_var(--shadow-elevated)]"
  >
    <header className="flex h-12 w-full items-center font-semibold text-foreground">
      {organizationLogoUrl ? (
        // Organization logos are arbitrary user-uploaded URLs, so they stay on
        // a plain <img> — next/image would need every host allow-listed in
        // next.config.js.
        <img
          src={organizationLogoUrl}
          alt={organizationName}
          className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-base text-foreground">
          {initials(organizationName)}
        </div>
      )}
      <span className="ml-2 line-clamp-2 flex-1">{name}</span>
      {onTogglePin && (
        <button
          type="button"
          // The card is a link, so the pin must not navigate.
          onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            onTogglePin();
          }}
          className={`flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-[0.65rem] font-semibold transition-opacity hover:opacity-90 ${
            isPinned
              ? 'bg-secondary text-neutral-900'
              : 'bg-primary text-foreground'
          }`}
        >
          <PinIcon />
          <span>{pinLabel}</span>
        </button>
      )}
    </header>
    <span className="my-4 block w-full truncate font-semibold text-primary-dark">
      {organizationName}
    </span>
  </a>
);
