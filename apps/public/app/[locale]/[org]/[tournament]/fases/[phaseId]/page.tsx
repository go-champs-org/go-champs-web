import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/src/seo/metadata';
import {
  loadPhase,
  loadTournament,
  PhaseView,
  type PhaseViewParams
} from '../../_phase/PhaseView';

// Games move often, so reuse the rendered HTML only briefly.
export const revalidate = 60;

// Unbounded list: nothing prerendered, but declaring params opts into ISR.
export async function generateStaticParams() {
  return [];
}

const phasePagePath = ({
  org,
  tournament,
  phaseId
}: PhaseViewParams): string => `/${org}/${tournament}/fases/${phaseId}`;

export async function generateMetadata({
  params
}: {
  params: Promise<PhaseViewParams>;
}): Promise<Metadata> {
  const routeParams = await params;
  const { locale, org, tournament: tournamentSlug, phaseId } = routeParams;
  const [phase, tournament, t, tPhase] = await Promise.all([
    loadPhase(phaseId),
    loadTournament(org, tournamentSlug),
    getTranslations({ locale, namespace: 'metadata' }),
    getTranslations({ locale, namespace: 'phase' })
  ]);

  const values = {
    phase: phase ? phase.title : tPhase('unknownPhase'),
    tournament: tournament ? tournament.name : tPhase('unknownTournament')
  };

  return buildPageMetadata({
    locale,
    path: phasePagePath(routeParams),
    title: t('phaseTitle', values),
    description: t('phaseDescription', values),
    noIndex: !phase
  });
}

export default async function PhasePage({
  params
}: {
  params: Promise<PhaseViewParams>;
}) {
  return <PhaseView routeParams={await params} />;
}
