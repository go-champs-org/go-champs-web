// The same red the CMS live indicator uses; it is a status signal, not part of
// the brand palette, so it stays out of the theme tokens. Only the dot carries
// it: as 12px text it falls short of the contrast the light theme needs.
const LIVE_RED = '#FF4136';

export interface LiveBadgeProps {
  label: string;
}

export function LiveBadge({ label }: LiveBadgeProps) {
  return (
    <span
      data-testid="live-badge"
      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-foreground"
    >
      <span
        className="h-2.5 w-2.5 animate-pulse rounded-full"
        style={{ backgroundColor: LIVE_RED }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}
