import { modifiedValue } from './modifiedValue';

interface TestFormValues {
  name: string;
  nickname: string;
}

describe('modifiedValue', () => {
  it('returns undefined when the field was never modified', () => {
    const formValues: TestFormValues = { name: 'Jane', nickname: 'J' };

    expect(modifiedValue(formValues, 'name', {})).toBeUndefined();
  });

  it('returns undefined when the field was explicitly marked unmodified', () => {
    const formValues: TestFormValues = { name: 'Jane', nickname: 'J' };

    expect(modifiedValue(formValues, 'name', { name: false })).toBeUndefined();
  });

  it('returns the value when the field was modified and non-empty', () => {
    const formValues: TestFormValues = { name: 'Jane', nickname: 'J' };

    expect(modifiedValue(formValues, 'name', { name: true })).toBe('Jane');
  });

  it('returns null when the field was modified and left blank', () => {
    const formValues: TestFormValues = { name: '', nickname: 'J' };

    expect(modifiedValue(formValues, 'name', { name: true })).toBeNull();
  });

  it('only considers the requested field, ignoring other modified fields', () => {
    const formValues: TestFormValues = { name: 'Jane', nickname: 'J' };

    expect(
      modifiedValue(formValues, 'name', { nickname: true })
    ).toBeUndefined();
  });
});
