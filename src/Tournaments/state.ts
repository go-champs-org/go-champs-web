import {
  DEFAULT_ORGANIZATION,
  OrganizationEntity
} from '../Organizations/state';
import { PhaseEntity } from '../Phases/state';
import { TeamEntity } from '../Teams/state';

export interface TournamentEntity {
  id: string;
  name: string;
  slug: string;
  organization: OrganizationEntity;
  phases: PhaseEntity[];
  teams: TeamEntity[];
  teamStatsStructure: { [key: string]: string };
}

export interface TournamentState {
  isLoadingDeleteTournament: boolean;
  isLoadingPatchTournament: boolean;
  isLoadingPostTournament: boolean;
  isLoadingRequestTournament: boolean;
  isLoadingRequestTournaments: boolean;
  tournaments: { [key: string]: TournamentEntity };
}

export const initialState: TournamentState = {
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
