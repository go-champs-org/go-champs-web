import { PhaseStandingsEntity, PhaseStandingsState } from './state';

export const allPhaseStandings = (
  state: PhaseStandingsState
): PhaseStandingsEntity[] =>
  Object.keys(state.standings).map((key: string) => state.standings[key]);
