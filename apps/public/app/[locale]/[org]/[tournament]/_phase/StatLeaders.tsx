import { FaChevronDown, FaFire } from 'react-icons/fa';
import type { LeaderCard } from '@/src/stats/statLeaders';
import type { StatScope } from '@/src/stats/rosterStats';
import { StatLeaderCard } from './StatLeaderCard';
import { StatLeadersCarousel } from './StatLeadersCarousel';

// Colors are literal, not theme tokens: the band stays dark green in both
// themes, like the profile banner above it.
const BAND_GRADIENT = 'bg-[linear-gradient(115deg,#12140e_0%,#2f4419_100%)]';

// Two cards in view on a tablet, three on a desktop; the carousel slides the
// next ones in.
const CARD_WIDTH =
  'md:w-[calc((100%_-_1rem)/2)] md:shrink-0 md:snap-start lg:w-[calc((100%_-_3rem)/3)]';

interface StatLeadersProps {
  cards: LeaderCard[];
  title: string;
  statsPath: string;
  seeAllLabel: string;
  scopeLabels: Record<StatScope, string>;
  scopeLegend: string;
  previousLabel: string;
  nextLabel: string;
}

// The tournament's highlights: the first few leaders of each stat the sport
// puts forward. A native <details> collapses it without a client island of
// its own, so only the cards' scope toggles hydrate; it opens on every visit.
export function StatLeaders({
  cards,
  title,
  statsPath,
  seeAllLabel,
  scopeLabels,
  scopeLegend,
  previousLabel,
  nextLabel
}: StatLeadersProps) {
  if (cards.length === 0) return null;

  return (
    <details open data-testid="stat-leaders" className={`group ${BAND_GRADIENT}`}>
      <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-4 text-white md:px-6 [&::-webkit-details-marker]:hidden">
        <FaFire aria-hidden="true" className="text-[#f5a623]" />
        <span className="flex-1 text-base font-bold">{title}</span>
        <FaChevronDown
          aria-hidden="true"
          className="transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="px-4 pb-6 md:px-2">
        <StatLeadersCarousel previousLabel={previousLabel} nextLabel={nextLabel}>
          {cards.map(card => (
          <StatLeaderCard
            key={card.slug}
            card={card}
            statsPath={statsPath}
            seeAllLabel={seeAllLabel}
            scopeLabels={scopeLabels}
            scopeLegend={scopeLegend}
              className={CARD_WIDTH}
            />
          ))}
        </StatLeadersCarousel>
      </div>
    </details>
  );
}
