import {
  DEFAULT_ORGANIZATION,
  OrganizationEntity
} from '../Organizations/state';
import { TournamentPhaseEntity } from '../Phases/state';
import { TournamentTeamEntity } from '../Teams/state';

export interface TournamentEntity {
  id: string;
  name: string;
  slug: string;
  organization: OrganizationEntity;
  phases: TournamentPhaseEntity[];
  teams: TournamentTeamEntity[];
  teamStatsStructure: { [key: string]: string };
}

export interface PhaseEliminationState {
  isLoadingDeleteTournament: boolean;
  isLoadingPatchTournament: boolean;
  isLoadingPostTournament: boolean;
  isLoadingRequestTournament: boolean;
  isLoadingRequestTournaments: boolean;
  tournaments: { [key: string]: TournamentEntity };
}

export const initialState: PhaseEliminationState = {
  isLoadingDeleteTournament: false,
  isLoadingPatchTournament: false,
  isLoadingPostTournament: false,
  isLoadingRequestTournament: false,
  isLoadingRequestTournaments: false,
  tournaments: {}
};

export const DEFAULT_TOURNAMENT: TournamentEntity = {
  id: '',
  name: '',
  slug: '',
  organization: DEFAULT_ORGANIZATION,
  phases: [],
  teamStatsStructure: {},
  teams: []
};
