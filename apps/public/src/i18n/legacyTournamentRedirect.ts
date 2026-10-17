const LEGACY_SEGMENTS: Record<string, string> = {
  jogos: 'game',
  jogadores: 'athlete',
  times: 'team',
  fases: 'stage',
  estatisticas: 'stats'
};

const LEGACY_TOURNAMENT_PATH = new RegExp(
  `^(/[^/]+/[^/]+)/(${Object.keys(LEGACY_SEGMENTS).join('|')})(/.*)?$`
);

const renameSummary = (rest: string): string =>
  rest.replace(/^\/resumo(?=\/|$)/, '/summary');

export const legacyTournamentPath = (pathname: string): string | null => {
  const match = pathname.match(LEGACY_TOURNAMENT_PATH);
  if (!match) return null;

  const [, tournamentPath, segment, rest = ''] = match;
  const renamedRest = segment === 'estatisticas' ? renameSummary(rest) : rest;

  return `${tournamentPath}/${LEGACY_SEGMENTS[segment]}${renamedRest}`;
};
