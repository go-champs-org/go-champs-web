import { getCountryCodeFromBrowser } from './countryCodeUtils';

describe('getCountryCodeFromBrowser', () => {
  const originalNavigator = (global as any).navigator;
  const originalIntl = (global as any).Intl;

  afterEach(() => {
    // Restore original navigator and Intl
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true
    });
    Object.defineProperty(global, 'Intl', {
      value: originalIntl,
      writable: true,
      configurable: true
    });
  });

  it('handles extracting country code from navigator.language with hyphen', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        language: 'pt-BR',
        languages: ['pt-BR']
      },
      writable: true,
      configurable: true
    });

    expect(getCountryCodeFromBrowser()).toBe('BR');
  });

  it('handles extracting country code from navigator.languages array', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        language: 'en',
        languages: ['en-US', 'en-GB']
      },
      writable: true,
      configurable: true
    });

    expect(getCountryCodeFromBrowser()).toBe('US');
  });

  it('handles returning uppercase country code', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        language: 'en-us',
        languages: ['en-us']
      },
      writable: true,
      configurable: true
    });

    expect(getCountryCodeFromBrowser()).toBe('US');
  });

  it('handles locale without country code and checks timezone', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        language: 'en',
        languages: ['en']
      },
      writable: true,
      configurable: true
    });

    Object.defineProperty(global, 'Intl', {
      value: {
        DateTimeFormat: function() {
          return {
            resolvedOptions: () => ({ timeZone: 'America/Sao_Paulo' })
          };
        }
      },
      writable: true,
      configurable: true
    });

    expect(getCountryCodeFromBrowser()).toBe('BR');
  });

  it('handles defaulting to BR when locale has no country and timezone is not America', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        language: 'en',
        languages: ['en']
      },
      writable: true,
      configurable: true
    });

    Object.defineProperty(global, 'Intl', {
      value: {
        DateTimeFormat: function() {
          return {
            resolvedOptions: () => ({ timeZone: 'Europe/London' })
          };
        }
      },
      writable: true,
      configurable: true
    });

    expect(getCountryCodeFromBrowser()).toBe('BR');
  });

  it('handles fallback to BR when navigator is undefined', () => {
    Object.defineProperty(global, 'navigator', {
      value: undefined,
      writable: true,
      configurable: true
    });

    expect(getCountryCodeFromBrowser()).toBe('BR');
  });

  it('handles different country codes correctly', () => {
    const testCases = [
      { locale: 'es-ES', expected: 'ES' },
      { locale: 'fr-FR', expected: 'FR' },
      { locale: 'de-DE', expected: 'DE' },
      { locale: 'en-GB', expected: 'GB' },
      { locale: 'ja-JP', expected: 'JP' }
    ];

    testCases.forEach(({ locale, expected }) => {
      Object.defineProperty(global, 'navigator', {
        value: {
          language: locale,
          languages: [locale]
        },
        writable: true,
        configurable: true
      });

      expect(getCountryCodeFromBrowser()).toBe(expected);
    });
  });

  it('handles errors gracefully and returns BR', () => {
    Object.defineProperty(global, 'navigator', {
      value: {
        get language() {
          throw new Error('Test error');
        },
        languages: []
      },
      writable: true,
      configurable: true
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(getCountryCodeFromBrowser()).toBe('BR');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error detecting country code:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
