import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { default as accountReducer } from './Accounts/reducer';
import { AccountState } from './Accounts/state';
import { default as drawsReducer } from './Draws/reducer';
import { DrawState } from './Draws/state';
import { default as eliminationsReducer } from './Eliminations/reducer';
import { EliminationState } from './Eliminations/state';
import { default as tournamentGameReducer } from './Games/reducer';
import { GameState } from './Games/state';
import { default as organizationReducer } from './Organizations/reducer';
import { OrganizationState } from './Organizations/state';
import { default as tournamentPhaseReducer } from './Phases/reducer';
import { PhaseState } from './Phases/state';
import { default as teamReducer } from './Teams/reducer';
import { TeamState } from './Teams/state';
import { default as tournamentReducer } from './Tournaments/reducer';
import { TournamentState } from './Tournaments/state';
import { default as playerReducer } from './Players/reducer';
import { default as playerStatsLogReducer } from './PlayerStatsLog/reducer';
import { PlayerState } from './Players/state';
import { PlayerStatsLogState } from './PlayerStatsLog/state';
import { AggregatedPlayerStatsLogState } from './AggregatedPlayerStats/state';
import { default as aggregatedPlayerStatsLogsReducer } from './AggregatedPlayerStats/reducer';
import { default as fixedPlayerStatsTablesReducer } from './FixedPlayerStatsTables/reducer';
import { FixedPlayerStatsTableState } from './FixedPlayerStatsTables/state';
import { SportState } from './Sports/state';
import { default as sportReducer } from './Sports/reducer';
import { NODE_ENV } from './Shared/env';

export interface StoreState {
  account: AccountState;
  aggregatedPlayerStatsLogs: AggregatedPlayerStatsLogState;
  draws: DrawState;
  eliminations: EliminationState;
  fixedPlayerStatsTables: FixedPlayerStatsTableState;
  games: GameState;
  organizations: OrganizationState;
  phases: PhaseState;
  players: PlayerState;
  playerStatsLogs: PlayerStatsLogState;
  sports: SportState;
  teams: TeamState;
  tournaments: TournamentState;
}

export default createStore(
  combineReducers({
    account: accountReducer,
    aggregatedPlayerStatsLogs: aggregatedPlayerStatsLogsReducer,
    draws: drawsReducer,
    eliminations: eliminationsReducer,
    fixedPlayerStatsTables: fixedPlayerStatsTablesReducer,
    games: tournamentGameReducer,
    organizations: organizationReducer,
    phases: tournamentPhaseReducer,
    players: playerReducer,
    playerStatsLogs: playerStatsLogReducer,
    sports: sportReducer,
    teams: teamReducer,
    tournaments: tournamentReducer
  }),
  NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk))
);
