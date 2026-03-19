import { PhaseTypes, RakingCriteria } from './state';
import { TranslateSelectOptionType } from '../Shared/hooks/useTranslatedSelectOptions';

export const PHASE_TYPES_OPTIONS_TRANSLATED: TranslateSelectOptionType[] = [
  { value: PhaseTypes.draw, labelKey: 'phaseTypes.bracket' },
  { value: PhaseTypes.elimination, labelKey: 'phaseTypes.groupStandings' }
];

export const RANKING_CRITERIA_OPTIONS: TranslateSelectOptionType[] = [
  { value: RakingCriteria.overall, labelKey: 'rankingCriteriaOptions.overall' },
  {
    value: RakingCriteria.headToHead,
    labelKey: 'rankingCriteriaOptions.headToHead'
  }
];
