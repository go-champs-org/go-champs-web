/* eslint-disable @typescript-eslint/no-explicit-any -- deliberately calling string validators with null/undefined to test defensive handling */
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
  mustBePin,
  mustBeCPF,
  usernameFormatReason,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH
} from './commonValidators';
import pt from '../../../translations/pt';
import en from '../../../translations/en';

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

  it('returns the message of the rule that was broken', () => {
    expect(mustBeUsername('usr')).toBe('usernameTooShort');
    expect(mustBeUsername('a'.repeat(21))).toBe('usernameTooLong');
    expect(mustBeUsername('joao silva')).toBe('usernameInvalidCharacters');
  });
});

describe('usernameFormatReason', () => {
  it('keeps the same length limits the API validates against', () => {
    expect(USERNAME_MIN_LENGTH).toBe(4);
    expect(USERNAME_MAX_LENGTH).toBe(20);
  });

  // Mirrors the cases GoChampsApi.Accounts.UsernameAvailability is tested
  // against. The client must accept and refuse exactly the same set: a handle
  // the form accepts and the API refuses is a promise the sign up breaks.
  const apiParityCases: [string, string | undefined][] = [
    ['joaosilva', undefined],
    ['joao.silva', undefined],
    ['joao-silva', undefined],
    ['Joao.Silva-1', undefined],
    ['user', undefined],
    ['a'.repeat(20), undefined],
    ['abc', 'too_short'],
    ['', 'too_short'],
    ['a'.repeat(21), 'too_long'],
    ['joao_silva', 'invalid_characters'],
    ['joao silva', 'invalid_characters'],
    ['joão.silva', 'invalid_characters'],
    ['joao@silva', 'invalid_characters']
  ];

  apiParityCases.forEach(([username, reason]) => {
    it(`reports ${reason || 'no violation'} for "${username}"`, () => {
      expect(usernameFormatReason(username)).toBe(reason);
    });
  });

  it('checks length before characters, like the API does', () => {
    expect(usernameFormatReason('jo ')).toBe('too_short');
  });
});

describe('username messages', () => {
  it('is translated in every supported language', () => {
    const keys = [
      'usernameTooShort',
      'usernameTooLong',
      'usernameInvalidCharacters',
      'usernameTaken',
      'usernameSuggestionOffer'
    ];

    keys.forEach(key => {
      expect(pt.translation).toHaveProperty(key);
      expect(en.translation).toHaveProperty(key);
    });
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

describe('mustBeCPF', () => {
  it('returns undefined for a valid CPF', () => {
    expect(mustBeCPF('52998224725')).toBeUndefined();
    expect(mustBeCPF('529.982.247-25')).toBeUndefined();
  });

  it('returns error message for an invalid checksum', () => {
    expect(mustBeCPF('52998224700')).toBe('Must be a valid CPF');
  });

  it('returns error message for all-same-digit CPFs', () => {
    expect(mustBeCPF('11111111111')).toBe('Must be a valid CPF');
  });

  it('returns error message for wrong-length values', () => {
    expect(mustBeCPF('123')).toBe('Must be a valid CPF');
  });

  it('returns undefined for empty or undefined values', () => {
    expect(mustBeCPF('')).toBeUndefined();
    expect(mustBeCPF(undefined as any)).toBeUndefined();
  });
});
