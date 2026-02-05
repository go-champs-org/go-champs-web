import { SelectOptionType } from '../Shared/UI/Form/Select';
import {
  CoachType,
  DEFAULT_SPORT,
  Level,
  OfficialType,
  Scope,
  SportState
} from './state';
import {
  DEFAULT_GAME,
  GameEntity,
  GAME_RESULT_TYPE,
  GAME_ASSET_TYPE
} from '../Games/state';
import { TranslateSelectOptionType } from '../Shared/hooks/useTranslatedSelectOptions';

export const sports = (state: SportState) =>
  Object.keys(state.sports).map((key: string) => state.sports[key]);

export const sportsLoading = (state: SportState) =>
  state.isLoadingRequestSports;

export const selectSport = (state: SportState, sportSlug: string) =>
  state.sports[sportSlug] || DEFAULT_SPORT;

export const selectPlayerStatisticsByLevel = (
  state: SportState,
  sportSlug: string,
  level: Level
) => {
  const sport = state.sports[sportSlug] || DEFAULT_SPORT;
  return sport.playerStatistics.filter(stat => stat.level === level);
};

export const selectPlayerStatisticsByScope = (
  state: SportState,
  sportSlug: string,
  scope: Scope
) => {
  const sport = state.sports[sportSlug] || DEFAULT_SPORT;
  return sport.playerStatistics.filter(stat => stat.scope === scope);
};

export const coachTypesForSelectInput = (
  state: SportState,
  sportSlug: string
): SelectOptionType[] => {
  const sport = state.sports[sportSlug] || DEFAULT_SPORT;
  return sport.coachTypes.map((coachType: CoachType) => ({
    value: coachType.type,
    label: coachType.type
  }));
};

export const selectDefaultGame = (sportSlug: string): GameEntity => {
  const baseGame = { ...DEFAULT_GAME };

  // Set sport-specific defaults
  if (sportSlug === 'basketball_5x5') {
    baseGame.resultType = GAME_RESULT_TYPE.AUTOMATIC;
  }

  return baseGame;
};

export const officialTypesForSelectInput = (
  state: SportState,
  sportSlug: string
): TranslateSelectOptionType[] => {
  const sport = state.sports[sportSlug] || DEFAULT_SPORT;
  return sport.officialTypes
    ? sport.officialTypes.map((officialType: OfficialType) => ({
        value: officialType.role,
        labelKey: `officialType.${officialType.role}`
      }))
    : [];
};

export const gameAssetTypeOptions = (): TranslateSelectOptionType[] => [
  {
    value: GAME_ASSET_TYPE.FIBA_SCORESHEET,
    labelKey: 'gameAssetType.fibaScoresheet',
    faIconClass: 'fas fa-file-alt'
  },
  {
    value: GAME_ASSET_TYPE.FIBA_BOXSCORE,
    labelKey: 'gameAssetType.fibaBoxscore',
    faIconClass: 'fas fa-table'
  },
  {
    value: GAME_ASSET_TYPE.FOLDER_IMAGES,
    labelKey: 'gameAssetType.folderImages',
    faIconClass: 'fas fa-folder-open'
  }
];

export const gameAssetOptionByValue = (
  value: string
): TranslateSelectOptionType | undefined => {
  return gameAssetTypeOptions().find(
    (option: TranslateSelectOptionType) => option.value === value
  );
};
