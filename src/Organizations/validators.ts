import { AsyncValidatorFunction } from '../Shared/UI/Form/Validators/commonValidators';

export const mustHaveOrganizationSlugAvailable: AsyncValidatorFunction = async (
  value: string
) => {
  await new Promise(resolve => setTimeout(resolve, 0));
  // Fetch organizations

  return value === 'aaaa' ? undefined : 'Slug has been taken';
};
