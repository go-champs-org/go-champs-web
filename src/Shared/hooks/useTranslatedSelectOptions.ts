import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectOptionType } from '../UI/Form/Select';

export interface TranslateSelectOptionType {
  value: string;
  labelKey: string;
  faIconClass?: string;
}

export const useTranslatedSelectOptions = (
  options: TranslateSelectOptionType[],
  keyPrefix: string = ''
): SelectOptionType[] => {
  const { t } = useTranslation();

  return useMemo(
    () =>
      options.map(option => ({
        value: option.value,
        label: t(
          keyPrefix ? `${keyPrefix}.${option.labelKey}` : option.labelKey,
          { keySeparator: '.' }
        )
      })),
    [options, keyPrefix, t]
  );
};
