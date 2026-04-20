import {
  mustHaveAtLeastTwoWords,
  required,
  mustBeEmail,
  mustBeNumber,
  minValue,
  maxValue,
  maxLength,
  mustBeSlug,
  mustBeUsername,
  mustBePin
} from './commonValidators';

describe('mustHaveAtLeastTwoWords', () => {
  it('returns undefined for valid full names with two words', () => {
    expect(mustHaveAtLeastTwoWords('John Doe')).toBeUndefined();
    expect(mustHaveAtLeastTwoWords('Maria Silva')).toBeUndefined();
    expect(mustHaveAtLeastTwoWords('Jane Smith')).toBeUndefined();
  });

  it('returns undefined for valid full names with more than two words', () => {
    expect(mustHaveAtLeastTwoWords('John Michael Doe')).toBeUndefined();
    expect(mustHaveAtLeastTwoWords('Maria da Silva')).toBeUndefined();
    expect(mustHaveAtLeastTwoWords('Jean-Pierre DuPont')).toBeUndefined();
    expect(mustHaveAtLeastTwoWords("Mary Anne O'Brien")).toBeUndefined();
  });

  it('returns error message for single word names', () => {
    expect(mustHaveAtLeastTwoWords('John')).toBe(
      'Must include first and last name'
    );
    expect(mustHaveAtLeastTwoWords('Maria')).toBe(
      'Must include first and last name'
    );
    expect(mustHaveAtLeastTwoWords('SingleName')).toBe(
      'Must include first and last name'
    );
  });

  it('returns undefined for empty or undefined values', () => {
    expect(mustHaveAtLeastTwoWords('')).toBeUndefined();
    expect(mustHaveAtLeastTwoWords(null as any)).toBeUndefined();
    expect(mustHaveAtLeastTwoWords(undefined as any)).toBeUndefined();
  });

  it('handles multiple spaces correctly', () => {
    expect(mustHaveAtLeastTwoWords('John   Doe')).toBeUndefined();
    expect(mustHaveAtLeastTwoWords('John    Michael    Doe')).toBeUndefined();
  });

  it('handles leading and trailing spaces correctly', () => {
    expect(mustHaveAtLeastTwoWords('  John Doe  ')).toBeUndefined();
    expect(mustHaveAtLeastTwoWords('   John   ')).toBe(
      'Must include first and last name'
    );
  });

  it('returns error for whitespace-only input', () => {
    expect(mustHaveAtLeastTwoWords('   ')).toBe(
      'Must include first and last name'
    ); // No words after filtering
    expect(mustHaveAtLeastTwoWords('  \t  ')).toBe(
      'Must include first and last name'
    ); // No words after filtering
  });

  it('handles names with special characters', () => {
    expect(mustHaveAtLeastTwoWords('José García')).toBeUndefined();
    expect(mustHaveAtLeastTwoWords('François Müller')).toBeUndefined();
    expect(mustHaveAtLeastTwoWords("O'Brien Smith")).toBeUndefined();
  });
});

describe('required', () => {
  it('returns undefined for non-empty values', () => {
    expect(required('test')).toBeUndefined();
    expect(required('John Doe')).toBeUndefined();
  });

  it('returns error message for empty values', () => {
    expect(required('')).toBe("Can't be blank");
    expect(required(null as any)).toBe("Can't be blank");
    expect(required(undefined as any)).toBe("Can't be blank");
  });
});

describe('mustBeEmail', () => {
  it('returns undefined for valid email addresses', () => {
    expect(mustBeEmail('test@example.com')).toBeUndefined();
    expect(mustBeEmail('user.name@domain.co.uk')).toBeUndefined();
  });

  it('returns error message for invalid email addresses', () => {
    expect(mustBeEmail('invalid')).toBe('Must be an email');
    expect(mustBeEmail('test@')).toBe('Must be an email');
    expect(mustBeEmail('@example.com')).toBe('Must be an email');
  });
});

describe('mustBeNumber', () => {
  it('returns undefined for valid numbers', () => {
    expect(mustBeNumber(123)).toBeUndefined();
    expect(mustBeNumber(0)).toBeUndefined();
    expect(mustBeNumber(-5)).toBeUndefined();
  });

  it('returns error message for non-numbers', () => {
    expect(mustBeNumber('abc')).toBe('Must be a number');
    expect(mustBeNumber(NaN)).toBe('Must be a number');
  });
});

describe('minValue', () => {
  it('returns undefined for values greater than or equal to min', () => {
    const validator = minValue(5);
    expect(validator(10)).toBeUndefined();
    expect(validator(5)).toBeUndefined();
  });

  it('returns error message for values less than min', () => {
    const validator = minValue(5);
    expect(validator(3)).toBe('Should be greater than 5');
  });
});

describe('maxValue', () => {
  it('returns undefined for values less than or equal to max', () => {
    const validator = maxValue(10);
    expect(validator(5)).toBeUndefined();
    expect(validator(10)).toBeUndefined();
  });

  it('returns error message for values greater than max', () => {
    const validator = maxValue(10);
    expect(validator(15)).toBe('Should be less than 10');
  });
});

describe('maxLength', () => {
  it('returns undefined for strings within max length', () => {
    const validator = maxLength(10);
    expect(validator('short')).toBeUndefined();
    expect(validator('exactlyten')).toBeUndefined();
  });

  it('returns error message for strings exceeding max length', () => {
    const validator = maxLength(10);
    expect(validator('this is too long')).toBe('Must be 10 characters or less');
  });

  it('returns undefined for empty or undefined values', () => {
    const validator = maxLength(10);
    expect(validator('')).toBeUndefined();
    expect(validator(undefined as any)).toBeUndefined();
  });
});

describe('mustBeSlug', () => {
  it('returns undefined for valid slugs', () => {
    expect(mustBeSlug('my-slug')).toBeUndefined();
    expect(mustBeSlug('slug123')).toBeUndefined();
    expect(mustBeSlug('test-slug-123')).toBeUndefined();
  });

  it('returns error message for invalid slugs', () => {
    expect(mustBeSlug('My-Slug')).toBe(
      'Must be all lowercase and only alphanumeric or dash characters are accepted'
    );
    expect(mustBeSlug('slug_test')).toBe(
      'Must be all lowercase and only alphanumeric or dash characters are accepted'
    );
    expect(mustBeSlug('slug test')).toBe(
      'Must be all lowercase and only alphanumeric or dash characters are accepted'
    );
  });
});

describe('mustBeUsername', () => {
  it('returns undefined for valid usernames', () => {
    expect(mustBeUsername('user')).toBeUndefined();
    expect(mustBeUsername('username123')).toBeUndefined();
    expect(mustBeUsername('User1234')).toBeUndefined();
  });

  it('returns error message for usernames that are too short', () => {
    expect(mustBeUsername('usr')).toBe('Must be between 4 and 20 characters');
    expect(mustBeUsername('a')).toBe('Must be between 4 and 20 characters');
  });
});

describe('mustBePin', () => {
  it('returns undefined for valid PINs', () => {
    expect(mustBePin('1234')).toBeUndefined();
    expect(mustBePin('123456')).toBeUndefined();
  });

  it('returns error message for invalid PINs', () => {
    expect(mustBePin('123')).toBe('Must be at least 4 digits');
    expect(mustBePin('12ab')).toBe('Must be at least 4 digits');
  });

  it('returns undefined for empty or undefined values', () => {
    expect(mustBePin('')).toBeUndefined();
    expect(mustBePin(undefined as any)).toBeUndefined();
  });
});
