import { RemoteImage } from './RemoteImage';

export type GameTeamEmphasis = 'winner' | 'loser' | 'neutral';

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

// `align="right"` reverses the row so the crest faces the score in the middle.
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
      {emphasis === 'winner' && winnerLabel && (
        <span className="sr-only">{winnerLabel}</span>
      )}
    </span>
  );
}
