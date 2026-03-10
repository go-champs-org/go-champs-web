export const getCountryCodeFromBrowser = (): string => {
  try {
    // Get the browser's locale (e.g., "en-US", "pt-BR", "es-ES")
    const languages =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages[0]
        : navigator.language;
    const locale = languages || 'en-US';

    // Extract country code (the part after the hyphen)
    const parts = locale.split('-');
    if (parts.length > 1) {
      return parts[1].toUpperCase();
    }

    // If no country code in locale, try to infer from timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone.includes('America')) {
      // Default to BR for Americas if we can't determine
      return 'BR';
    }

    // Fallback to BR
    return 'BR';
  } catch (error) {
    console.error('Error detecting country code:', error);
    return 'BR';
  }
};
