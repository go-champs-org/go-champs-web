import { PhaseTypes } from './state';
import { SelectOptionType } from '../Shared/UI/Form/Select';

export const PHASE_TYPES_OPTIONS: SelectOptionType[] = [
  { value: PhaseTypes.draw, label: 'Rounds' },
  { value: PhaseTypes.elimination, label: 'Eliminations' }
];
