import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getAggregatedPlayerStatsByFilter,
  getGamesByFilter,
  getSportBySlug,
  getTournamentBySlug,
  type AggregatedPlayerStatsLogEntity,
  type GameEntity,
  type SportEntity,
  type TournamentWithTeamsEntity
} from '@gochamps/api-client';
import type { PlayerEntity, PlayerStatEntity } from '@gochamps/api-client';
import type { TeamEntity } from '@gochamps/domain-types';
import { Surface } from '@gochamps/ui';
import { isNotFoundError } from '@/src/api/isNotFoundError';
import { CMS_URL } from '@/src/config/cms';
import { formatGameTime } from '@/src/games/gameDateTime';
import { gamesByDate, type GameDay } from '@/src/games/gamesByDate';
import { teamDisplayName } from '@/src/games/gameTeams';
import { sideEmphasis, type SideEmphasis } from '@/src/games/sideEmphasis';
import { gameWinner, teamRecord } from '@/src/games/teamRecord';
import { buildPageMetadata } from '@/src/seo/metadata';
import { TeamSections, type TeamTab } from './TeamSections';
import { RosterStatsTable, type StatColumnView } from './RosterStatsTable';
import { labelCoaches, type LabelledCoach } from '@/src/teams/coaches';
import { teamRoster } from '@/src/teams/roster';
import {
  availableScopes,
  rosterStatRows,
  statColumnsByScope,
  type RosterStatRow,
  type StatScope
} from '@/src/stats/rosterStats';
import { baseStatSlug } from '@/src/stats/sportStatColumns';

// A roster barely moves during a tournament and none of it is live, so the
// rendered HTML can be reused for minutes at a time instead of hitting the API
// on every view.
export const revalidate = 300;

// The team list is unbounded, so nothing is prerendered at build time —
// declaring the params is what puts this route on the ISR path.
export async function generateStaticParams() {
  return [];
}

interface TeamPageParams {
  locale: string;
  org: string;
  tournament: string;
  teamId: string;
}

const teamPagePath = ({ org, tournament, teamId }: TeamPageParams): string =>
  `/${org}/${tournament}/times/${teamId}`;

// The athlete and official profile pages of the CMS lift every block off the
// page with a soft shadow; Surface already owns the radius, border and
// background, so this is only the elevation it does not carry.
const SECTION_CLASS = 'p-6 shadow-[0_2px_10px_var(--shadow-elevated)]';

const gamePageHref = (
  { locale, org, tournament }: TeamPageParams,
  gameId: string
): string => `/${locale}/${org}/${tournament}/jogos/${gameId}`;

// generateMetadata and the page both need the tournament; cache() keeps that to
// a single request instead of fetching it twice per view.
const loadTournament = cache(
  async (
    org: string,
    tournament: string
  ): Promise<TournamentWithTeamsEntity | null> => {
    try {
      return await getTournamentBySlug(org, tournament);
    } catch (error) {
      if (isNotFoundError(error)) return null;
      throw error;
    }
  }
);

// Teams are only exposed nested in the tournament: there is no endpoint that
// resolves a team id on its own.
const findTeam = (
  tournament: TournamentWithTeamsEntity | null,
  teamId: string
): TeamEntity | undefined => tournament?.teams.find(team => team.id === teamId);

// A team plays at home or away, so its schedule is the union of both sides —
// the `or` group the games filter exists for. The schedule is a companion to
// the roster, not the page itself: an unreachable endpoint leaves the roster
// standing instead of taking the page down, same shape the game page uses for
// the tournament it links back to.
const loadTeamGames = (teamId: string): Promise<GameEntity[]> =>
  getGamesByFilter({
    or: [{ home_team_id: teamId }, { away_team_id: teamId }]
  }).catch(() => []);

// The tournament only names its statistics; which of them are totals and
// which are per game averages is the sport's own catalogue. Without it the
// table still renders, as the single list of statistics the tournament named.
const loadSport = (sportSlug: string): Promise<SportEntity | null> =>
  sportSlug ? getSportBySlug(sportSlug).catch(() => null) : Promise.resolve(null);

// The numbers are a companion to the roster, same as the schedule: an
// unreachable endpoint leaves the names standing with a dash in every column.
const loadTeamStats = (
  tournamentId: string,
  teamId: string
): Promise<AggregatedPlayerStatsLogEntity[]> =>
  getAggregatedPlayerStatsByFilter({ tournamentId, teamId }).catch(() => []);

interface TeamView {
  tournament: TournamentWithTeamsEntity;
  team: TeamEntity;
  roster: PlayerEntity[];
  games: GameEntity[];
  sport: SportEntity | null;
  statsLogs: AggregatedPlayerStatsLogEntity[];
}

// A team is only ever found inside a tournament, so a missing tournament and a
// missing team are the same 404. Resolving both here is what keeps the page
// component free of fallbacks that could never render.
const loadTeamView = async (
  org: string,
  tournamentSlug: string,
  teamId: string
): Promise<TeamView> => {
  // The route already carries the team id, so the schedule does not have to
  // wait for the tournament to resolve the team.
  const [tournament, games] = await Promise.all([
    loadTournament(org, tournamentSlug),
    loadTeamGames(teamId)
  ]);
  const team = findTeam(tournament, teamId);

  if (!tournament || !team) notFound();

  // Both of these need the tournament first — one for its sport, the other for
  // its id — so they are the second round trip rather than a third.
  const [sport, statsLogs] = await Promise.all([
    loadSport(tournament.sportSlug),
    loadTeamStats(tournament.id, team.id)
  ]);

  return {
    tournament,
    team,
    roster: teamRoster(tournament.players, team.id),
    games,
    sport,
    statsLogs
  };
};

export async function generateMetadata({
  params
}: {
  params: Promise<TeamPageParams>;
}): Promise<Metadata> {
  const routeParams = await params;
  const { locale, org, tournament: tournamentSlug, teamId } = routeParams;
  const [tournament, t, tTeam] = await Promise.all([
    loadTournament(org, tournamentSlug),
    getTranslations({ locale, namespace: 'metadata' }),
    getTranslations({ locale, namespace: 'team' })
  ]);

  const team = findTeam(tournament, teamId);
  const values = {
    team: team ? team.name : tTeam('unknownTeam'),
    tournament: tournament ? tournament.name : tTeam('unknownTournament')
  };

  return buildPageMetadata({
    locale,
    path: teamPagePath(routeParams),
    title: t('teamTitle', values),
    description: t('teamDescription', values),
    // A team the tournament no longer lists renders as a 404; keeping that URL
    // out of the index stops the crawler from re-serving a dead roster.
    noIndex: !team
  });
}

interface Highlight {
  value: number;
  label: string;
}

// The milestone box of the athlete banner: a dark plate over the artwork with
// the two numbers that describe the profile at a glance. It is the first thing
// a narrow screen drops, so it never competes with the name.
function Highlights({
  title,
  highlights
}: {
  title: string;
  highlights: Highlight[];
}) {
  return (
    <div
      data-testid="team-highlights"
      className="hidden w-[220px] shrink-0 rounded-xl bg-[#12140e]/55 p-3 md:block"
    >
      <p className="mb-3 rounded-lg bg-[#12140e]/75 px-3 py-1 text-center text-[0.6rem] font-bold uppercase tracking-[0.08em]">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {highlights.map(highlight => (
          <div key={highlight.label} className="text-center">
            <p className="text-2xl font-extrabold leading-none tabular-nums">
              {highlight.value}
            </p>
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.06em] opacity-85">
              {highlight.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface TeamIdentityProps {
  team: TeamEntity;
  overline: string;
  highlightsTitle: string;
  highlights: Highlight[];
}

// What sits inside the banner card: the identity of the team, with the tab
// buttons the client island adds underneath it.
function TeamIdentity({
  team,
  overline,
  highlightsTitle,
  highlights
}: TeamIdentityProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* A narrow screen keeps the card to the essentials — logo, name, tabs —
          the same trim the athlete banner makes. */}
      <p className="hidden text-sm font-bold md:block">{overline}</p>

      <div className="flex flex-col items-center gap-3 text-center md:flex-row md:gap-6 md:text-left">
        {team.logoUrl && (
          // Team logos live on arbitrary user-uploaded hosts: next/image would
          // need each one allow-listed in next.config.js.
          <img
            src={team.logoUrl}
            alt=""
            width={120}
            height={120}
            decoding="async"
            className="h-[84px] w-[84px] shrink-0 rounded-full border-4 border-[#a6cd63] bg-neutral-100 object-cover md:h-[120px] md:w-[120px]"
          />
        )}

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-extrabold leading-tight md:text-3xl">
            {team.name}
          </h1>
          {team.triCode && (
            <p className="text-sm font-semibold uppercase tracking-wide opacity-80">
              {team.triCode}
            </p>
          )}
        </div>

        <Highlights title={highlightsTitle} highlights={highlights} />
      </div>
    </div>
  );
}

// The green bar the profile pages put before every section title
// (apps/cms/src/Pages/AthleteProfilePage.scss). It is decoration: the heading
// text alone is what a screen reader announces.
function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
      <span
        aria-hidden="true"
        className="inline-block h-[1.1rem] w-1 rounded-full bg-primary"
      />
      {children}
    </h2>
  );
}

interface CoachingStaffProps {
  coaches: LabelledCoach[];
  title: string;
}

function CoachingStaff({ coaches, title }: CoachingStaffProps) {
  return (
    <Surface as="section" className={SECTION_CLASS}>
      <SectionTitle>{title}</SectionTitle>
      <ul className="mt-4 flex flex-col gap-2">
        {coaches.map(coach => (
          <li key={coach.id} className="flex flex-wrap items-baseline gap-2">
            <span className="font-medium text-foreground">{coach.name}</span>
            {/* An unlabelled coach must not leave an empty flex item behind:
                the row gap would render as trailing space after the name. */}
            {coach.label && (
              <span className="text-sm text-muted">{coach.label}</span>
            )}
          </li>
        ))}
      </ul>
    </Surface>
  );
}

interface RosterProps {
  rows: RosterStatRow[];
  columnsByScope: Record<string, StatColumnView[]>;
  scopes: StatScope[];
  scopeLabels: Record<string, string>;
  title: string;
  scopeLegend: string;
  numberLabel: string;
  nameLabel: string;
  sortLabel: string;
}

// The roster of the CMS team view is the aggregated stats table, not a list of
// names: routing this page without the columns would take data away from the
// visitor (apps/cms/src/Pages/TeamView.tsx).
function Roster({
  rows,
  columnsByScope,
  scopes,
  scopeLabels,
  title,
  scopeLegend,
  numberLabel,
  nameLabel,
  sortLabel
}: RosterProps) {
  return (
    <Surface as="section" className={SECTION_CLASS} data-testid="roster">
      {/* The tab bar already names this panel; the heading stays for the
          document outline and for a single-section team with no tab bar. */}
      <h2 className="sr-only">{title}</h2>
      <RosterStatsTable
        rows={rows}
        columnsByScope={columnsByScope}
        scopes={scopes}
        scopeLabels={scopeLabels}
        scopeLegend={scopeLegend}
        numberLabel={numberLabel}
        nameLabel={nameLabel}
        sortLabel={sortLabel}
      />
    </Surface>
  );
}

interface GameRowProps {
  game: GameEntity;
  href: string;
  time: string;
  undecidedLabel: string;
  winnerLabel: string;
}

// The winner carries the row: it is the only side in full weight, and the side
// it beat steps back into the muted tone. A game still to be decided leaves
// both where they are.
const EMPHASIS_CLASS: Record<SideEmphasis, string> = {
  winner: 'font-bold text-foreground',
  loser: 'font-medium text-muted',
  neutral: 'font-medium text-foreground'
};

function TeamCrest({
  logoUrl,
  isDimmed
}: {
  logoUrl: string;
  isDimmed: boolean;
}) {
  return (
    // Team logos live on arbitrary user-uploaded hosts: next/image would need
    // each one allow-listed in next.config.js.
    <img
      src={logoUrl}
      alt=""
      width={28}
      height={28}
      decoding="async"
      className={`h-7 w-7 shrink-0 rounded-full object-cover ${isDimmed ? 'opacity-60' : ''}`}
    />
  );
}

interface GameTeamProps {
  logoUrl: string;
  name: string;
  emphasis: SideEmphasis;
  winnerLabel: string;
  isHome?: boolean;
}

// Both crests face the score in the middle of the row, which is the reading
// order the CMS game card already uses: the home team runs right to left.
function GameTeam({
  logoUrl,
  name,
  emphasis,
  winnerLabel,
  isHome = false
}: GameTeamProps) {
  return (
    <span
      className={`flex min-w-0 items-center gap-2 ${isHome ? 'flex-row-reverse' : ''}`}
    >
      {logoUrl && (
        <TeamCrest logoUrl={logoUrl} isDimmed={emphasis === 'loser'} />
      )}
      <span className={`truncate ${EMPHASIS_CLASS[emphasis]}`}>{name}</span>
      {/* Weight and tone are the whole signal on screen; the winner has to be
          announced too. */}
      {emphasis === 'winner' && <span className="sr-only">{winnerLabel}</span>}
    </span>
  );
}

function GameRow({
  game,
  href,
  time,
  undecidedLabel,
  winnerLabel
}: GameRowProps) {
  const winner = gameWinner(game);
  const home = sideEmphasis(winner, 'home');
  const away = sideEmphasis(winner, 'away');

  return (
    <Link
      href={href}
      data-testid="game-row"
      className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-border px-3 py-3 text-sm transition-colors last:border-0 hover:bg-background"
    >
      <GameTeam
        logoUrl={game.homeTeam.logoUrl}
        name={teamDisplayName(
          game.homeTeam,
          game.homePlaceholder,
          undecidedLabel
        )}
        emphasis={home}
        winnerLabel={winnerLabel}
        isHome
      />
      <span className="flex flex-col items-center">
        <span className="flex items-center gap-1 tabular-nums">
          <span className={EMPHASIS_CLASS[home]}>{game.homeScore}</span>
          <span className="text-muted">x</span>
          <span className={EMPHASIS_CLASS[away]}>{game.awayScore}</span>
        </span>
        {/* The kickoff time is a formatted number: machine translation of the
            page must leave it alone, same as on the game page. */}
        <span className="notranslate text-xs text-muted">{time}</span>
      </span>
      <GameTeam
        logoUrl={game.awayTeam.logoUrl}
        name={teamDisplayName(
          game.awayTeam,
          game.awayPlaceholder,
          undecidedLabel
        )}
        emphasis={away}
        winnerLabel={winnerLabel}
      />
    </Link>
  );
}

interface GamesScheduleProps {
  days: GameDay[];
  title: string;
  locale: string;
  gameHref: (gameId: string) => string;
  undecidedLabel: string;
  winnerLabel: string;
}

function GamesSchedule({
  days,
  title,
  locale,
  gameHref,
  undecidedLabel,
  winnerLabel
}: GamesScheduleProps) {
  return (
    <Surface as="section" className={SECTION_CLASS} data-testid="games">
      <h2 className="sr-only">{title}</h2>
      <div className="flex flex-col gap-6">
        {days.map(day => (
          <div
            key={day.key}
            data-testid="games-day"
            className="flex flex-col gap-2"
          >
            {/* A game the organizer has not scheduled yet has no day to head
                its group with. */}
            {day.label && (
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {day.label}
              </h3>
            )}
            {/* Games of the same day read as one block: the rows share their
                borders and only the outer corners are rounded, the way the
                profile schedule stacks a tournament's games. */}
            <div className="overflow-hidden rounded-xl border border-border">
              {day.games.map(game => (
                <GameRow
                  key={game.id}
                  game={game}
                  href={gameHref(game.id)}
                  time={formatGameTime(game.datetime, locale)}
                  undecidedLabel={undecidedLabel}
                  winnerLabel={winnerLabel}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Surface>
  );
}

interface RosterPanelProps extends RosterProps {
  coaches: LabelledCoach[];
  coachingStaffTitle: string;
}

// The roster tab of the CMS team view carries the coaching staff too: they are
// the same answer to "who is this team".
function RosterPanel({
  coaches,
  coachingStaffTitle,
  ...rosterProps
}: RosterPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      {rosterProps.rows.length > 0 && <Roster {...rosterProps} />}

      {coaches.length > 0 && (
        <CoachingStaff coaches={coaches} title={coachingStaffTitle} />
      )}
    </div>
  );
}

// The header of a column is the abbreviation its sport is read in — PTS, REB —
// and the tournament's own title of the statistic is what the tooltip and the
// screen reader get. A sport with no abbreviations of its own is headed by
// those titles instead.
const statColumnViews = (
  columns: PlayerStatEntity[],
  abbreviations: Record<string, string>
): StatColumnView[] =>
  columns.map(column => ({
    slug: column.slug,
    label: abbreviations[baseStatSlug(column.slug)] || column.title,
    description: column.title
  }));

const columnViewsByScope = (
  columnsByScope: Record<string, PlayerStatEntity[]>,
  abbreviations: Record<string, string>
): Record<string, StatColumnView[]> =>
  Object.fromEntries(
    Object.entries(columnsByScope).map(([scope, columns]) => [
      scope,
      statColumnViews(columns, abbreviations)
    ])
  );

interface CandidateTab extends TeamTab {
  hasContent: boolean;
}

// A section with nothing in it earns no tab, which is what keeps the panels
// free of empty states.
const withContent = (candidates: CandidateTab[]): TeamTab[] =>
  candidates.filter(tab => tab.hasContent);

export default async function TeamPage({
  params
}: {
  params: Promise<TeamPageParams>;
}) {
  const routeParams = await params;
  const { locale, org, tournament: tournamentSlug, teamId } = routeParams;
  setRequestLocale(locale);

  const [{ tournament, team, roster, games, sport, statsLogs }, t, tGame] =
    await Promise.all([
      loadTeamView(org, tournamentSlug, teamId),
      getTranslations('team'),
      getTranslations('game')
    ]);

  // Which scopes the table offers, and the columns of each, are decided here:
  // the client island only switches between what the page resolved.
  const scopes = availableScopes(tournament.playerStats, sport);
  const columnsByScope = columnViewsByScope(
    statColumnsByScope(tournament.playerStats, sport, scopes),
    t.raw('statColumns') as Record<string, string>
  );
  const rows = rosterStatRows(roster, statsLogs);
  const scopeLabels = {
    aggregate: t('scopeAggregate'),
    per_game: t('scopePerGame')
  };
  // Which statistic a header sorts by is only known per column, so the island
  // fills the placeholder itself and the pattern crosses the boundary raw.
  const sortLabel = t.raw('sortByStat') as string;

  // Newest day first, the order the CMS team view already shows: a visitor
  // opening a team mid-tournament is looking for the last result, not the
  // opening round.
  const days = [...gamesByDate(games, locale)].reverse();
  const record = teamRecord(games, team.id);

  // The CMS team view splits the roster from the schedule into tabs; stacking
  // them instead would make the public page a different screen. A section with
  // nothing in it earns no tab, which is what keeps the panels free of empty
  // states.
  const tabs = withContent([
    {
      id: 'roster',
      label: t('roster'),
      panel: (
        <RosterPanel
          rows={rows}
          columnsByScope={columnsByScope}
          scopes={scopes}
          scopeLabels={scopeLabels}
          coaches={labelCoaches(team.coaches, t)}
          title={t('roster')}
          coachingStaffTitle={t('coachingStaff')}
          scopeLegend={t('statsScope')}
          numberLabel={t('shirtNumber')}
          nameLabel={t('playerName')}
          sortLabel={sortLabel}
        />
      ),
      hasContent: rows.length + team.coaches.length > 0
    },
    {
      id: 'games',
      label: t('games'),
      panel: (
        <GamesSchedule
          days={days}
          title={t('games')}
          locale={locale}
          gameHref={gameId => gamePageHref(routeParams, gameId)}
          undecidedLabel={tGame('undecidedTeam')}
          winnerLabel={t('winner')}
        />
      ),
      hasContent: days.length > 0
    }
  ]);

  return (
    <main
      data-testid="team-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6">
        {/* Tournament pages still live in the CMS until the _redirects rollout
            moves them here, so this link must stay absolute. */}
        <a
          href={`${CMS_URL}/${org}/${tournamentSlug}`}
          className="text-sm font-semibold text-primary-dark hover:underline"
        >
          {tournament.name}
        </a>

        <TeamSections
          label={t('sections')}
          tabs={tabs}
          identity={
            <TeamIdentity
              team={team}
              overline={t('badge')}
              highlightsTitle={t('highlights')}
              highlights={[
                { value: record.games, label: t('games') },
                { value: record.wins, label: t('wins') }
              ]}
            />
          }
        />
      </div>
    </main>
  );
}
