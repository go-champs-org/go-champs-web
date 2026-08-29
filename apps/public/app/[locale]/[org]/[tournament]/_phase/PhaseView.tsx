/**
 * The phase view, shared by fases/[phaseId] and the tournament root. Route
 * exports (revalidate, generateStaticParams, generateMetadata) stay in each
 * page.tsx — Next reads those only from a route module.
 */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache, type ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getPhase,
  getGamesByPhaseId,
  getTournamentBySlug,
  type DrawEntity,
  type EliminationEntity,
  type EliminationStatEntity,
  type PhaseEntity,
  type TournamentWithTeamsEntity
} from '@gochamps/api-client';
import type { TeamEntity } from '@gochamps/domain-types';
import { GameTeamRow, ProfileBanner, RemoteImage, Surface } from '@gochamps/ui';
import { isNotFoundError } from '@/src/api/isNotFoundError';
import { gamesByDate, closestDayIndex, type GameDay } from '@/src/games/gamesByDate';
import { teamDisplayName } from '@/src/games/gameTeams';
import { GamesPager } from './GamesPager';
import { TournamentQrCode } from '@/src/components/TournamentQrCode';

export interface PhaseViewParams {
  locale: string;
  org: string;
  tournament: string;
  phaseId: string;
}

// cache(): generateMetadata and the page both need these, once per request.
export const loadPhase = cache(
  async (phaseId: string): Promise<PhaseEntity | null> => {
    try {
      return await getPhase(phaseId);
    } catch (error) {
      if (isNotFoundError(error)) return null;
      throw error;
    }
  }
);

export const loadTournament = cache(
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

// The games are a companion to the phase: an unreachable endpoint leaves the
// phase standing with an empty list instead of taking the page down.
const loadGames = (phaseId: string) =>
  getGamesByPhaseId(phaseId).catch(() => []);

/**
 * Mirrors the CMS's currentPhaseId (Tournaments/dataMappers.ts): the phase in
 * progress, else the first one as the API returned it — deliberately not the
 * lowest `order`, which sorts the tabs but would pick a different phase than
 * the CMS shows today.
 */
export const resolveDefaultPhaseId = (
  tournament: TournamentWithTeamsEntity | null
): string | null => {
  if (!tournament || tournament.phases.length === 0) return null;

  const inProgress = tournament.phases.find(phase => phase.isInProgress);

  return inProgress ? inProgress.id : tournament.phases[0].id;
};

// A team stat row can name a team the tournament's roster no longer carries
// (or none at all yet, for a group still being seeded) — the empty entity
// lets teamDisplayName fall through to the placeholder/fallback label instead
// of every caller null-checking the lookup.
const EMPTY_TEAM: TeamEntity = {
  id: '',
  name: '',
  logoUrl: '',
  triCode: '',
  primaryColor: '',
  coaches: []
};

// A tournament that failed to resolve leaves every team display falling
// through to its placeholder/fallback label, the same non-fatal shape as an
// unreachable companion fetch elsewhere on this page.
const teamById = (
  tournament: TournamentWithTeamsEntity | null
): Record<string, TeamEntity> =>
  Object.fromEntries((tournament?.teams || []).map(team => [team.id, team]));

interface TournamentBreadcrumbProps {
  homeHref: string;
  homeLabel: string;
  currentLabel: string;
}

function TournamentBreadcrumb({
  homeHref,
  homeLabel,
  currentLabel
}: TournamentBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href={homeHref} className="hover:text-primary-dark">
            {homeLabel}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="font-semibold text-primary-dark" aria-current="page">
          {currentLabel}
        </li>
      </ol>
    </nav>
  );
}

function TournamentLogo({ logoUrl, name }: { logoUrl: string; name: string }) {
  return logoUrl ? (
    <RemoteImage
      src={logoUrl}
      alt=""
      width={56}
      height={56}
      className="h-14 w-14 shrink-0 rounded-xl bg-neutral-100 object-cover md:h-16 md:w-16"
    />
  ) : (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-xl font-extrabold text-[#4d6b2c] md:h-16 md:w-16">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

interface TournamentStatProps {
  value: number;
  label: string;
}

function TournamentStat({ value, label }: TournamentStatProps) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 py-4 text-center">
      <span className="text-2xl font-extrabold text-primary-dark">{value}</span>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </span>
    </div>
  );
}

// A tournament is "active" by inference, not a real status the API carries —
// any phase still in progress reads as the tournament being live.
const tournamentIsActive = (tournament: TournamentWithTeamsEntity): boolean =>
  tournament.phases.some(phase => phase.isInProgress);

interface TournamentHeaderProps {
  tournament: TournamentWithTeamsEntity;
  homeHref: string;
  homeLabel: string;
  activeLabel: string;
  athletesLabel: string;
  teamsLabel: string;
  phasesLabel: string;
  actions: ReactNode;
}

function TournamentHeader({
  tournament,
  homeHref,
  homeLabel,
  activeLabel,
  athletesLabel,
  teamsLabel,
  phasesLabel,
  actions
}: TournamentHeaderProps) {
  const isActive = tournamentIsActive(tournament);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <TournamentBreadcrumb
          homeHref={homeHref}
          homeLabel={homeLabel}
          currentLabel={tournament.name}
        />
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      </div>
      <Surface className="overflow-hidden p-0">
        <ProfileBanner as="div" className="h-16 md:h-20" ariaHidden />
        <div className="flex flex-wrap items-center gap-4 p-4 md:p-6">
          <TournamentLogo logoUrl={tournament.logoUrl} name={tournament.name} />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h1 className="text-xl font-extrabold leading-tight text-foreground md:text-2xl">
              {tournament.name}
            </h1>
            <p className="text-sm text-muted">{tournament.organization.name}</p>
            {isActive && (
              <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)] px-3 py-1 text-xs font-semibold text-primary-dark">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-primary-dark"
                  aria-hidden="true"
                />
                {activeLabel}
              </span>
            )}
          </div>
        </div>
        <div className="flex divide-x divide-border border-t border-border">
          <TournamentStat value={tournament.players.length} label={athletesLabel} />
          <TournamentStat value={tournament.teams.length} label={teamsLabel} />
          <TournamentStat value={tournament.phases.length} label={phasesLabel} />
        </div>
      </Surface>
    </div>
  );
}

interface PhaseTabsProps {
  routeParams: PhaseViewParams;
  phases: PhaseEntity[];
}

// Every phase of the tournament is a tab; each tab is a plain link to that
// phase's own page — no client state, the URL is the source of truth for
// which tab is active.
function PhaseTabs({ routeParams, phases }: PhaseTabsProps) {
  if (phases.length < 2) return null;

  const { locale, org, tournament } = routeParams;

  return (
    <nav className="flex flex-wrap gap-2 border-b border-border">
      {[...phases]
        .sort((phaseA, phaseB) => phaseA.order - phaseB.order)
        .map(phase => {
          const isActive = phase.id === routeParams.phaseId;

          return (
            <Link
              key={phase.id}
              href={`/${locale}/${org}/${tournament}/fases/${phase.id}`}
              className={`-mb-px border-b-2 px-3 py-2 text-sm font-semibold ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              {phase.title}
            </Link>
          );
        })}
    </nav>
  );
}

// Same visual language as the roster/player stats tables
// (times/[teamId]/RosterStatsTable.tsx, estatisticas' PlayerStatsTable.tsx) —
// opaque color-mix band, sticky rank+team columns, tabular-nums stat cells.
// No shared table primitive yet (packages/ui Task 16 tech debt calls this
// out across all three), so these tokens are this file's own copy.
const HEADER_BAND =
  'bg-[color-mix(in_srgb,var(--color-primary)_40%,var(--color-surface))]';
const RANK_CELL = 'sticky left-0 z-20 w-12 px-4 md:px-6';
const TEAM_CELL =
  'sticky left-12 z-20 whitespace-nowrap pr-6 shadow-[8px_0_6px_-6px_var(--shadow-elevated)] md:left-16';
const STAT_CELL = 'whitespace-nowrap px-3 text-right last:pr-6 md:px-4';
const ROW_HEIGHT = 'h-[43px] md:h-[49px]';
const BAND_LABEL = 'text-left text-xs font-bold uppercase tracking-[0.5px]';

// A row can name a team the roster no longer carries, or none at all while a
// group is still being seeded — only a real team has a page to link to.
function TeamName({
  team,
  placeholder,
  undecidedLabel,
  teamHref
}: {
  team: TeamEntity;
  placeholder: string;
  undecidedLabel: string;
  teamHref: (teamId: string) => string;
}) {
  const label = teamDisplayName(team, placeholder, undecidedLabel);

  if (!team.id) return <span className="truncate">{label}</span>;

  return (
    <Link href={teamHref(team.id)} className="truncate hover:text-primary-dark">
      {label}
    </Link>
  );
}

interface StandingsGroupProps {
  elimination: EliminationEntity;
  stats: EliminationStatEntity[];
  teams: Record<string, TeamEntity>;
  undecidedLabel: string;
  teamLabel: string;
  teamHref: (teamId: string) => string;
}

// A phase's ranking criteria include internal tie-breakers (head-to-head
// record) alongside the columns organizers actually publish — only the
// "overall" ones are meant to be seen (apps/cms/src/Phases/selectors.ts
// visibleEliminationStats).
const visibleEliminationStats = (
  stats: EliminationStatEntity[]
): EliminationStatEntity[] =>
  stats.filter(stat => stat.rankingCriteria === 'overall');

function StandingsGroup({
  elimination,
  stats,
  teams,
  undecidedLabel,
  teamLabel,
  teamHref
}: StandingsGroupProps) {
  const visibleStats = visibleEliminationStats(stats);

  return (
    <Surface className="overflow-hidden">
      {elimination.title && (
        <h2 className="border-b border-border px-4 py-2 text-sm font-semibold uppercase tracking-wide text-muted">
          {elimination.title}
        </h2>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className={`${HEADER_BAND} ${ROW_HEIGHT} text-foreground`}>
              <th scope="col" className={`${RANK_CELL} ${HEADER_BAND} ${BAND_LABEL}`}>
                #
              </th>
              <th scope="col" className={`${TEAM_CELL} ${HEADER_BAND} ${BAND_LABEL}`}>
                {teamLabel}
              </th>
              {visibleStats.map(stat => (
                <th key={stat.id} scope="col" className={`${STAT_CELL} ${BAND_LABEL}`}>
                  {stat.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {elimination.teamStats.map((teamStat, index) => {
              const team = teamOrEmpty(teams, teamStat.teamId);

              return (
                <tr key={teamStat.id} className={`${ROW_HEIGHT} border-b border-border/60`}>
                  <td className={`${RANK_CELL} bg-surface text-xs tabular-nums text-muted`}>
                    {index + 1}
                  </td>
                  <td className={`${TEAM_CELL} bg-surface text-sm font-semibold text-foreground`}>
                    <span className="flex items-center gap-2">
                      {team.logoUrl && (
                        <RemoteImage
                          src={team.logoUrl}
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5 shrink-0 rounded-full object-cover"
                        />
                      )}
                      <TeamName
                        team={team}
                        placeholder={teamStat.placeholder}
                        undecidedLabel={undecidedLabel}
                        teamHref={teamHref}
                      />
                    </span>
                  </td>
                  {visibleStats.map(stat => (
                    <td key={stat.id} className={`${STAT_CELL} notranslate text-xs tabular-nums`}>
                      {teamStat.stats[stat.id] ?? ''}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Surface>
  );
}

interface EliminationStandingsProps {
  eliminations: EliminationEntity[];
  stats: EliminationStatEntity[];
  teams: Record<string, TeamEntity>;
  undecidedLabel: string;
  teamLabel: string;
  teamHref: (teamId: string) => string;
}

function EliminationStandings({
  eliminations,
  stats,
  teams,
  undecidedLabel,
  teamLabel,
  teamHref
}: EliminationStandingsProps) {
  return (
    <div className="flex flex-col gap-6">
      {[...eliminations]
        .sort((eliminationA, eliminationB) => eliminationA.order - eliminationB.order)
        .map(elimination => (
          <StandingsGroup
            key={elimination.id}
            elimination={elimination}
            stats={stats}
            teams={teams}
            undecidedLabel={undecidedLabel}
            teamLabel={teamLabel}
            teamHref={teamHref}
          />
        ))}
    </div>
  );
}

interface DrawMatchCardProps {
  match: DrawEntity['matches'][number];
  teams: Record<string, TeamEntity>;
  undecidedLabel: string;
  teamHref: (teamId: string) => string;
}

const scoreOf = (rawScore: string): number => Number(rawScore) || 0;

const teamOrEmpty = (
  teams: Record<string, TeamEntity>,
  teamId: string
): TeamEntity => teams[teamId] || EMPTY_TEAM;

function DrawMatchName({ name }: { name: string }) {
  if (!name) return null;

  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
      {name}
    </p>
  );
}

function DrawMatchInfo({ info }: { info: string }) {
  if (!info) return null;

  return <p className="mt-2 text-center text-xs text-muted">{info}</p>;
}

// A bracket slot can still be waiting on another match, in which case it names
// a placeholder and has no page to open.
function DrawMatchSide({
  team,
  placeholder,
  undecidedLabel,
  emphasis,
  align,
  teamHref
}: {
  team: TeamEntity;
  placeholder: string;
  undecidedLabel: string;
  emphasis: 'winner' | 'loser';
  align: 'left' | 'right';
  teamHref: (teamId: string) => string;
}) {
  const row = (
    <GameTeamRow
      logoUrl={team.logoUrl}
      name={teamDisplayName(team, placeholder, undecidedLabel)}
      emphasis={emphasis}
      align={align}
      crestSize={20}
    />
  );

  if (!team.id) return row;

  return (
    <Link href={teamHref(team.id)} className="hover:opacity-80">
      {row}
    </Link>
  );
}

function DrawMatchCard({
  match,
  teams,
  undecidedLabel,
  teamHref
}: DrawMatchCardProps) {
  const firstScore = scoreOf(match.firstTeamScore);
  const secondScore = scoreOf(match.secondTeamScore);
  const firstTeam = teamOrEmpty(teams, match.firstTeamId);
  const secondTeam = teamOrEmpty(teams, match.secondTeamId);

  return (
    <Surface className="p-4">
      <DrawMatchName name={match.name} />
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm">
        <DrawMatchSide
          team={firstTeam}
          placeholder={match.firstTeamPlaceholder}
          undecidedLabel={undecidedLabel}
          emphasis={firstScore > secondScore ? 'winner' : 'loser'}
          align="left"
          teamHref={teamHref}
        />
        <span className="tabular-nums font-semibold text-foreground">
          {firstScore} x {secondScore}
        </span>
        <DrawMatchSide
          team={secondTeam}
          placeholder={match.secondTeamPlaceholder}
          undecidedLabel={undecidedLabel}
          emphasis={secondScore > firstScore ? 'winner' : 'loser'}
          align="right"
          teamHref={teamHref}
        />
      </div>
      <DrawMatchInfo info={match.info} />
    </Surface>
  );
}

interface DrawBracketProps {
  draws: DrawEntity[];
  teams: Record<string, TeamEntity>;
  undecidedLabel: string;
  teamHref: (teamId: string) => string;
}

function DrawBracket({
  draws,
  teams,
  undecidedLabel,
  teamHref
}: DrawBracketProps) {
  return (
    <div className="flex flex-col gap-6">
      {[...draws]
        .sort((drawA, drawB) => drawA.order - drawB.order)
        .map(draw => (
          <div key={draw.id} className="flex flex-col gap-2">
            {draw.title && (
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                {draw.title}
              </h2>
            )}
            <div className="flex flex-col gap-3">
              {draw.matches.map(match => (
                <DrawMatchCard
                  key={match.id}
                  match={match}
                  teams={teams}
                  undecidedLabel={undecidedLabel}
                  teamHref={teamHref}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

// Whether a phase has a main content block to show above its games, and
// which one — kept as pure lookups so no component branches on both the
// type and the data in the same expression.
const hasStandings = (phase: PhaseEntity): boolean =>
  phase.type === 'elimination' && phase.eliminations.length > 0;

const hasBracket = (phase: PhaseEntity): boolean =>
  phase.type === 'draw' && phase.draws.length > 0;

interface PhaseMainContentProps {
  phase: PhaseEntity;
  teams: Record<string, TeamEntity>;
  undecidedLabel: string;
  teamLabel: string;
  teamHref: (teamId: string) => string;
}

function PhaseMainContent({
  phase,
  teams,
  undecidedLabel,
  teamLabel,
  teamHref
}: PhaseMainContentProps) {
  if (hasStandings(phase)) {
    return (
      <EliminationStandings
        eliminations={phase.eliminations}
        stats={phase.eliminationStats}
        teams={teams}
        undecidedLabel={undecidedLabel}
        teamLabel={teamLabel}
        teamHref={teamHref}
      />
    );
  }

  if (hasBracket(phase)) {
    return (
      <DrawBracket
        draws={phase.draws}
        teams={teams}
        undecidedLabel={undecidedLabel}
        teamHref={teamHref}
      />
    );
  }

  return null;
}

interface PhaseGamesSectionProps {
  days: GameDay[];
  locale: string;
  undecidedLabel: string;
  noGamesLabel: string;
  gamesTitle: string;
  previousDayLabel: string;
  nextDayLabel: string;
  winnerLabel: string;
  gameHrefBase: string;
}

function PhaseGamesSection({
  days,
  locale,
  undecidedLabel,
  noGamesLabel,
  gamesTitle,
  previousDayLabel,
  nextDayLabel,
  winnerLabel,
  gameHrefBase
}: PhaseGamesSectionProps) {
  if (days.length === 0) {
    return (
      <Surface className="p-6">
        <p className="text-sm text-muted">{noGamesLabel}</p>
      </Surface>
    );
  }

  return (
    <GamesPager
      days={days}
      initialIndex={closestDayIndex(days, new Date())}
      locale={locale}
      title={gamesTitle}
      previousDayLabel={previousDayLabel}
      nextDayLabel={nextDayLabel}
      undecidedLabel={undecidedLabel}
      winnerLabel={winnerLabel}
      gameHrefBase={gameHrefBase}
          />
  );
}

interface PhaseBodyProps {
  phase: PhaseEntity;
  tournament: TournamentWithTeamsEntity | null;
  games: GameDay[];
  locale: string;
  undecidedLabel: string;
  teamLabel: string;
  noGamesLabel: string;
  gamesTitle: string;
  previousDayLabel: string;
  nextDayLabel: string;
  winnerLabel: string;
  teamHref: (teamId: string) => string;
  gameHrefBase: string;
}

// The main content + games layout, same shape as the CMS's PhaseHome: main
// content on the wide side, the phase's games as a sidebar next to it —
// stacked on mobile. Isolated from the tournament header/tabs above it so
// PhasePage itself only has to decide whether the phase exists at all.
function PhaseBody({
  phase,
  tournament,
  games,
  locale,
  undecidedLabel,
  teamLabel,
  noGamesLabel,
  gamesTitle,
  previousDayLabel,
  nextDayLabel,
  winnerLabel,
  teamHref,
  gameHrefBase
}: PhaseBodyProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="flex flex-col gap-6 lg:flex-[2]">
        <PhaseMainContent
          phase={phase}
          teams={teamById(tournament)}
          undecidedLabel={undecidedLabel}
          teamLabel={teamLabel}
          teamHref={teamHref}
        />
      </div>
      <aside className="lg:flex-1">
        <PhaseGamesSection
          days={games}
          locale={locale}
          undecidedLabel={undecidedLabel}
          noGamesLabel={noGamesLabel}
          gamesTitle={gamesTitle}
          previousDayLabel={previousDayLabel}
          nextDayLabel={nextDayLabel}
          winnerLabel={winnerLabel}
          gameHrefBase={gameHrefBase}
        />
      </aside>
    </div>
  );
}

// The CMS puts these behind a dropdown in its tournament header and hides it
// when there is nothing to show (Tournaments/Common/TopLevel.tsx), rather than
// linking to an empty table.
function StatisticsLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-primary-dark hover:bg-primary/10"
    >
      {label}
    </Link>
  );
}

interface TournamentTopSectionProps {
  routeParams: PhaseViewParams;
  tournament: TournamentWithTeamsEntity;
  homeLabel: string;
  activeLabel: string;
  athletesLabel: string;
  teamsLabel: string;
  phasesLabel: string;
  advancedStatsLabel: string;
  qrLabels: { open: string; close: string; scan: string };
}

// The tournament identity (breadcrumb + banner + counts) and the tabs across
// its phases both depend only on the tournament, not the current phase's
// content — grouped here so they render together above the phase title.
function TournamentTopSection({
  routeParams,
  tournament,
  homeLabel,
  activeLabel,
  athletesLabel,
  teamsLabel,
  phasesLabel,
  advancedStatsLabel,
  qrLabels
}: TournamentTopSectionProps) {
  return (
    <>
      <TournamentHeader
        tournament={tournament}
        homeHref={`/${routeParams.locale}`}
        homeLabel={homeLabel}
        activeLabel={activeLabel}
        athletesLabel={athletesLabel}
        teamsLabel={teamsLabel}
        phasesLabel={phasesLabel}
        actions={
          <>
            {tournament.hasAggregatedPlayerStats && (
              <StatisticsLink
                href={`/${routeParams.locale}/${routeParams.org}/${routeParams.tournament}/estatisticas`}
                label={advancedStatsLabel}
              />
            )}
            <TournamentQrCode
              path={`/${routeParams.org}/${routeParams.tournament}`}
              openLabel={qrLabels.open}
              closeLabel={qrLabels.close}
              caption={tournament.name}
              scanLabel={qrLabels.scan}
            />
          </>
        }
      />
      <PhaseTabs routeParams={routeParams} phases={tournament.phases} />
    </>
  );
}

export async function PhaseView({
  routeParams
}: {
  routeParams: PhaseViewParams;
}) {
  const { locale, org, tournament: tournamentSlug, phaseId } = routeParams;
  setRequestLocale(locale);

  const [phase, tournament, games, tPhase, tGame] = await Promise.all([
    loadPhase(phaseId),
    loadTournament(org, tournamentSlug),
    loadGames(phaseId),
    getTranslations('phase'),
    getTranslations('game')
  ]);

  if (!phase) notFound();

  return (
    <main
      data-testid="phase-page"
      className="bg-background px-4 py-6 md:px-6 md:py-8"
    >
      <div className="mx-auto flex w-full max-w-[var(--content-max-width)] flex-col gap-6">
        {tournament && (
          <TournamentTopSection
            routeParams={routeParams}
            tournament={tournament}
            homeLabel={tPhase('breadcrumbHome')}
            activeLabel={tPhase('active')}
            athletesLabel={tPhase('athletesCount')}
            teamsLabel={tPhase('teamsCount')}
            phasesLabel={tPhase('phasesCount')}
            advancedStatsLabel={tPhase('advancedStats')}
            qrLabels={{
              open: tPhase('shareQrCode'),
              close: tPhase('closeQrCode'),
              scan: tPhase('scanQrCode')
            }}
          />
        )}
        <h2 className="text-2xl font-extrabold leading-tight text-foreground md:text-3xl">
          {phase.title}
        </h2>
        <PhaseBody
          phase={phase}
          tournament={tournament}
          games={gamesByDate(games, locale)}
          locale={locale}
          undecidedLabel={tGame('undecidedTeam')}
          teamLabel={tPhase('team')}
          noGamesLabel={tPhase('noGames')}
          gamesTitle={tPhase('gamesTitle')}
          previousDayLabel={tPhase('previousDay')}
          nextDayLabel={tPhase('nextDay')}
          winnerLabel={tGame('winner')}
          teamHref={teamId =>
            `/${locale}/${org}/${tournamentSlug}/times/${teamId}`
          }
          gameHrefBase={`/${locale}/${org}/${tournamentSlug}/jogos/`}
        />
      </div>
    </main>
  );
}
