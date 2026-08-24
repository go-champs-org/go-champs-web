import type { CoachEntity } from '@gochamps/domain-types';

// The API stores the raw coach type; the CMS labels the same two values
// (apps/cms/src/Shared/translations). An unknown type stays unlabelled rather
// than leaking the raw slug onto the page.
const COACH_TYPE_KEYS: Record<string, string> = {
  head_coach: 'headCoach',
  assistant_coach: 'assistantCoach'
};

export interface LabelledCoach {
  id: string;
  name: string;
  label: string;
}

type Translate = (key: string) => string;

const coachTypeLabel = (type: string, t: Translate): string => {
  const key = COACH_TYPE_KEYS[type];
  return key ? t(key) : '';
};

export const labelCoaches = (
  coaches: CoachEntity[],
  t: Translate
): LabelledCoach[] =>
  coaches.map(coach => ({
    id: coach.id,
    name: coach.name,
    label: coachTypeLabel(coach.type, t)
  }));
