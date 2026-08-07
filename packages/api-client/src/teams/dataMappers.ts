import { CoachEntity, TeamEntity } from '@gochamps/domain-types';
import { ApiCoach, ApiTeam } from './apiTypes';

export const mapApiCoachToCoachEntity = (apiCoach: ApiCoach): CoachEntity => ({
  id: apiCoach.id,
  name: apiCoach.name,
  type: apiCoach.type
});

export const mapApiTeamToTeamEntity = (apiTeam: ApiTeam): TeamEntity => ({
  id: apiTeam.id,
  name: apiTeam.name,
  logoUrl: apiTeam.logo_url || '',
  triCode: apiTeam.tri_code || '',
  primaryColor: apiTeam.primary_color || '',
  coaches: apiTeam.coaches ? apiTeam.coaches.map(mapApiCoachToCoachEntity) : []
});
