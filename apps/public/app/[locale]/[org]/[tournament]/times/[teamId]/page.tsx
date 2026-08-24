import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  getTournamentBySlug,
  type TournamentWithTeamsEntity
} from '@gochamps/api-client';
import type { PlayerEntity } from '@gochamps/api-client';
import type { TeamEntity } from '@gochamps/domain-types';
import { Surface } from '@gochamps/ui';
import { isNotFoundError } from '@/src/api/isNotFoundError';
import { CMS_URL } from '@/src/config/cms';
import { buildPageMetadata } from '@/src/seo/metadata';
import { teamRoster } from '@/src/teams/roster';

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

interface TeamView {
  tournament: TournamentWithTeamsEntity;
  team: TeamEntity;
  roster: PlayerEntity[];
}

// A team is only ever found inside a tournament, so a missing tournament and a
// missing team are the same 404. Resolving both here is what keeps the page
// component free of fallbacks that could never render.
const loadTeamView = async (
  org: string,
  tournamentSlug: string,
  teamId: string
): Promise<TeamView> => {
  const tournament = await loadTournament(org, tournamentSlug);
  const team = findTeam(tournament, teamId);

  if (!tournament || !team) notFound();

  return {
    tournament,
    team,
    roster: teamRoster(tournament.players, team.id)
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

// The API stores the raw coach type; the CMS labels the same two values
// (apps/cms/src/Shared/translations). An unknown type renders with no label
// rather than leaking the raw slug.
const COACH_TYPE_KEYS: Record<string, string> = {
  head_coach: 'headCoach',
  assistant_coach: 'assistantCoach'
};

const coachTypeLabeller =
  (t: (key: string) => string) =>
  (type: string): string => {
    const key = COACH_TYPE_KEYS[type];
    return key ? t(key) : '';
  };

interface TeamBannerProps {
  team: TeamEntity;
}

function TeamBanner({ team }: TeamBannerProps) {
  return (
    <Surface
      as="header"
      className="flex flex-col items-center gap-3 p-6 text-center md:flex-row md:gap-6 md:text-left"
    >
      {team.logoUrl && (
        // Team logos live on arbitrary user-uploaded hosts: next/image would
        // need each one allow-listed in next.config.js.
        <img
          src={team.logoUrl}
          alt=""
          width={96}
          height={96}
          decoding="async"
          className="h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
        />
      )}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          {team.name}
        </h1>
        {team.triCode && (
          <p className="text-sm font-semibold uppercase tracking-wide text-muted">
            {team.triCode}
          </p>
        )}
      </div>
    </Surface>
  );
}

interface CoachingStaffProps {
  team: TeamEntity;
  title: string;
  coachTypeLabel: (type: string) => string;
}

function CoachingStaff({ team, title, coachTypeLabel }: CoachingStaffProps) {
  return (
    <Surface as="section" className="p-6">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {team.coaches.map(coach => (
          <li key={coach.id} className="flex flex-wrap items-baseline gap-2">
            <span className="font-medium text-foreground">{coach.name}</span>
            <span className="text-sm text-muted">
              {coachTypeLabel(coach.type)}
            </span>
          </li>
        ))}
      </ul>
    </Surface>
  );
}

interface RosterProps {
  players: PlayerEntity[];
  title: string;
  numberLabel: string;
  nameLabel: string;
  shirtNameLabel: string;
}

function Roster({
  players,
  title,
  numberLabel,
  nameLabel,
  shirtNameLabel
}: RosterProps) {
  return (
    <Surface as="section" className="p-6" data-testid="roster">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {/* Narrow screens scroll the table instead of the page. */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted">
              <th scope="col" className="w-12 py-2 pr-3 font-medium">
                {numberLabel}
              </th>
              <th scope="col" className="py-2 pr-3 font-medium">
                {nameLabel}
              </th>
              <th scope="col" className="py-2 font-medium">
                {shirtNameLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map(player => (
              <tr key={player.id} className="border-b border-border last:border-0">
                <td className="py-2 pr-3 tabular-nums text-muted">
                  {player.shirtNumber}
                </td>
                <td
                  className="py-2 pr-3 font-medium text-foreground"
                  data-testid="roster-player-name"
                >
                  {player.name}
                </td>
                <td className="py-2 text-muted">{player.shirtName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Surface>
  );
}

export default async function TeamPage({
  params
}: {
  params: Promise<TeamPageParams>;
}) {
  const routeParams = await params;
  const { locale, org, tournament: tournamentSlug, teamId } = routeParams;
  setRequestLocale(locale);

  const [{ tournament, team, roster }, t] = await Promise.all([
    loadTeamView(org, tournamentSlug, teamId),
    getTranslations('team')
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

        <TeamBanner team={team} />

        {roster.length > 0 && (
          <Roster
            players={roster}
            title={t('roster')}
            numberLabel={t('shirtNumber')}
            nameLabel={t('playerName')}
            shirtNameLabel={t('shirtName')}
          />
        )}

        {team.coaches.length > 0 && (
          <CoachingStaff
            team={team}
            title={t('coachingStaff')}
            coachTypeLabel={coachTypeLabeller(t)}
          />
        )}
      </div>
    </main>
  );
}
