import { PhaseTypes } from './state';
import { TranslateSelectOptionType } from '../Shared/hooks/useTranslatedSelectOptions';

export const PHASE_TYPES_OPTIONS_TRANSLATED: TranslateSelectOptionType[] = [
  { value: PhaseTypes.draw, labelKey: 'phaseTypes.bracket' },
  { value: PhaseTypes.elimination, labelKey: 'phaseTypes.groupStandings' }
];
