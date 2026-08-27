import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { default as accountReducer } from './Accounts/reducer';
import { AccountState } from './Accounts/state';
import { default as accountIdentityReducer } from './AccountIdentities/reducer';
import { AccountIdentityState } from './AccountIdentities/state';
import { default as athleteProfilesReducer } from './AthleteProfiles/reducer';
import { AthleteProfileState } from './AthleteProfiles/state';
import { default as athleteProfileSchedulesReducer } from './AthleteProfiles/Schedules/reducer';
import { default as drawsReducer } from './Draws/reducer';
import { DrawState } from './Draws/state';
import { default as eliminationsReducer } from './Eliminations/reducer';
import { EliminationState } from './Eliminations/state';
import { default as tournamentGameReducer } from './Games/reducer';
import { GameState } from './Games/state';
import { default as organizationReducer } from './Organizations/reducer';
import { OrganizationState } from './Organizations/state';
import { default as organizationSettingsReducer } from './OrganizationSettings/reducer';
import { default as organizationMembersReducer } from './OrganizationMembers/reducer';
import { OrganizationSettingState } from './OrganizationSettings/state';
import { OrganizationMemberState } from './OrganizationMembers/state';
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
import { default as teamStatsLogReducer } from './TeamStatsLog/reducer';
import { TeamStatsLogState } from './TeamStatsLog/state';
import { AggregatedPlayerStatsLogState } from './AggregatedPlayerStats/state';
import { default as aggregatedPlayerStatsLogsReducer } from './AggregatedPlayerStats/reducer';
import { default as fixedPlayerStatsTablesReducer } from './FixedPlayerStatsTables/reducer';
import { FixedPlayerStatsTableState } from './FixedPlayerStatsTables/state';
import { ScoreboardSettingState } from './ScoreboardSettings/state';
import { default as scoreboardSettingsReducer } from './ScoreboardSettings/reducer';
import { TournamentSettingState } from './TournamentSettings/state';
import { default as tournamentSettingsReducer } from './TournamentSettings/reducer';
import { SportState } from './Sports/state';
import { default as sportReducer } from './Sports/reducer';
import { RegistrationState } from './Registrations/state';
import { default as registrationReducer } from './Registrations/reducer';
import { default as officialsReducer } from './Officials/reducer';
import { OfficialState } from './Officials/state';
import { default as officialProfilesReducer } from './OfficialProfiles/reducer';
import { OfficialProfileState } from './OfficialProfiles/state';
import { default as officialProfileSchedulesReducer } from './OfficialProfiles/Schedules/reducer';
import { ScheduleState } from './Shared/Schedules/state';
import { default as themeReducer } from './Theme/reducer';
import { ThemeState } from './Theme/types';
import { default as themeV2Reducer } from './ThemeV2/reducer';
import { ThemeState as ThemeV2State } from './ThemeV2/types';
import { NODE_ENV } from './Shared/env';

export interface StoreState {
  account: AccountState;
  accountIdentity: AccountIdentityState;
  aggregatedPlayerStatsLogs: AggregatedPlayerStatsLogState;
  athleteProfiles: AthleteProfileState & { schedules: ScheduleState };
  draws: DrawState;
  eliminations: EliminationState;
  fixedPlayerStatsTables: FixedPlayerStatsTableState;
  games: GameState;
  officials: OfficialState;
  officialProfiles: OfficialProfileState & { schedules: ScheduleState };
  organizations: OrganizationState & {
    organizationSettings: OrganizationSettingState;
    organizationMembers: OrganizationMemberState;
  };
  phases: PhaseState;
  players: PlayerState;
  playerStatsLogs: PlayerStatsLogState;
  registrations: RegistrationState;
  scoreboardSettings: ScoreboardSettingState;
  sports: SportState;
  teams: TeamState;
  teamStatsLogs: TeamStatsLogState;
  theme: ThemeState;
  themeV2: ThemeV2State;
  tournaments: TournamentState & { tournamentSettings: TournamentSettingState };
}

type AthleteProfilesWithSchedulesState = AthleteProfileState & {
  schedules: ScheduleState;
};

const athleteProfilesWithSchedulesReducer = (
  state: AthleteProfilesWithSchedulesState | undefined,
  action: AnyAction
): AthleteProfilesWithSchedulesState => ({
  ...athleteProfilesReducer(state, action),
  schedules: athleteProfileSchedulesReducer(
    state ? state.schedules : undefined,
    action
  )
});

type OfficialProfilesWithSchedulesState = OfficialProfileState & {
  schedules: ScheduleState;
};

const officialProfilesWithSchedulesReducer = (
  state: OfficialProfilesWithSchedulesState | undefined,
  action: AnyAction
): OfficialProfilesWithSchedulesState => ({
  ...officialProfilesReducer(state, action),
  schedules: officialProfileSchedulesReducer(
    state ? state.schedules : undefined,
    action
  )
});

type TournamentsWithSettingsState = TournamentState & {
  tournamentSettings: TournamentSettingState;
};

const tournamentsWithSettingsReducer = (
  state: TournamentsWithSettingsState | undefined,
  action: AnyAction
): TournamentsWithSettingsState => ({
  ...tournamentReducer(state, action),
  tournamentSettings: tournamentSettingsReducer(
    state ? state.tournamentSettings : undefined,
    action
  )
});

type OrganizationsWithSettingsState = OrganizationState & {
  organizationSettings: OrganizationSettingState;
  organizationMembers: OrganizationMemberState;
};

const organizationsWithSettingsReducer = (
  state: OrganizationsWithSettingsState | undefined,
  action: AnyAction
): OrganizationsWithSettingsState => ({
  ...organizationReducer(state, action),
  organizationSettings: organizationSettingsReducer(
    state ? state.organizationSettings : undefined,
    action
  ),
  organizationMembers: organizationMembersReducer(
    state ? state.organizationMembers : undefined,
    action
  )
});

export default createStore(
  combineReducers({
    account: accountReducer,
    accountIdentity: accountIdentityReducer,
    aggregatedPlayerStatsLogs: aggregatedPlayerStatsLogsReducer,
    athleteProfiles: athleteProfilesWithSchedulesReducer,
    draws: drawsReducer,
    eliminations: eliminationsReducer,
    fixedPlayerStatsTables: fixedPlayerStatsTablesReducer,
    games: tournamentGameReducer,
    officials: officialsReducer,
    officialProfiles: officialProfilesWithSchedulesReducer,
    organizations: organizationsWithSettingsReducer,
    phases: tournamentPhaseReducer,
    players: playerReducer,
    playerStatsLogs: playerStatsLogReducer,
    registrations: registrationReducer,
    scoreboardSettings: scoreboardSettingsReducer,
    sports: sportReducer,
    teams: teamReducer,
    teamStatsLogs: teamStatsLogReducer,
    theme: themeReducer,
    themeV2: themeV2Reducer,
    tournaments: tournamentsWithSettingsReducer
  }),
  NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk))
);
