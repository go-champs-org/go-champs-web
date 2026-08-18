import { ApiOfficialProfileScheduleGame } from '../../Shared/httpClient/apiTypes';
import { ScheduleGameEntity } from './state';

export const mapApiScheduleGameToScheduleGameEntity = (
  apiGame: ApiOfficialProfileScheduleGame
): ScheduleGameEntity => ({
  id: apiGame.id,
  datetime: apiGame.datetime || '',
  location: apiGame.location || '',
  city: apiGame.city || '',
  isFinished: !!apiGame.is_finished,
  liveState: apiGame.live_state || '',
  phaseId: apiGame.phase_id,
  awayTeamName: apiGame.away_team ? apiGame.away_team.name : '',
  awayPlaceholder: apiGame.away_placeholder || '',
  homeTeamName: apiGame.home_team ? apiGame.home_team.name : '',
  homePlaceholder: apiGame.home_placeholder || '',
  tournamentId: apiGame.tournament ? apiGame.tournament.id : '',
  tournamentName: apiGame.tournament ? apiGame.tournament.name : '',
  tournamentSlug: apiGame.tournament ? apiGame.tournament.slug : '',
  organizationSlug:
    apiGame.tournament && apiGame.tournament.organization
      ? apiGame.tournament.organization.slug
      : ''
});
