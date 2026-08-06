import { TranslateSelectOptionType } from '../hooks/useTranslatedSelectOptions';

export enum NameFormat {
  FULL = 'full',
  FIRST_LAST = 'first_last'
}

export enum NameCase {
  ORIGINAL = 'original',
  UPPER = 'upper'
}

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
