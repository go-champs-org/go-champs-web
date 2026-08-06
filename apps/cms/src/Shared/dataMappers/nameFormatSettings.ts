import { TranslateSelectOptionType } from '../hooks/useTranslatedSelectOptions';
import { ApiNameCase, ApiNameFormat } from '../httpClient/apiTypes';

export type NameFormat = ApiNameFormat;
export const NameFormat: Record<'FULL' | 'FIRST_LAST', ApiNameFormat> = {
  FULL: 'full',
  FIRST_LAST: 'first_last'
};

export type NameCase = ApiNameCase;
export const NameCase: Record<'ORIGINAL' | 'UPPER', ApiNameCase> = {
  ORIGINAL: 'original',
  UPPER: 'upper'
};

export const NAME_FORMAT_OPTIONS: TranslateSelectOptionType[] = [
  {
    value: NameFormat.FULL,
    labelKey: 'nameFormatSettingsForm.nameFormatOptions.full'
  },
  {
    value: NameFormat.FIRST_LAST,
    labelKey: 'nameFormatSettingsForm.nameFormatOptions.first_last'
  }
];

export const NAME_CASE_OPTIONS: TranslateSelectOptionType[] = [
  {
    value: NameCase.ORIGINAL,
    labelKey: 'nameFormatSettingsForm.nameCaseOptions.original'
  },
  {
    value: NameCase.UPPER,
    labelKey: 'nameFormatSettingsForm.nameCaseOptions.upper'
  }
];
