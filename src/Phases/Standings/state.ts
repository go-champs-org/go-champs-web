export interface PhaseStandingsTeamStatEntity {
  id: string;
  teamId: string;
  stats: { [statId: string]: string };
}

export interface PhaseStandingsEntity {
  id: string;
  title: string;
  teamStats: PhaseStandingsTeamStatEntity[];
}

export interface PhaseStandingsState {
  isLoadingDeletePhaseStandings: boolean;
  isLoadingPatchPhaseStandings: boolean;
  isLoadingPostPhaseStandings: boolean;
  isLoadingRequestTournament: boolean;
  standings: { [key: string]: PhaseStandingsEntity };
}

export const initialState: PhaseStandingsState = {
  isLoadingDeletePhaseStandings: false,
  isLoadingPatchPhaseStandings: false,
  isLoadingPostPhaseStandings: false,
  isLoadingRequestTournament: false,
  standings: {}
};
