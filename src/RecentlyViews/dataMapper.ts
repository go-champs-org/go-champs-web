import {
  ApiRecentlyViewRequest,
  ApiRecentlyView
} from '../Shared/httpClient/apiTypes';
import { RecentlyViewEntity } from './state';

export const mapApiRecentlyViewResponseToRecentlyViewResponse = (
  apiRecentlyViewResponse: ApiRecentlyView
): RecentlyViewEntity => ({
  id: apiRecentlyViewResponse.id,
  tournamentId: apiRecentlyViewResponse.tournament_id
});

export const mapTournamentIdToRecentlyViewRequest = (
  tournamentId: string
): ApiRecentlyViewRequest => ({
  recently_view: {
    tournament_id: tournamentId
  }
});
