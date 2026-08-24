import {
  ApiAdminTournament,
  ApiTournament,
  ApiTournamentArchive,
  ApiTournamentWithDependecies,
  ApiBillingAgreement
} from '../Shared/httpClient/apiTypes';
import { HttpAction } from '../Shared/store/interfaces';

export const DELETE_TOURNAMENT = 'API_DELETE_TOURNAMENT';
export const DELETE_TOURNAMENT_SUCCESS = 'API_DELETE_TOURNAMENT_SUCCESS';
export const DELETE_TOURNAMENT_FAILURE = 'API_DELETE_TOURNAMENT_FAILURE';
export const PATCH_TOURNAMENT = 'API_PATCH_TOURNAMENT';
export const PATCH_TOURNAMENT_SUCCESS = 'API_PATCH_TOURNAMENT_SUCCESS';
export const PATCH_TOURNAMENT_FAILURE = 'API_PATCH_TOURNAMENT_FAILURE';
export const POST_TOURNAMENT = 'API_POST_TOURNAMENT';
export const POST_TOURNAMENT_SUCCESS = 'API_POST_TOURNAMENT_SUCCESS';
export const POST_TOURNAMENT_FAILURE = 'API_POST_TOURNAMENT_FAILURE';
export const GET_TOURNAMENTS_BY_FILTER = 'API_GET_TOURNAMENTS_BY_FILTER';
export const GET_TOURNAMENTS_BY_FILTER_SUCCESS =
  'API_GET_TOURNAMENTS_BY_FILTER_SUCCESS';
export const GET_TOURNAMENTS_BY_FILTER_FAILURE =
  'API_GET_TOURNAMENTS_BY_FILTER_FAILURE';
export const GET_ADMIN_TOURNAMENTS = 'API_GET_ADMIN_TOURNAMENTS';
export const GET_ADMIN_TOURNAMENTS_SUCCESS =
  'API_GET_ADMIN_TOURNAMENTS_SUCCESS';
export const GET_ADMIN_TOURNAMENTS_FAILURE =
  'API_GET_ADMIN_TOURNAMENTS_FAILURE';
export const PATCH_TOURNAMENT_ARCHIVE = 'API_PATCH_TOURNAMENT_ARCHIVE';
export const PATCH_TOURNAMENT_ARCHIVE_SUCCESS =
  'API_PATCH_TOURNAMENT_ARCHIVE_SUCCESS';
export const PATCH_TOURNAMENT_ARCHIVE_FAILURE =
  'API_PATCH_TOURNAMENT_ARCHIVE_FAILURE';
export const GET_TOURNAMENT = 'API_GET_TOURNAMENT';
export const GET_TOURNAMENT_SUCCESS = 'API_GET_TOURNAMENT_SUCCESS';
export const GET_TOURNAMENT_FAILURE = 'API_GET_TOURNAMENT_FAILURE';
export const GET_BILLING_AGREEMENT = 'API_GET_BILLING_AGREEMENT';
export const GET_BILLING_AGREEMENT_SUCCESS =
  'API_GET_BILLING_AGREEMENT_SUCCESS';
export const GET_BILLING_AGREEMENT_FAILURE =
  'API_GET_BILLING_AGREEMENT_FAILURE';

export const deleteTournamentStart = (): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT
});

export const deleteTournamentSuccess = (
  payload: string
): HttpAction<ActionTypes, string> => ({
  type: DELETE_TOURNAMENT_SUCCESS,
  payload
});

export const deleteTournamentFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: DELETE_TOURNAMENT_FAILURE,
  payload
});

export const patchTournamentStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT
});

export const patchTournamentSuccess = (
  payload: ApiTournamentWithDependecies
): HttpAction<ActionTypes, ApiTournamentWithDependecies> => ({
  type: PATCH_TOURNAMENT_SUCCESS,
  payload
});

export const patchTournamentFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_FAILURE,
  payload
});

export const postTournamentStart = (): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT
});

export const postTournamentSuccess = (
  payload: ApiTournamentWithDependecies
): HttpAction<ActionTypes, ApiTournamentWithDependecies> => ({
  type: POST_TOURNAMENT_SUCCESS,
  payload
});

export const postTournamentFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: POST_TOURNAMENT_FAILURE,
  payload
});

export const getTournamentsByFilterStart = (): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENTS_BY_FILTER
});

export const getTournamentsByFilterSuccess = (
  payload: ApiTournament[]
): HttpAction<ActionTypes, ApiTournament[]> => ({
  type: GET_TOURNAMENTS_BY_FILTER_SUCCESS,
  payload
});

export const getTournamentsByFilterFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENTS_BY_FILTER_FAILURE,
  payload
});

export const getAdminTournamentsStart = (): HttpAction<ActionTypes> => ({
  type: GET_ADMIN_TOURNAMENTS
});

export const getAdminTournamentsSuccess = (
  payload: ApiAdminTournament[]
): HttpAction<ActionTypes, ApiAdminTournament[]> => ({
  type: GET_ADMIN_TOURNAMENTS_SUCCESS,
  payload
});

export const getAdminTournamentsFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: GET_ADMIN_TOURNAMENTS_FAILURE,
  payload
});

export const patchTournamentArchiveStart = (): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_ARCHIVE
});

export const patchTournamentArchiveSuccess = (
  payload: ApiTournamentArchive
): HttpAction<ActionTypes, ApiTournamentArchive> => ({
  type: PATCH_TOURNAMENT_ARCHIVE_SUCCESS,
  payload
});

export const patchTournamentArchiveFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: PATCH_TOURNAMENT_ARCHIVE_FAILURE,
  payload
});

export const getTournamentStart = (): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENT
});

export const getTournamentSuccess = (
  payload: ApiTournamentWithDependecies
): HttpAction<ActionTypes, ApiTournamentWithDependecies> => ({
  type: GET_TOURNAMENT_SUCCESS,
  payload
});

export const getTournamentFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: GET_TOURNAMENT_FAILURE,
  payload
});

export const getBillingAgreementStart = (): HttpAction<ActionTypes> => ({
  type: GET_BILLING_AGREEMENT
});

export const getBillingAgreementSuccess = (
  payload: ApiBillingAgreement[] | null
): HttpAction<ActionTypes, ApiBillingAgreement[] | null> => ({
  type: GET_BILLING_AGREEMENT_SUCCESS,
  payload
});

export const getBillingAgreementFailure = (
  payload: unknown
): HttpAction<ActionTypes> => ({
  type: GET_BILLING_AGREEMENT_FAILURE,
  payload
});

export type ActionTypes =
  | typeof DELETE_TOURNAMENT
  | typeof DELETE_TOURNAMENT_FAILURE
  | typeof DELETE_TOURNAMENT_SUCCESS
  | typeof PATCH_TOURNAMENT
  | typeof PATCH_TOURNAMENT_FAILURE
  | typeof PATCH_TOURNAMENT_SUCCESS
  | typeof POST_TOURNAMENT
  | typeof POST_TOURNAMENT_FAILURE
  | typeof POST_TOURNAMENT_SUCCESS
  | typeof GET_TOURNAMENTS_BY_FILTER
  | typeof GET_TOURNAMENTS_BY_FILTER_FAILURE
  | typeof GET_TOURNAMENTS_BY_FILTER_SUCCESS
  | typeof GET_ADMIN_TOURNAMENTS
  | typeof GET_ADMIN_TOURNAMENTS_FAILURE
  | typeof GET_ADMIN_TOURNAMENTS_SUCCESS
  | typeof PATCH_TOURNAMENT_ARCHIVE
  | typeof PATCH_TOURNAMENT_ARCHIVE_FAILURE
  | typeof PATCH_TOURNAMENT_ARCHIVE_SUCCESS
  | typeof GET_TOURNAMENT
  | typeof GET_TOURNAMENT_FAILURE
  | typeof GET_TOURNAMENT_SUCCESS
  | typeof GET_BILLING_AGREEMENT
  | typeof GET_BILLING_AGREEMENT_FAILURE
  | typeof GET_BILLING_AGREEMENT_SUCCESS;
export type Actions = HttpAction<ActionTypes>;
