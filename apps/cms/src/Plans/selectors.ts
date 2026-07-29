import { TranslateSelectOptionType } from '../Shared/hooks/useTranslatedSelectOptions';
import { ApiPlan } from '../Shared/httpClient/apiTypes';

export const plansForSelectInput = (
  plans?: ApiPlan[]
): TranslateSelectOptionType[] => {
  return plans
    ? plans.map((plan: ApiPlan) => ({
        value: plan.slug,
        labelKey: `${plan.slug}.name`
      }))
    : [];
};
