import {
  ApiTournament,
  ApiTournamentRequest,
  ApiTournamentWithDependecies,
  ApiTournamentWithDependeciesIds,
  ApiPhase,
  ApiPlayerStatRequest,
  ApiTeamStat,
  ApiPlayerStatResponse,
  ApiBillingAgreement,
  ApiPlan,
  ApiTournamentSponsor
} from '../Shared/httpClient/apiTypes';
import {
  TournamentEntity,
  PlayerStatEntity,
  TeamStatEntity,
  PlayerStatVisibility,
  TournamentVisibilityEnum,
  BillingAgreementEntity,
  PlanEntity,
  TournamentSponsorEntity
} from './state';
import { TranslateSelectOptionType } from '../Shared/hooks/useTranslatedSelectOptions';
import { SportEntity } from '../Sports/state';
import { FileReference } from '../Shared/httpClient/uploadHttpClient';

export const PRIVATE_STAT_SLUGS = [
  'disqualifications',
  'ejections',
  'efficiency',
  'field_goals_attempted',
  'field_goals_missed',
  'fouls_flagrant',
  'fouls_personal',
  'fouls_technical',
  'free_throws_attempted',
  'free_throws_missed',
  'game_played',
  'game_started',
  'minutes_played',
  'plus_minus',
  'three_point_field_goals_attempted',
  'three_point_field_goals_missed'
];

const mapApiPlayerStatVisibilityResponseToVisibility = (
  apiPlayerStatResponse: ApiPlayerStatResponse
): PlayerStatVisibility => {
  return PRIVATE_STAT_SLUGS.includes(apiPlayerStatResponse.slug || '')
    ? 'private'
    : 'public';
};

export const mapPlayerStatEntityToApiPlayerStatRequest = (
  playerStat: PlayerStatEntity
): ApiPlayerStatRequest => ({
  id: playerStat.id ? playerStat.id : undefined,
  title: playerStat.title,
  slug: playerStat.slug ? playerStat.slug : undefined
});

export const mapTeamStatEntityToApiTeamStat = (
  apiTeamStat: TeamStatEntity
): ApiTeamStat => ({
  id: apiTeamStat.id,
  title: apiTeamStat.title,
  slug: apiTeamStat.slug,
  source: apiTeamStat.source
});

export const mapApiPlayerStatResponseToPlayerStatEntity = (
  apiPlayerStatRequest: ApiPlayerStatResponse
): PlayerStatEntity => ({
  id: apiPlayerStatRequest.id ? apiPlayerStatRequest.id : '',
  title: apiPlayerStatRequest.title,
  slug: apiPlayerStatRequest.slug ? apiPlayerStatRequest.slug : '',
  visibility: mapApiPlayerStatVisibilityResponseToVisibility(
    apiPlayerStatRequest
  )
});

export const mapApiTeamStatToTeamStatEntity = (
  apiTeamStat: ApiTeamStat
): TeamStatEntity => ({
  id: apiTeamStat.id,
  title: apiTeamStat.title,
  slug: apiTeamStat.slug,
  source: apiTeamStat.source
});

export const mapApiPlanToPlanEntity = (apiPlan: ApiPlan): PlanEntity => ({
  slug: apiPlan.slug,
  amount: apiPlan.amount,
  active: (apiPlan as any).active || false,
  description: (apiPlan as any).description || '',
  name: (apiPlan as any).name || '',
  sportId: (apiPlan as any).sport_id || ''
});

export const mapApiBillingAgreementToBillingAgreementEntity = (
  apiBillingAgreement: ApiBillingAgreement
): BillingAgreementEntity => ({
  active: apiBillingAgreement.active,
  agreedAmount: apiBillingAgreement.agreed_amount,
  dueDay: apiBillingAgreement.due_day,
  plan: mapApiPlanToPlanEntity(apiBillingAgreement.plan),
  planId: apiBillingAgreement.plan_id,
  selectedCampaigns: apiBillingAgreement.selected_campaigns,
  signedAt: apiBillingAgreement.signed_at,
  tournamentId: apiBillingAgreement.tournament_id,
  username: apiBillingAgreement.username,
  trialActive: apiBillingAgreement.trial_active || false,
  gamesRemaining:
    apiBillingAgreement.games_remaining !== undefined
      ? apiBillingAgreement.games_remaining
      : null
});

export const mapApiTournamentSponsorToTournamentSponsorEntity = (
  apiSponsor: ApiTournamentSponsor
): TournamentSponsorEntity => ({
  name: apiSponsor.name,
  link: apiSponsor.link,
  logoUrl: apiSponsor.logo_url
});

export const mapTournamentSponsorEntityToApiTournamentSponsor = (
  sponsor: TournamentSponsorEntity
): ApiTournamentSponsor => ({
  name: sponsor.name,
  link: sponsor.link,
  logo_url: sponsor.logoUrl
});

export const mapTournamentLogoToApiFileReference = (
  tournament: TournamentEntity
): FileReference => ({
  publicUrl: tournament.logoUrl,
  filename: '',
  url: tournament.logoUrl
});

export const mapFileReferenceToApiTournamentLogo = (
  fileReference: FileReference
) => fileReference.publicUrl;

export const mapSponsorLogoToApiFileReference = (
  logoUrl: string
): FileReference => ({
  publicUrl: logoUrl,
  filename: '',
  url: logoUrl
});

export const mapFileReferenceToApiSponsorLogo = (
  fileReference: FileReference
) => fileReference.publicUrl;

export const mapApiTournamentToTournamentEntity = (
  apiTournament: ApiTournament
): TournamentEntity => ({
  id: apiTournament.id,
  name: apiTournament.name,
  slug: apiTournament.slug,
  facebook: apiTournament.facebook ? apiTournament.facebook : '',
  instagram: apiTournament.instagram ? apiTournament.instagram : '',
  hasAggregatedPlayerStats: apiTournament.has_aggregated_player_stats,
  logoUrl: apiTournament.logo_url ? apiTournament.logo_url : '',
  siteUrl: apiTournament.site_url ? apiTournament.site_url : '',
  sponsors: apiTournament.sponsors
    ? apiTournament.sponsors.map(
        mapApiTournamentSponsorToTournamentSponsorEntity
      )
    : [],
  twitter: apiTournament.twitter ? apiTournament.twitter : '',
  playerStats: apiTournament.player_stats
    ? apiTournament.player_stats.map(mapApiPlayerStatResponseToPlayerStatEntity)
    : [],
  teamStats: apiTournament.team_stats
    ? apiTournament.team_stats.map(mapApiTeamStatToTeamStatEntity)
    : [],
  sportName: apiTournament.sport_name ? apiTournament.sport_name : '',
  sportSlug: apiTournament.sport_slug ? apiTournament.sport_slug : '',
  visibility: apiTournament.visibility
});

export const mapTournamentEntityToApiTournamentRequest = (
  tournament: TournamentEntity,
  organizationId: string
): ApiTournamentRequest => ({
  tournament: {
    id: tournament.id,
    name: tournament.name,
    slug: tournament.slug,
    organization_id: organizationId,
    facebook: tournament.facebook ? tournament.facebook : '',
    instagram: tournament.instagram ? tournament.instagram : '',
    logo_url: tournament.logoUrl ? tournament.logoUrl : '',
    site_url: tournament.siteUrl ? tournament.siteUrl : '',
    sponsors:
      tournament.sponsors.length > 0
        ? tournament.sponsors.map(
            mapTournamentSponsorEntityToApiTournamentSponsor
          )
        : undefined,
    twitter: tournament.twitter ? tournament.twitter : '',
    player_stats:
      tournament.playerStats.length > 0
        ? tournament.playerStats.map(mapPlayerStatEntityToApiPlayerStatRequest)
        : undefined,
    team_stats:
      tournament.teamStats.length > 0
        ? tournament.teamStats.map(mapTeamStatEntityToApiTeamStat)
        : undefined,
    sport_name: tournament.sportName,
    sport_slug: tournament.sportSlug,
    visibility: tournament.visibility
  } as ApiTournamentWithDependeciesIds
});

export const currentPhaseId = (tournament: ApiTournamentWithDependecies) => {
  if (!tournament.phases) {
    return '';
  }

  const currentPhase = tournament.phases.find(
    (phase: ApiPhase) => phase.is_in_progress
  );

  if (currentPhase) {
    return currentPhase.id;
  }
  if (tournament.phases.length > 0) {
    return tournament.phases[0].id;
  }
  return '';
};

export const VISIBILITY_OPTIONS: { value: string; labelKey: string }[] = [
  {
    value: TournamentVisibilityEnum.PUBLIC,
    labelKey: 'tournamentForm.visibility.public'
  },
  {
    value: TournamentVisibilityEnum.PRIVATE,
    labelKey: 'tournamentForm.visibility.private'
  }
];

export const sportsForSelectInput = (
  sports: SportEntity[]
): TranslateSelectOptionType[] =>
  sports.map((sport: SportEntity) => ({
    value: sport.slug,
    labelKey: `sportsPackages.${sport.slug}.name`
  }));
