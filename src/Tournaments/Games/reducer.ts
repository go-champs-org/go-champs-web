import {
  createReducer,
  entityById,
  mapEntities,
  mapEntitiesByKey,
  returnProperty
} from '../../Shared/store/helpers';
import { HttpAction } from '../../Shared/store/interfaces';
import {
  ActionTypes,
  DELETE_TOURNAMENT_GAME,
  DELETE_TOURNAMENT_GAME_FAILURE,
  DELETE_TOURNAMENT_GAME_SUCCESS,
  POST_TOURNAMENT_GAME,
  POST_TOURNAMENT_GAME_FAILURE,
  POST_TOURNAMENT_GAME_SUCCESS,
  REQUEST_TOURNAMENT_GAME,
  REQUEST_TOURNAMENT_GAMES,
  REQUEST_TOURNAMENT_GAMES_FAILURE,
  REQUEST_TOURNAMENT_GAMES_SUCCESS,
  REQUEST_TOURNAMENT_GAME_FAILURE,
  REQUEST_TOURNAMENT_GAME_SUCCESS
} from './actions';
import { initialState, TournamentGameState } from './state';

const mapTournamentGame = (apiData: any) => ({
  id: apiData.id,
  awayScore: apiData.away_score,
  awayTeam: apiData.away_team,
  datetime: apiData.datetime,
  homeScore: apiData.home_score,
  homeTeam: apiData.home_team,
  location: apiData.location
});

const tournamentGameMapEntities = mapEntities(
  returnProperty('id'),
  mapTournamentGame
);

const returnDateId = (apiData: any) =>
  apiData.datetime && apiData.datetime.substring(0, 10);

const mapTournamentGameToDateEntity = (apiData: any) => ({
  [apiData.id]: {
    id: apiData.id,
    awayScore: apiData.away_score,
    awayTeam: apiData.away_team,
    datetime: apiData.datetime,
    homeScore: apiData.home_score,
    homeTeam: apiData.home_team,
    location: apiData.location
  }
});

const tournamentGameMapToDateEntity = mapEntities(
  returnDateId,
  mapTournamentGameToDateEntity
);

const removeTournamentGameByDate = (
  state: TournamentGameState,
  tournamentGameId: string
) => {
  const dateKey = returnDateId(state.tournamentGames[tournamentGameId]);

  if (
    state.tournamentGamesByDate[dateKey] &&
    Object.keys(state.tournamentGamesByDate[dateKey]).length > 1
  ) {
    const newTournamentGamesDate = Object.keys(
      state.tournamentGamesByDate[dateKey]
    )
      .filter((key: string) => key !== tournamentGameId)
      .reduce(mapEntitiesByKey(state.tournamentGamesByDate[dateKey]), {});
    return {
      ...state.tournamentGamesByDate,
      [dateKey]: newTournamentGamesDate
    };
  }

  return Object.keys(state.tournamentGamesByDate)
    .filter((key: string) => key !== dateKey)
    .reduce(mapEntitiesByKey(state.tournamentGamesByDate), {});
};

export const deleteTournamentGame = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentGame: true
});

export const deleteTournamentGameFailure = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingDeleteTournamentGame: false
});

export const deleteTournamentGameSuccess = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => {
  const tournamentGames = Object.keys(state.tournamentGames)
    .filter(entityById(state.tournamentGames, action.payload))
    .reduce(mapEntitiesByKey(state.tournamentGames), {});
  return {
    ...state,
    isLoadingDeleteTournamentGame: false,
    tournamentGames,
    tournamentGamesByDate: removeTournamentGameByDate(state, action.payload)
  };
};

export const postTournamentGame = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentGame: true
});

export const postTournamentGameFailure = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentGame: false
});

export const postTournamentGameSuccess = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingPostTournamentGame: false,
  tournamentGames: [action.payload.data].reduce(
    tournamentGameMapEntities,
    state.tournamentGames
  )
});

export const requestTournamentGame = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournamentGame: true
});

export const requestTournamentGameFailure = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournamentGame: false
});

export const requestTournamentGameSuccess = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournamentGame: false,
  tournamentGames: [action.payload.data].reduce(tournamentGameMapEntities, {})
});

export const requestTournamentGames = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournamentGames: true
});

export const requestTournamentGamesFailure = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournamentGames: false
});

export const requestTournamentGamesSuccess = (
  state: TournamentGameState,
  action: HttpAction<ActionTypes>
) => ({
  ...state,
  isLoadingRequestTournamentGames: false,
  tournamentGames: action.payload.data.reduce(tournamentGameMapEntities, {}),
  tournamentGamesByDate: action.payload.data.reduce(
    tournamentGameMapToDateEntity,
    {}
  )
});

export default createReducer(initialState, {
  [DELETE_TOURNAMENT_GAME]: deleteTournamentGame,
  [DELETE_TOURNAMENT_GAME_FAILURE]: deleteTournamentGameFailure,
  [DELETE_TOURNAMENT_GAME_SUCCESS]: deleteTournamentGameSuccess,
  [POST_TOURNAMENT_GAME]: postTournamentGame,
  [POST_TOURNAMENT_GAME_FAILURE]: postTournamentGameFailure,
  [POST_TOURNAMENT_GAME_SUCCESS]: postTournamentGameSuccess,
  [REQUEST_TOURNAMENT_GAME]: requestTournamentGame,
  [REQUEST_TOURNAMENT_GAME_FAILURE]: requestTournamentGameFailure,
  [REQUEST_TOURNAMENT_GAME_SUCCESS]: requestTournamentGameSuccess,
  [REQUEST_TOURNAMENT_GAMES]: requestTournamentGames,
  [REQUEST_TOURNAMENT_GAMES_FAILURE]: requestTournamentGamesFailure,
  [REQUEST_TOURNAMENT_GAMES_SUCCESS]: requestTournamentGamesSuccess
});
