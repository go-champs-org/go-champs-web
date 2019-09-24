import { TournamentStatEntity, TournamentStatState } from './state';

export const allPhaseStats = (
  state: TournamentStatState
): TournamentStatEntity[] =>
  Object.keys(state.tournamentStats).map(
    (key: string) => state.tournamentStats[key]
  );
