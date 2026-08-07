import { TFunction } from 'react-i18next';
import { SelectOptionType } from './Select';
import { inheritPlaceholder } from './NameFormatSettingsFields';

const t = ((key: string, options?: { value?: string }) =>
  `${key}::${options && options.value}`) as TFunction;

const options: SelectOptionType[] = [
  { value: 'full', label: 'Full name' },
  { value: 'first_last', label: 'First and last name' }
];

describe('inheritPlaceholder', () => {
  it('uses the organization value label when present', () => {
    expect(inheritPlaceholder(t, options, 'first_last', 'full')).toBe(
      'nameFormatSettingsForm.inheritPlaceholder::First and last name'
    );
  });

  it('falls back to the default value label when the organization value is null', () => {
    expect(inheritPlaceholder(t, options, null, 'full')).toBe(
      'nameFormatSettingsForm.inheritPlaceholder::Full name'
    );
  });

  it('falls back to the default value label when the organization value is undefined', () => {
    expect(inheritPlaceholder(t, options, undefined, 'full')).toBe(
      'nameFormatSettingsForm.inheritPlaceholder::Full name'
    );
  });

  it('returns an empty label when no option matches either value', () => {
    expect(
      inheritPlaceholder(t, options, 'unknown-value', 'unknown-default')
    ).toBe('nameFormatSettingsForm.inheritPlaceholder::');
  });
});
