import { RemoteImage } from './RemoteImage';

export type GameTeamEmphasis = 'winner' | 'loser' | 'neutral';

// The winner carries the row: it is the only side in full weight, and the
// side it beat steps back into the muted tone. A game still to be decided
// leaves both where they are.
const EMPHASIS_CLASS: Record<GameTeamEmphasis, string> = {
  winner: 'font-bold text-foreground',
  loser: 'font-medium text-muted',
  neutral: 'font-medium text-foreground'
};

export interface GameTeamRowProps {
  logoUrl: string;
  name: string;
  emphasis: GameTeamEmphasis;
  align: 'left' | 'right';
  crestSize: number;
  winnerLabel?: string;
}

// A team's crest and name in a game result row — the schedule, the drawn
// bracket, and the standings table all show the same pairing. The side
// aligned right runs its content right to left, so both crests face the
// score in the middle.
export function GameTeamRow({
  logoUrl,
  name,
  emphasis,
  align,
  crestSize,
  winnerLabel
}: GameTeamRowProps) {
  return (
    <span
      className={`flex min-w-0 items-center gap-2 ${align === 'right' ? 'flex-row-reverse' : ''}`}
    >
      {logoUrl && (
        <RemoteImage
          src={logoUrl}
          alt=""
          width={crestSize}
          height={crestSize}
          className={`shrink-0 rounded-full object-cover ${emphasis === 'loser' ? 'opacity-60' : ''}`}
        />
      )}
      <span className={`truncate ${EMPHASIS_CLASS[emphasis]}`}>{name}</span>
      {/* Weight and tone are the whole signal on screen; the winner has to be
          announced too, where the caller has a label for it. */}
      {emphasis === 'winner' && winnerLabel && (
        <span className="sr-only">{winnerLabel}</span>
      )}
    </span>
  );
}
