export interface ScheduleGameEntity {
  id: string;
  datetime: string;
  location: string;
  city: string;
  isFinished: boolean;
  liveState: string;
  phaseId: string;
  awayTeamName: string;
  awayPlaceholder: string;
  homeTeamName: string;
  homePlaceholder: string;
  tournamentId: string;
  tournamentName: string;
  tournamentSlug: string;
  organizationSlug: string;
}

export interface ScheduleState {
  isLoadingRequestSchedule: boolean;
  hasErrorRequestSchedule: boolean;
  games: { [key: string]: ScheduleGameEntity };
}

export const DEFAULT_SCHEDULE_GAME: ScheduleGameEntity = {
  id: '',
  datetime: '',
  location: '',
  city: '',
  isFinished: false,
  liveState: '',
  phaseId: '',
  awayTeamName: '',
  awayPlaceholder: '',
  homeTeamName: '',
  homePlaceholder: '',
  tournamentId: '',
  tournamentName: '',
  tournamentSlug: '',
  organizationSlug: ''
};

export const initialState: ScheduleState = {
  isLoadingRequestSchedule: false,
  hasErrorRequestSchedule: false,
  games: {}
};
