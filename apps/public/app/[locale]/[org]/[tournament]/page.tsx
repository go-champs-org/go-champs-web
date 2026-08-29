import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/src/seo/metadata';
import {
  loadPhase,
  loadTournament,
  PhaseView,
  resolveDefaultPhaseId
} from './_phase/PhaseView';

// Matches fases/[phaseId]: this route renders the same view, so it reuses the
// same window.
export const revalidate = 60;

// The tournament list is unbounded, so nothing is prerendered at build time —
// declaring the params is what puts this route on the ISR path.
export async function generateStaticParams() {
  return [];
}

interface TournamentPageParams {
  locale: string;
  org: string;
  tournament: string;
}

const tournamentPagePath = ({
  org,
  tournament
}: TournamentPageParams): string => `/${org}/${tournament}`;

export async function generateMetadata({
  params
}: {
  params: Promise<TournamentPageParams>;
}): Promise<Metadata> {
  const routeParams = await params;
  const { locale, org, tournament: tournamentSlug } = routeParams;
  const [tournament, t, tPhase] = await Promise.all([
    loadTournament(org, tournamentSlug),
    getTranslations({ locale, namespace: 'metadata' }),
    getTranslations({ locale, namespace: 'phase' })
  ]);

  const phaseId = resolveDefaultPhaseId(tournament);
  const phase = phaseId ? await loadPhase(phaseId) : null;

  const values = {
    phase: phase ? phase.title : tPhase('unknownPhase'),
    tournament: tournament ? tournament.name : tPhase('unknownTournament')
  };

  return buildPageMetadata({
    locale,
    // The canonical stays on the bare URL: this is the tournament's own
    // address, not a duplicate of the phase page it happens to render.
    path: tournamentPagePath(routeParams),
    title: t('phaseTitle', values),
    description: t('phaseDescription', values),
    noIndex: !tournament
  });
}

/**
 * The tournament's own URL, which shows its default phase — the same thing a
 * bare /:org/:tournament does in the CMS, and the reason the URL does not
 * change to the phase's own address.
 */
export default async function TournamentPage({
  params
}: {
  params: Promise<TournamentPageParams>;
}) {
  const routeParams = await params;
  const tournament = await loadTournament(routeParams.org, routeParams.tournament);
  const phaseId = resolveDefaultPhaseId(tournament);

  // A tournament with no phases has nothing to show here. The CMS renders an
  // empty shell in that case; 404 is the honest answer for a public page.
  if (!phaseId) notFound();

  return <PhaseView routeParams={{ ...routeParams, phaseId }} />;
}
