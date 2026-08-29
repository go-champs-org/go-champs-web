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

// Same view as fases/[phaseId], so the same window.
export const revalidate = 60;

// Unbounded list: nothing prerendered, but declaring params opts into ISR.
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
    // The tournament's own address, not a duplicate of the phase it renders.
    path: tournamentPagePath(routeParams),
    title: t('phaseTitle', values),
    description: t('phaseDescription', values),
    noIndex: !tournament
  });
}

/** Shows the default phase without changing the URL, as the CMS does. */
export default async function TournamentPage({
  params
}: {
  params: Promise<TournamentPageParams>;
}) {
  const routeParams = await params;
  const tournament = await loadTournament(routeParams.org, routeParams.tournament);
  const phaseId = resolveDefaultPhaseId(tournament);

  // The CMS renders an empty shell here; 404 is the honest public answer.
  if (!phaseId) notFound();

  return <PhaseView routeParams={{ ...routeParams, phaseId }} />;
}
