import { PhaseTypes } from '../../Phases/state';

export type ApiGameAssetType =
  | 'fiba-scoresheet'
  | 'fiba-boxscore'
  | 'folder-images';
export type ApiGameLiveState = 'not_started' | 'in_progress' | 'ended';
export type ApiGameResultType =
  | 'automatic'
  | 'manual'
  | 'home_team_walkover'
  | 'away_team_walkover';

export interface ApiGameAsset {
  id?: string;
  type: ApiGameAssetType;
  url: string;
}

export interface ApiGameOfficial {
  id?: string;
  official_id: string;
  role: string;
}

interface ApiGame {
  id: string;
  assets?: ApiGameAsset[];
  away_placeholder?: string;
  away_score: number;
  datetime?: string;
  home_placeholder?: string;
  home_score: number;
  is_finished: boolean;
  info?: string;
  location: string;
  live_state: ApiGameLiveState;
  live_started_at?: string;
  live_ended_at?: string;
  officials?: ApiGameOfficial[];
  result_type: ApiGameResultType;
  youtube_code?: string;
}

export interface ApiGameWithDepedencies extends ApiGame {
  away_team?: ApiTeam;
  home_team?: ApiTeam;
  phase_id: string;
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

export interface ApiGameMigrateToNewPhaseRequest {
  phase_id: string;
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
  stats?: { [stat_id: string]: string };
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

export interface ApiOrganizationMember {
  username: string;
}

export interface ApiOrganization {
  id: string;
  name: string;
  slug: string;
  members?: ApiOrganizationMember[];
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
  is_processing: boolean;
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

export interface ApiPhaseEvaluateResponseError {
  game_id: string;
  error: string;
}

export interface ApiPhaseEvaluateResponse {
  data: {
    total_games: number;
    successful: number;
    failed: number;
    errors: ApiPhaseEvaluateResponseError[];
  };
}

export interface ApiOrganization {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
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
  team_stat_source?: string;
  ranking_order?: number;
}

export interface ApiStat {
  id: string;
  title: string;
  team_stat_source?: string;
  ranking_order?: number;
}

export interface ApiCoach {
  id: string;
  name: string;
  type: string;
}

export interface ApiTeam {
  id: string;
  name: string;
  coaches?: ApiCoach[];
  logo_url?: string;
  tri_code?: string;
  primary_color: string | null;
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

export type ApiPlayerState = 'available' | 'not_available';

export interface ApiPlayer {
  facebook: string;
  id: string;
  instagram: string;
  name: string;
  shirt_name?: string | null;
  shirt_number?: string | null;
  username: string;
  twitter: string;
  state: ApiPlayerState;
  team_id?: string;
  photo_url?: string;
  license_number?: string;
  registration_response?: ApiRegistrationResponseResourceWithDependencies;
}

export interface ApiPlayerWithDependencies extends ApiPlayer {
  tournament_id: string;
  team_id?: string;
}

export interface ApiPlayerPatchRequest {
  player: ApiPlayer;
}

export interface ApiPlayerPostRequest {
  player: ApiPlayerWithDependencies;
}

export interface ApiPlayerResponse {
  data: ApiPlayer;
}

export interface ApiPlayersResponse {
  data: ApiPlayer[];
}

export interface ApiOfficial {
  id: string;
  name: string;
  license_number?: string;
  username: string;
}

export interface ApiOfficialWithDependencies extends ApiOfficial {
  tournament_id: string;
}

export interface ApiOfficialPatchRequest {
  official: ApiOfficial;
}

export interface ApiOfficialPostRequest {
  official: ApiOfficialWithDependencies;
}

export interface ApiOfficialResponse {
  data: ApiOfficial;
}

export interface ApiOfficialsResponse {
  data: ApiOfficial[];
}

interface ApiPlayerStat {
  title: string;
  slug?: string;
}

export interface ApiPlayerStatResponse extends ApiPlayerStat {
  id: string;
}

export interface ApiPlayerStatRequest extends ApiPlayerStat {
  id?: string;
}

export interface ApiTeamStat {
  id: string;
  title: string;
  slug: string;
  source: string;
}

export interface ApiRecentlyView {
  id: string;
  tournament: ApiTournamentWithDependecies;
  tournament_id: string;
  views: number;
}

export interface ApiRecentlyViewRequest {
  recently_view: {
    tournament_id: string;
  };
}

export interface ApiRecentlyViewPostResponse {
  data: ApiRecentlyView;
}

export interface ApiRecentlyViewResponse {
  data: ApiRecentlyView[];
}

export interface ApiRecentlyView {
  tournament: ApiTournamentWithDependecies;
  tournament_id: string;
  views: number;
}

export interface ApiTournament {
  id: string;
  name: string;
  slug: string;
  facebook?: string;
  has_aggregated_player_stats?: boolean;
  instagram?: string;
  site_url?: string;
  twitter?: string;
  player_stats?: ApiPlayerStatResponse[];
  team_stats?: ApiTeamStat[];
  sport_slug?: string;
  sport_name?: string;
  visibility: 'public' | 'private';
}

export interface ApiTournamentWithDependecies extends ApiTournament {
  organization: ApiOrganization;
  phases: ApiPhase[];
  players: ApiPlayer[];
  teams: ApiTeam[];
  officials: ApiOfficial[];
  registrations: ApiRegistration[];
  scoreboard_setting: ApiScoreboardSetting;
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

export interface ApiFacebookSignInRequest {
  facebook_id: string;
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

export interface ApiRegistrationResponseForSignUpRequest {
  registration_response_id: string;
}

export interface ApiSignUpRequest {
  user: {
    email: string;
    password: string;
    recaptcha: string;
    username: string;
  };
  registration?: ApiRegistrationResponseForSignUpRequest;
}

export interface ApiFacebookSignUpRequest {
  user: {
    email: string;
    facebook_id: string;
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

export interface ApiAccountResponse {
  data: {
    email: string;
    username: string;
    organizations: ApiOrganization[];
  };
}

export interface ApiPlayerStatsLog {
  id: string;
  game_id: string;
  phase_id: string;
  player_id: string;
  stats: { [id: string]: string };
  team_id: string;
  tournament_id: string;
}

export interface ApiPlayerStatsLogRequest {
  player_stats_logs: ApiPlayerStatsLog[];
}

export interface ApiPlayerStatsLogPatchPostResponse {
  data: {
    [id: string]: ApiPlayerStatsLog;
  };
}

export interface ApiPlayerStatsLogsResponse {
  data: ApiPlayerStatsLog[];
}

export interface ApiPlayerStatsLogResponse {
  data: ApiPlayerStatsLog;
}

export interface ApiAggregatedPlayerStatsLog {
  id: string;
  player_id: string;
  stats: { [id: string]: string };
}

export interface ApiAggregatedPlayerStatsLogsResponse {
  data: ApiAggregatedPlayerStatsLog[];
}

export interface ApiFixedPlayerStatsTableRecordPatchAndPost {
  player_id: string;
  value: string;
}

export interface ApiFixedPlayerStatsTableRecord {
  id: string;
  player_id: string;
  value: string;
}

export interface ApiFixedPlayerStatsTable {
  id: string;
  stat_id: string;
  player_stats: ApiFixedPlayerStatsTableRecord[];
  tournament_id: string;
}

export interface ApiFixedPlayerStatsTablePatchAndPost {
  id: string;
  stat_id: string;
  player_stats: ApiFixedPlayerStatsTableRecordPatchAndPost[];
  tournament_id: string;
}

export interface ApiFixedPlayerStatsTableRequest {
  fixed_player_stats_table: ApiFixedPlayerStatsTablePatchAndPost;
}

export interface ApiFixedPlayerStatsTableResponse {
  data: ApiFixedPlayerStatsTable;
}

export interface ApiFixedPlayerStatsTablesResponse {
  data: ApiFixedPlayerStatsTable[];
}

export interface ApiStatistic {
  name: string;
  slug: string;
  value_type: string;
  level: string;
  scope: string;
}

export interface ApiCoachType {
  type: string;
}

export interface ApiOfficialType {
  name: string;
  role: string;
}

export interface ApiSport {
  name: string;
  slug: string;
  player_statistics?: ApiStatistic[];
  coach_types?: ApiCoachType[];
  official_types?: ApiOfficialType[];
}

export interface ApiSportsResponse {
  data: ApiSport[];
}

export interface ApiSportResponse {
  data: ApiSport;
}

export type ApiRegistrationType = 'team_roster_invites';

export type ApiCustomFieldType = 'date' | 'datetime' | 'text' | 'consent';

export interface ApiRegistrationCustomField {
  id?: string;
  label: string;
  type: ApiCustomFieldType;
  required: boolean;
  properties?: object;
  description?: string;
}

export type ApiRegistrationInviteeType = 'team';

export interface ApiRegistrationInvite {
  id: string;
  invitee?: ApiTeam;
  invitee_id: string;
  invitee_type: ApiRegistrationInviteeType;
  registration_responses?: ApiRegistrationResponseResourceWithDependencies[];
}

export interface ApiRegistrationInviteWithDepdenencies
  extends ApiRegistrationInvite {
  registration: ApiRegistrationWithDependencies;
}

export interface ApiRegistrationInviteResponse {
  data: ApiRegistrationInviteWithDepdenencies;
}

export interface ApiRegistration {
  id: string;
  title: string;
  start_date?: string;
  end_date?: string;
  type: ApiRegistrationType;
  auto_approve?: boolean;
  custom_fields?: ApiRegistrationCustomField[];
  registration_invites?: ApiRegistrationInvite[];
}

export interface ApiRegistrationWithDependencies extends ApiRegistration {
  tournament_id: string;
  tournament?: ApiTournament;
}

export interface ApiRegistrationPatchRequest {
  registration: ApiRegistration;
}

export interface ApiRegistrationPostRequest {
  registration: ApiRegistrationWithDependencies;
}

export interface ApiRegistrationResponse {
  data: ApiRegistration;
}

export interface ApiRegistrationResponseResponse extends Object {
  name?: string;
  email?: string;
  shirt_name?: string;
  shirt_number?: string;
}

export type ApiRegistrationResponseStatus = 'pending' | 'approved';

export interface ApiRegistrationResponseResource {
  registration_invite_id: string;
  response: ApiRegistrationResponseResponse;
}

export interface ApiRegistrationResponseResourceWithDependencies
  extends ApiRegistrationResponseResource {
  id: string;
  status: ApiRegistrationResponseStatus;
}

export interface ApiRegistrationResponseResourcePostRequest {
  registration_response: ApiRegistrationResponseResource;
}

export interface ApiRegistrationResponseResourcePutApproveRequest {
  registration_responses: string[];
}

export interface ApiRegistrationResponseResourceResponse {
  data: ApiRegistrationResponseResourceWithDependencies;
}

export type ApiUploadFileType =
  | 'athlete-profiles-photos'
  | 'game-assets'
  | 'player-photos'
  | 'registration-consents'
  | 'team-logos'
  | 'organization-logos';

export interface ApiUploadPostRequest {
  filename: string;
  content_type: string;
  size: number;
  file_type: ApiUploadFileType;
}

export interface ApiUploadFile {
  filename: string;
  url: string;
  public_url: string;
}

export interface ApiUploadPostResponse {
  data: ApiUploadFile;
}

export interface ApiUploadDeleteRequest {
  url: string;
  file_type: ApiUploadFileType;
}

export type ApiScoreboardSettingView =
  | 'basketball-basic'
  | 'basketball-medium'
  | 'basketball-medium-plus';
export type ApiScoreboardSettingLiveSiteUpdate =
  | 'no-live-update'
  | 'team-score-live-update'
  | 'full-live-update';
export interface ApiScoreboardSetting {
  id: string;
  view: ApiScoreboardSettingView;
  initial_period_time: number;
  initial_extra_period_time: number;
  live_site_update: ApiScoreboardSettingLiveSiteUpdate;
}

export interface ApiScoreboardSettingWithDependencies
  extends ApiScoreboardSetting {
  tournament_id: string;
}

export interface ApiScoreboardSettingPatchRequest {
  scoreboard_setting: ApiScoreboardSetting;
}

export interface ApiScoreboardSettingPostRequest {
  scoreboard_setting: ApiScoreboardSettingWithDependencies;
}

export interface ApiScoreboardSettingResponse {
  data: ApiScoreboardSetting;
}

export interface ApiScoreboardSettingsResponse {
  data: ApiScoreboardSetting[];
}

export interface ApiTeamStatsLog {
  id: string;
  game_id: string;
  phase_id: string;
  team_id: string;
  stats: { [id: string]: string };
  tournament_id: string;
  against_team_id: string;
}

export interface ApiTeamStatsLogsResponse {
  data: ApiTeamStatsLog[];
}

export interface ApiAthleteProfile {
  username: string;
  name?: string;
  photo_url?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  tournaments?: ApiTournamentWithDependecies[];
}

export interface ApiAthleteProfilePostRequest {
  athlete_profile: ApiAthleteProfile;
}

export interface ApiAthleteProfilePatchRequest {
  athlete_profile: ApiAthleteProfile;
}

export interface ApiAthleteProfileResponse {
  data: ApiAthleteProfile;
}

export interface ApiAthleteProfilesResponse {
  data: ApiAthleteProfile[];
}
