import { localeCookieString } from './localeCookie';

export const switchLocale = (
  locale: string,
  { setCookie, refresh }: { setCookie: (value: string) => void; refresh: () => void }
): void => {
  setCookie(localeCookieString(locale));
  refresh();
};
