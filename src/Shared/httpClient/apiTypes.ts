import { PhaseTypes } from '../../Phases/state';

interface ApiGame {
  id: string;
  away_score: number;
  datetime?: string;
  home_score: number;
  info?: string;
  location: string;
}

export interface ApiGameWithDepedencies extends ApiGame {
  away_team?: ApiTeam;
  home_team?: ApiTeam;
}

export interface ApiGameWithDepedenciesIds extends ApiGame {
  away_team_id: string;
  home_team_id: string;
}

export interface ApiGamePostWithPhaseIdRequest
  extends ApiGameWithDepedenciesIds {
  phase_id: string;
}

export interface ApiGamePostRequest {
  game: ApiGamePostWithPhaseIdRequest;
}

export interface ApiGamePatchRequest {
  game: ApiGameWithDepedenciesIds;
}

export interface ApiGameResponse {
  data: ApiGameWithDepedencies;
}

export interface ApiGamesResponse {
  data: ApiGameWithDepedencies[];
}

export interface ApiPatchAndPostDrawMatch {
  first_team_id?: string;
  first_team_parent_id?: string;
  first_team_placeholder?: string;
  first_team_score?: string;
  info?: string;
  name?: string;
  second_team_id?: string;
  second_team_parent_id?: string;
  second_team_placeholder?: string;
  second_team_score?: string;
}

export interface ApiDrawMatch extends ApiPatchAndPostDrawMatch {
  id: string;
}

export interface ApiDraw {
  id: string;
  order?: number;
  title?: string;
  matches: ApiDrawMatch[];
}

export interface ApiPatchAndPostDraw {
  id: string;
  order?: number;
  title?: string;
  matches: ApiPatchAndPostDrawMatch[];
}

export interface ApiDrawWithPhaseId extends ApiPatchAndPostDraw {
  phase_id: string;
}

export interface ApiDrawBatchPatchRequest {
  draws: ApiPatchAndPostDraw[];
}

export interface ApiDrawPatchRequest {
  draw: ApiPatchAndPostDraw;
}

export interface ApiDrawPostRequest {
  draw: ApiDrawWithPhaseId;
}

export interface ApiDrawResponse {
  data: ApiDraw;
}

export interface ApiDrawsResponse {
  data: ApiDraw[];
}

export interface ApiDrawBatchResponse {
  data: {
    [id: string]: ApiDraw;
  };
}

export interface ApiEliminationTeamStatPatchAndPost {
  placeholder?: string;
  team_id?: string;
  stats: { [stat_id: string]: string };
}

export interface ApiEliminationTeamStatResponse
  extends ApiEliminationTeamStatPatchAndPost {
  id: string;
}

export interface ApiElimination {
  id: string;
  order: number;
  info?: string;
  title?: string;
  team_stats: ApiEliminationTeamStatResponse[];
}

export interface ApiEliminationPost {
  id: string;
  info?: string;
  title?: string;
  team_stats: ApiEliminationTeamStatPatchAndPost[];
}

export interface ApiEliminationPatch {
  id: string;
  order: number;
  info?: string;
  title?: string;
  team_stats: ApiEliminationTeamStatPatchAndPost[];
}

export interface ApiEliminationPostWithPhaseId extends ApiEliminationPost {
  phase_id: string;
}

export interface ApiEliminationBatchPatchRequest {
  eliminations: ApiEliminationPatch[];
}

export interface ApiEliminationPatchRequest {
  elimination: ApiEliminationPatch;
}

export interface ApiEliminationPostRequest {
  elimination: ApiEliminationPostWithPhaseId;
}

export interface ApiEliminationResponse {
  data: ApiElimination;
}

export interface ApiEliminationsResponse {
  data: ApiElimination[];
}

export interface ApiEliminationBatchResponse {
  data: {
    [id: string]: ApiElimination;
  };
}

export interface ApiOrganization {
  id: string;
  name: string;
  slug: string;
}

export interface ApiPhaseRequest {
  id: string;
  title: string;
  type: PhaseTypes;
  order: number;
  is_in_progress: boolean;
  draws?: ApiDraw[];
  eliminations?: ApiElimination[];
  elimination_stats?: ApiPatchAndPostStat[];
}

export interface ApiPhase {
  id: string;
  title: string;
  type: PhaseTypes;
  order: number;
  is_in_progress: boolean;
  draws?: ApiDraw[];
  eliminations?: ApiElimination[];
  elimination_stats?: ApiStat[];
}

export interface ApiPhaseWithDependeciesIds extends ApiPhaseRequest {
  tournament_id: string;
}

export interface ApiPhasePostRequest {
  phase: ApiPhaseWithDependeciesIds;
}

export interface ApiPhasePatchRequest {
  phase: ApiPhaseRequest;
}

export interface ApiPhaseBatchPatchRequest {
  phases: ApiPhaseRequest[];
}

export interface ApiPhaseResponse {
  data: ApiPhase;
}

export interface ApiPhasesResponse {
  data: ApiPhaseRequest[];
}

export interface ApiPhaseBatchResponse {
  data: {
    [id: string]: ApiPhase;
  };
}

export interface ApiOrganization {
  id: string;
  name: string;
  slug: string;
}

export interface ApiOrganizationRequest {
  organization: ApiOrganization;
}

export interface ApiOrganizationResponse {
  data: ApiOrganization;
}

export interface ApiOrganizationsResponse {
  data: ApiOrganization[];
}

export interface ApiPatchAndPostStat {
  id?: string;
  title: string;
}

export interface ApiStat {
  id: string;
  title: string;
}

export interface ApiTeam {
  id: string;
  name: string;
}

export interface ApiTeamWithDependencies extends ApiTeam {
  tournament_id: string;
}

export interface ApiTeamPatchRequest {
  team: ApiTeam;
}

export interface ApiTeamPostRequest {
  team: ApiTeamWithDependencies;
}

export interface ApiTeamResponse {
  data: ApiTeam;
}

export interface ApiTeamsResponse {
  data: ApiTeam[];
}

export interface ApiTournament {
  id: string;
  name: string;
  slug: string;
  facebook?: string;
  instagram?: string;
  site_url?: string;
  twitter?: string;
}

export interface ApiTournamentWithDependecies extends ApiTournament {
  organization: ApiOrganization;
  phases: ApiPhase[];
  teams: ApiTeam[];
}

export interface ApiTournamentWithDependeciesIds extends ApiTournament {
  organization_id: string;
}

export interface ApiTournamentRequest {
  tournament: ApiTournamentWithDependeciesIds;
}

export interface ApiTournamentResponse {
  data: ApiTournamentWithDependecies;
}

export interface ApiTournamentsResponse {
  data: ApiTournament[];
}

export interface ApiSearchTournamentsResponse {
  data: ApiTournamentWithDependecies[];
}

export interface ApiSignInRequest {
  password: string;
  username: string;
}

export interface ApiAccountRecoveryRequest {
  email: string;
  recaptcha: string;
}

export interface ApiAccountResetRequest {
  user: {
    password: string;
    recaptcha: string;
    recovery_token: string;
    username: string;
  };
}

export interface ApiSignUpRequest {
  user: {
    email: string;
    password: string;
    recaptcha: string;
    username: string;
  };
}

export interface ApiUserResponse {
  data: {
    email: string;
    token: string;
    username: string;
  };
}
